const express = require("express");
const pool = require("../modules/pool");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const router = express.Router();

// Configure AWS S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_PHOTO_BUCKET_NAME;

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// Handle profile information update
router.put("/profile-info", upload.single("photo"), async (req, res) => {
  let connection;

  try {
    connection = await pool.connect();
    await connection.query("BEGIN;");

    // Handle photo upload to S3
    let photoUrl = null;
    if (req.file) {
      const photoKey = `uploads/${Date.now()}_${path.basename(
        req.file.originalname
      )}`;

      // Upload file to S3
      await s3Client.send(
        new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: photoKey,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        })
      );
      

      // Generate the photo URL
      photoUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${photoKey}`;
    }

    // Update profile information
    const profileSqlQuery = `
      UPDATE "profile"
      SET "first_name" = $1, "last_name" = $2, "middle_initial" = $3, "hide_middle_initial" = $4, "pronouns" = $5, "hide_pronouns" = $6, "nickname" = $7, "formal_name" = $8, "height_ft" = $9, "height_in" = $10, "birthday" = $11, "sheet_music" = $12, "accessibility" = $13, "shirt_size_id" = $14, "profile_photo_url" = $15
      WHERE "user_id" = $16
      RETURNING "user_id";
    `;
    const profileSqlValues = [
      req.body.first_name,
      req.body.last_name,
      req.body.middle_initial,
      req.body.hide_middle_initial,
      req.body.pronouns,
      req.body.hide_pronouns,
      req.body.nickname,
      req.body.formal_name,
      req.body.height_ft || null,
      req.body.height_in || null,
      req.body.birthday,
      req.body.sheet_music,
      req.body.accessibility,
      req.body.shirt_size_id || null,
      photoUrl || null, // Include photo URL if available
      req.user.id,
    ];
    const sectionUpdateQuery = await connection.query(
      profileSqlQuery,
      profileSqlValues
    );
    const profileQueryResults = [sectionUpdateQuery.rows[0].user_id];

    // Update user checklist status
    const userSqlQuery = `
      UPDATE "users"
      SET "isProfileComplete" = true
      WHERE "id" = $1;
    `;
    await connection.query(userSqlQuery, profileQueryResults);

    await connection.query("COMMIT;");
    res.sendStatus(201);
  } catch (err) {
    console.log("PUT /profile-info failed:", err);
    await connection.query("ROLLBACK;");
    res.sendStatus(500);
  } finally {
    await connection.release();
  }
});

// Handle contact information update
router.put("/contact-info", async (req, res) => {
  let connection;

  try {
    connection = await pool.connect();
    await connection.query("BEGIN;");
    const contactSqlQuery = `
      UPDATE "profile"
      SET "email" = $1, "hide_email" = $2, "phone" = $3, "hide_phone" = $4, "street_address_1" = $5, "street_address_2" = $6, "city" = $7, "state" = $8, "zip" = $9, "hide_address" = $10
      WHERE "user_id" = $11
      RETURNING "user_id";
      `;
    const contactSqlValues = [
      req.body.email,
      req.body.hide_email,
      req.body.phone,
      req.body.hide_phone,
      req.body.street_address_1,
      req.body.street_address_2,
      req.body.city,
      req.body.state,
      req.body.zip,
      req.body.hide_address,
      req.user.id,
    ];
    const sectionUpdateQuery = await connection.query(
      contactSqlQuery,
      contactSqlValues
    );
    const contactQueryResults = [sectionUpdateQuery.rows[0].user_id];

    // Update user checklist status
    const userSqlQuery = `
      UPDATE "users"
      SET "isContactComplete" = true
      WHERE "id" = $1;
      `;
    await connection.query(userSqlQuery, contactQueryResults);
    await connection.query("COMMIT;");
    res.sendStatus(201);
  } catch (err) {
    console.log("PUT /contact-info failed:", err);
    await connection.query("ROLLBACK;");
    res.sendStatus(500);
  } finally {
    await connection.release();
  }
});

// Handle emergency information update
router.put("/emergency-info", async (req, res) => {
  let connection;

  try {
    connection = await pool.connect();
    await connection.query("BEGIN;");
    const emergencySqlQuery = `
      UPDATE "profile"
      SET "emergency_name" = $1, "emergency_relation" = $2, "emergency_phone" = $3
      WHERE "user_id" = $4
      RETURNING "user_id";
      `;
    const emergencySqlValues = [
      req.body.emergency_name,
      req.body.emergency_relation,
      req.body.emergency_phone,
      req.user.id,
    ];
    const sectionUpdateQuery = await connection.query(
      emergencySqlQuery,
      emergencySqlValues
    );
    const emergencyQueryResults = [sectionUpdateQuery.rows[0].user_id];

    // Update user checklist status
    const userSqlQuery = `
      UPDATE "users"
      SET "isEmergencyComplete" = true
      WHERE "id" = $1;
      `;
    await connection.query(userSqlQuery, emergencyQueryResults);
    await connection.query("COMMIT;");
    res.sendStatus(201);
  } catch (err) {
    console.log("PUT /emergency-info failed:", err);
    await connection.query("ROLLBACK;");
    res.sendStatus(500);
  } finally {
    await connection.release();
  }
});

// Handle about information update
router.put("/about-info", async (req, res) => {
  let connection;

  try {
    connection = await pool.connect();
    await connection.query("BEGIN;");
    const aboutSqlQuery = `
      UPDATE "profile"
      SET "about" = $1, "fun_fact" = $2, "employer" = $3, "occupation" = $4
      WHERE "user_id" = $5
      RETURNING "user_id";
      `;
    const aboutSqlValues = [
      req.body.about,
      req.body.fun_fact,
      req.body.employer,
      req.body.occupation,
      req.user.id,
    ];
    const sectionUpdateQuery = await connection.query(
      aboutSqlQuery,
      aboutSqlValues
    );
    const aboutQueryResults = [sectionUpdateQuery.rows[0].user_id];

    // Update user checklist status
    const userSqlQuery = `
      UPDATE "users"
      SET "isAboutComplete" = true
      WHERE "id" = $1;
      `;
    await connection.query(userSqlQuery, aboutQueryResults);
    await connection.query("COMMIT;");
    res.sendStatus(201);
  } catch (err) {
    console.log("PUT /about-info failed:", err);
    await connection.query("ROLLBACK;");
    res.sendStatus(500);
  } finally {
    await connection.release();
  }
});

// Handle social information update
router.put("/social-info", async (req, res) => {
  let connection;

  try {
    connection = await pool.connect();
    await connection.query("BEGIN;");
    const socialSqlQuery = `
      UPDATE "profile"
      SET "website_url" = $1, "x_url" = $2, "instagram_url" = $3, "facebook_url" = $4, "linkedin_url" = $5, "tiktok_url" = $6
      WHERE "user_id" = $7
      RETURNING "user_id";
      `;
    const socialSqlValues = [
      req.body.website_url,
      req.body.x_url,
      req.body.instagram_url,
      req.body.facebook_url,
      req.body.linkedin_url,
      req.body.tiktok_url,
      req.user.id,
    ];
    const sectionUpdateQuery = await connection.query(
      socialSqlQuery,
      socialSqlValues
    );
    const socialQueryResults = [sectionUpdateQuery.rows[0].user_id];

    // Update user checklist status
    const userSqlQuery = `
      UPDATE "users"
      SET "isSocialComplete" = true
      WHERE "id" = $1;
      `;
    await connection.query(userSqlQuery, socialQueryResults);
    await connection.query("COMMIT;");
    res.sendStatus(201);
  } catch (err) {
    console.log("PUT /social-info failed:", err);
    await connection.query("ROLLBACK;");
    res.sendStatus(500);
  } finally {
    await connection.release();
  }
});

// Get user profile
router.get("/user", (req, res) => {
  const sqlQuery = `
  SELECT *, "shirt_size"."size" 
    FROM "profile"
    JOIN "shirt_size" ON "profile"."shirt_size_id" = "shirt_size"."id"
    WHERE "user_id" = $1;
  `;
  const sqlValue = [req.user.id];

  pool
    .query(sqlQuery, sqlValue)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log("Error Fetching profile:", err);
      res.sendStatus(500);
    });
});

// Update user checklist status
router.put("/user", (req, res) => {
  const sqlQuery = `
  UPDATE "users"
  SET "isChecklistCompleted" = true
  WHERE "id" = $1
  `;
  const sqlValue = [req.user.id];

  pool
    .query(sqlQuery, sqlValue)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error /api/profile/user on submit", err);
      res.sendStatus(500);
    });
});

//Handle full profile update
router.put('/edit' , upload.single("photo"), async (req, res) => {
  let connection;

  try {
    connection = await pool.connect();
    await connection.query("BEGIN;");

    // Handle photo upload to S3
    let photoUrl = null;
    if (req.file) {
      const photoKey = `uploads/${Date.now()}_${path.basename(
        req.file.originalname
      )}`;

      // Upload file to S3
      await s3Client.send(
        new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: photoKey,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        })
      );
      

      // Generate the photo URL
      photoUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${photoKey}`;
      await connection.query(userSqlQuery, socialQueryResults);
    }

    // Update profile information
    const profileSqlQuery = `
      UPDATE profile
        SET 
        email = $1,
        hide_email = $2,
        first_name = $3,
        last_name = $4,
        middle_initial = $5,
        hide_middle_initial = $6,
        pronouns = $7,
        hide_pronouns = $8,
        nickname = $9,
        formal_name = $10,
        street_address_1 = $11,
        street_address_2 = $12,
        city = $13,
        state = $14,
        zip = $15,
        hide_address = $16,
        emergency_name = $17,
        emergency_relation = $18,
        emergency_phone = $19,
        height_ft = $20,
        height_in = $21,
        birthday = $22,
        phone = $23,
        hide_phone = $24,
        about = $25,
        fun_fact = $26,
        employer = $27,
        occupation = $28,
        website_url = $29,
        x_url = $30,
        instagram_url = $31,
        facebook_url = $32,
        linkedin_url = $33,
        tiktok_url = $34,
        sheet_music = $35,
        accessibility = $36,
        profile_photo_url = $37
        shirt_size_id = $38
      WHERE user_id = $39;
    `;
    const profileSqlValues = [
      req.body.email,
      req.body.hide_email,
      req.body.first_name,
      req.body.last_name,
      req.body.middle_initial,
      req.body.hide_middle_initial,
      req.body.pronouns,
      req.body.hide_pronouns,
      req.body.nickname,
      req.body.formal_name,
      req.body.street_address_1,
      req.body.street_address_2,
      req.body.city,
      req.body.state,
      req.body.zip,
      req.body.hide_address,
      req.body.emergency_name,
      req.body.emergency_relation,
      req.body.emergency_phone,
      req.body.height_ft,
      req.body.height_in,
      req.body.birthday,
      req.body.phone,
      req.body.hide_phone,
      req.body.about,
      req.body.fun_fact,
      req.body.employer,
      req.body.occupation,
      req.body.website_url,
      req.body.x_url,
      req.body.instagram_url,
      req.body.facebook_url,
      req.body.linkedin_url,
      req.body.tiktok_url,
      req.body.sheet_music,
      req.body.accessibility,
      photoUrl || null, // Include photo URL if available
      req.body.shirt_size_id,
      req.user.id,
    ];
    const sectionUpdateQuery = await connection.query(
      profileSqlQuery,
      profileSqlValues
    );

    await connection.query("COMMIT;");
      res.sendStatus(201);
    } catch (err) {
      console.log("PUT /api/profile/edit failed:", err);
      await connection.query("ROLLBACK;");
      res.sendStatus(500);
    } finally {
      await connection.release();
    }
  })

module.exports = router;
