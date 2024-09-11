const express = require("express");
const pool = require("../modules/pool");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const s3 = new S3Client({ region: process.env.AWS_REGION });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload route
router.post("/upload", upload.array("files"), async (req, res) => {
  const { concertId } = req.body;
  const names = req.body.names;
  const pdfNames = req.files.map(file => file.originalname);
  const categories = req.body.categories;

  try {
    const uploadPromises = req.files.map(async (file, index) => {

      const fileKey = `${uuidv4()}-${file.originalname}`;
      
      const s3Params = {
        Bucket: process.env.AWS_SHEET_MUSIC_BUCKET_NAME,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      // Upload to S3
      await s3.send(new PutObjectCommand(s3Params));

      const s3Url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;

      // Insert the file metadata into the "songs" table
      const insertSongQuery = `
        INSERT INTO "songs" ("name", "pdf_name", "pdf_url")
        VALUES ($1, $2, $3)
        RETURNING id
      `;
      const insertSongValues = [names[index], pdfNames[index], s3Url];
      const songResult = await pool.query(insertSongQuery, insertSongValues);
      const songId = songResult.rows[0].id;

      // Now insert into the "concert_songs" table to link concert and song
      const insertConcertSongQuery = `
        INSERT INTO "concert_songs" ("concert_id", "song_id")
        VALUES ($1, $2)
      `;
      const insertConcertSongValues = [concertId, songId];
      await pool.query(insertConcertSongQuery, insertConcertSongValues);
    });

    await Promise.all(uploadPromises);

    res.sendStatus(201);
  } catch (error) {
    console.error("Error uploading files:", error);
    res.sendStatus(500);
  }
});

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



module.exports = router;