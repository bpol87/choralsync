const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/cards", (req, res) => {
  const sqlQuery = `
   SELECT 
        profile.id, 
        profile.first_name, 
        profile.last_name, 
        profile.email, 
        profile.phone,
        profile.profile_photo_url, 
        section.voice_section, 
        part.part
        FROM "profile"
        JOIN "section" ON profile.section_id = section.id
        JOIN "part" ON profile.part_id = part.id;
    `;
  pool
    .query(sqlQuery)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((dbErr) => {
      console.log("Error Fetching members:", dbErr);
    });
});

router.get("/:id", (req, res) => {
  const memberId = [req.params.id];

  const sqlQuery = `
  SELECT "profile".id AS "member_id", *, "shirt_size".size AS "shirt_size", "section".voice_section, "part".part AS "upper-lower", "status".status AS "singer_status" FROM "profile"
  JOIN "shirt_size" ON "profile".shirt_size_id = "shirt_size".id
  JOIN "section" ON "profile".section_id = "section".id
  JOIN "part" ON "profile".part_id = "part".id
  JOIN "status" ON "profile".status_id = "status".id
  WHERE "profile"."id" = $1
  `;

  pool
    .query(sqlQuery, memberId)
    .then((response) => {
      res.send(response.rows[0]);
    })
    .catch((dbErr) => {
      console.log("Server error fetching member:", dbErr);
      res.sendStatus(500);
    });
});

router.put("/edit/:id", (req, res) => {
  const memberId = req.params.id;

  const sqlQuery = `
      UPDATE "profile"
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
        accessibility = $36
      WHERE "id" = $37
  `;

  const sqlValues = [
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
    memberId
  ];

  pool.query(sqlQuery, sqlValues)
  .then(response => {
    res.sendStatus(201)
  })
  .catch((dbErr) => {
    console.log('Server Error udpating member:', dbErr)
    res.sendStatus(500)
  })
});

module.exports = router;
