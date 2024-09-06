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

router.get('/:id', (req, res) => {
  const memberId = [req.params.id]

  const sqlQuery = `
  SELECT "profile".id AS "member_id", *, "shirt_size".size AS "shirt_size", "section".voice_section, "part".part AS "upper-lower", "status".status AS "singer_status" FROM "profile"
  JOIN "shirt_size" ON "profile".shirt_size_id = "shirt_size".id
  JOIN "section" ON "profile".section_id = "section".id
  JOIN "part" ON "profile".part_id = "part".id
  JOIN "status" ON "profile".status_id = "status".id
  WHERE "profile"."id" = $1
  `

  pool.query(sqlQuery, memberId)
  .then((response) => {
    res.send(response.rows[0])
  })
  .catch((dbErr) => {
    console.log('Server error fetching member:', dbErr)
    res.sendStatus(500);
  })
})

module.exports = router;
