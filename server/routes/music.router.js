const express = require("express");
const pool = require("../modules/pool");
const multer = require("multer");
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const s3 = new S3Client({ region: process.env.AWS_REGION });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// PDF routes
router.post("/upload-pdf", upload.array("files"), async (req, res) => {
  const { concertId } = req.body;
  const names = req.body.names;
  const pdfNames = req.files.map(file => file.originalname);

  try {
    const uploadPromises = req.files.map(async (file, index) => {

      const fileKey = `${uuidv4()}-${file.originalname}`;
      
      const s3Params = {
        Bucket: process.env.AWS_SHEET_MUSIC_BUCKET_NAME,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      await s3.send(new PutObjectCommand(s3Params));

      const s3Url = `https://${process.env.AWS_SHEET_MUSIC_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;

      const insertSongQuery = `
        INSERT INTO "songs" ("name", "pdf_name", "pdf_url")
        VALUES ($1, $2, $3)
        RETURNING id
      `;
      const name = names[index];
      const insertSongValues = [name, pdfNames[index], s3Url];
      const songResult = await pool.query(insertSongQuery, insertSongValues);
      const songId = songResult.rows[0].id;

      const insertConcertSongQuery = `
        INSERT INTO "concert_songs" ("concert_id", "song_id")
        VALUES ($1, $2)
      `;
      const insertConcertSongValues = [concertId, songId];
      await pool.query(insertConcertSongQuery, insertConcertSongValues);
    });

    await Promise.all(uploadPromises);

    res.status(201).json({ concertId });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.sendStatus(500);
  }
});

router.delete("/delete-pdf/:id", async (req, res) => {
  const pdfId = req.params.id;

  try {
    const getPdfQuery = `
      SELECT "pdf_url"
      FROM "songs"
      WHERE "id" = $1;
    `;
    const pdfResult = await pool.query(getPdfQuery, [pdfId]);

    if (pdfResult.rows.length === 0) {
      return res.status(404).json({ message: "PDF not found" });
    }

    const pdfUrl = pdfResult.rows[0].pdf_url;
    const fileKey = pdfUrl.split('/').pop();

    const s3Params = {
      Bucket: process.env.AWS_SHEET_MUSIC_BUCKET_NAME,
      Key: fileKey,
    };
    await s3.send(new DeleteObjectCommand(s3Params));

    const deleteConcertSongsQuery = `
      DELETE FROM "concert_songs"
      WHERE "song_id" = $1;
    `;
    await pool.query(deleteConcertSongsQuery, [pdfId]);

    const deletePdfQuery = `
      DELETE FROM "songs"
      WHERE "id" = $1;
    `;
    await pool.query(deletePdfQuery, [pdfId]);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting PDF:", error);
    res.sendStatus(500);
  }
});


router.post("/upload-tracks", upload.array("files"), async (req, res) => {
  const { concertId } = req.body;
  const names = req.body.names;
  const sectionIds = req.body.sectionIds;
  const partIds = req.body.partIds;
  const songIds = req.body.songIds;

  try {
    const uploadPromises = req.files.map(async (file, index) => {
      const fileKey = `${uuidv4()}-${file.originalname}`;
      const s3Params = {
        Bucket: process.env.AWS_TRACKS_BUCKET_NAME,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      await s3.send(new PutObjectCommand(s3Params));

      const s3Url = `https://${process.env.AWS_TRACKS_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;

      const sectionId = sectionIds[index] ? parseInt(sectionIds[index], 10) : null;
      const songId = songIds[index] ? parseInt(songIds[index], 10) : null;
      const partId = partIds[index] ? parseInt(partIds[index], 10) : null;

      console.log('sectionId:', sectionId, 'partId:', partId, 'songId:', songId);

      const insertTrackQuery = `
        INSERT INTO "tracks" ("track_name", "track_url", "track_section_id", "track_part_id", "song_id")
        VALUES ($1, $2, $3, $4, $5)
      `;
      const name = names[index];
      const insertTrackValues = [name, s3Url, sectionId, partId, songId];
      await pool.query(insertTrackQuery, insertTrackValues);
    });

    await Promise.all(uploadPromises);

    res.sendStatus(201);
  } catch (error) {
    console.error("Error uploading tracks:", error);
    res.sendStatus(500);
  }
});

router.get("/tracks/:concertId", async (req, res) => {
  const concertId = req.params.concertId;
  const sectionId = req.query.sectionId;
  console.log('concertId:', concertId, 'sectionId:', sectionId)

  try {
    const sectionTracksQuery = `
      SELECT t.*
        FROM "tracks" t
        JOIN "concert_songs" cs ON t."song_id" = cs."song_id"
        WHERE cs."concert_id" = $1
        AND t."track_section_id" = $2;
    `;
    const sectionTracksValues = [concertId, sectionId];
    const sectionTracksResult = await pool.query(sectionTracksQuery, sectionTracksValues);

    const balancedTracksQuery = `
      SELECT t.*
        FROM "tracks" t
        JOIN "concert_songs" cs ON t."song_id" = cs."song_id"
        WHERE cs."concert_id" = $1
        AND t."track_section_id" = 5;
    `;
    const balancedTracksValues = [concertId];
    const balancedTracksResult = await pool.query(balancedTracksQuery, balancedTracksValues);

    res.json({
      sectionTracks: sectionTracksResult.rows,
      balancedTracks: balancedTracksResult.rows,
    });
  } catch (error) {
    console.error("Error fetching tracks:", error);
    res.sendStatus(500);
  }
});

router.get('/documents/:id', (req, res) => {
  
  const sqlQuery = `
  SELECT "songs".id AS "song_id", "songs"."name", "songs"."pdf_name", "songs"."pdf_url"  FROM "concert_songs"
    JOIN "songs" ON "concert_songs".song_id = "songs".id
    WHERE "concert_id" = $1
    ORDER BY "songs"."name";
  `

  const sqlValue = [req.params.id]

  pool.query(sqlQuery, sqlValue)
  .then((response) => {
    res.send(response.rows)
  })
  .catch((dbErr) => {
    console.log('Server Error fetching PDFs', dbErr)
    res.sendStatus(500)
  })
})

router.get('/tracks/:id', (req, res) => {
  
  const sqlQuery = `
  SELECT "songs".id AS "song_id", "songs"."name", "songs"."pdf_name", "songs"."pdf_url"  FROM "concert_songs"
    JOIN "songs" ON "concert_songs".song_id = "songs".id
    WHERE "concert_id" = $1;
  `

  const sqlValue = [req.params.id]

  pool.query(sqlQuery, sqlValue)
  .then((response) => {
    res.send(response.rows)
  })
  .catch((dbErr) => {
    console.log('Server Error fetching PDFs', dbErr)
    res.sendStatus(500)
  })
})

router.get('/active/:id', (req, res) => {
    const sqlQuery = `
    SELECT * FROM "concert"
    WHERE "id" = $1
    `
    const concertId = req.params.id
    const sqlValue = [concertId]

    pool.query(sqlQuery, sqlValue)
    .then ((response) => {
        res.send(response.rows)
    })
    .catch((dbErr) => {
        console.log('Error fetching Concert:', dbErr)
        res.sendStatus(500)
    })
})

// Handle Concert Information
router.get("/", (req, res) => {
    const sqlQuery = `
    SELECT * FROM "concert"
    `;
  
    pool
      .query(sqlQuery)
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        console.log("Error Fetching profile:", err);
        res.sendStatus(500);
      });
  });

router.post('/add', (req, res) => {
    const sqlQuery = `
    INSERT INTO "concert"
    ("name", "period", "year")
    VALUES
    ($1, $2, $3)
    `
    const sqlValues = [req.body.name, req.body.period, req.body.year]

    pool.query(sqlQuery, sqlValues)
    .then((response) => {
        res.sendStatus(201)
    })
    .catch(dbErr => {
        console.log("Error adding concert", dbErr)
        res.sendStatus(500)
    })
})

router.delete('/delete/:id', (req, res) => {
    const sqlQuery = `
    DELETE FROM "concert"
    WHERE "id" = $1
    `
    const sqlValue = [req.params.id]

    pool.query(sqlQuery, sqlValue)
    .then((response) => {
        res.sendStatus(201)
    })
    .catch((dbErr) => {
        console.log('Error deleting concert from database:', dbErr)
        res.sendStatus(500)
    })
})

router.delete("/delete-track/:trackId", async (req, res) => {
  const trackId = req.params.trackId;

  try {
    const getTrackQuery = `
      SELECT "track_url"
      FROM "tracks"
      WHERE "id" = $1;
    `;
    const trackResult = await pool.query(getTrackQuery, [trackId]);

    if (trackResult.rows.length === 0) {
      return res.status(404).json({ message: "Track not found" });
    }

    const trackUrl = trackResult.rows[0].track_url;
    const fileKey = trackUrl.split('/').pop();

    const s3Params = {
      Bucket: process.env.AWS_TRACKS_BUCKET_NAME,
      Key: fileKey,
    };

    await s3.send(new DeleteObjectCommand(s3Params));

    const deleteTrackQuery = `
      DELETE FROM "tracks"
      WHERE "id" = $1;
    `;
    await pool.query(deleteTrackQuery, [trackId]);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting track:", error);
    res.sendStatus(500);
  }
});



module.exports = router;