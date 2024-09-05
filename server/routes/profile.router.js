const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.put("/profile-info", async (req, res) => {
  let connection;

  try {
    connection = await pool.connect();
    await connection.query("BEGIN;");
    const profileSqlQuery = `
      UPDATE "profile"
      SET "first_name" = $1, "last_name" = $2, "middle_initial" = $3, "hide_middle_initial" = $4, "pronouns" = $5, "hide_pronouns" = $6, "nickname" = $7, "formal_name" = $8, "height_ft" = $9, "height_in" = $10, "birthday" = $11, "sheet_music" = $12, "accessibility" = $13, "shirt_size_id" = $14
      WHERE "user_id" = $15
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
      req.user.id,
    ];
    const sectionUpdateQuery = await connection.query(
      profileSqlQuery,
      profileSqlValues
    );
    const profileQueryResults = [sectionUpdateQuery.rows[0].user_id];

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
    const emergencyQueryResults = [sectionUpdateQuery.rows[0].user_id]

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

router.put("/social-info", async (req, res) => {
  let connection;

  try {
    connection = await pool.connect();
    await connection.query("BEGIN;");
    const aboutSqlQuery = `
      UPDATE "profile"
      SET "website_url" = $1, "x_url" = $2, "instagram_url" = $3, "facebook_url" = $4, "linkedin_url" = $5, "tiktok_url" = $6
      WHERE "user_id" = $7
      RETURNING "user_id";
      `;
    const aboutSqlValues = [
      req.body.website_url,
      req.body.x_url,
      req.body.instagram_url,
      req.body.facebook_url,
      req.body.linkedin_url,
      req.body.tiktok_url,
      req.user.id,
    ];
    const sectionUpdateQuery = await connection.query(
      aboutSqlQuery,
      aboutSqlValues
    );
    const aboutQueryResults = [sectionUpdateQuery.rows[0].user_id];

    const userSqlQuery = `
      UPDATE "users"
      SET "isSocialComplete" = true
      WHERE "id" = $1;
      `;
    await connection.query(userSqlQuery, aboutQueryResults);
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

router.get('/user', (req, res) => {
  const sqlQuery = `
  SELECT *, "shirt_size"."size" 
    FROM "profile"
    JOIN "shirt_size" ON "profile"."shirt_size_id" = "shirt_size"."id"
    WHERE "user_id" = $1;
  `
const sqlValue = [req.user.id]

pool.query(sqlQuery, sqlValue)
.then((response) => {
  res.send(response.rows)
})
.catch((err) => {
console.log('Error Fetching profile:', err)
});
});

router.put('/user', (req, res) => {
  const sqlQuery = `
  UPDATE "users"
  SET "isChecklistComplete" = true
  WHERE "id" = $1
  `
  const sqlValue = [req.user.id]

  pool.query(sqlQuery, sqlValue)
  .then((response) => {
    res.sendStatus(201)
  })
  .catch((err) => {
    console.log('Error /api/profile/user on submit', err)
    res.sendStatus(500);
  })
});
module.exports = router;
