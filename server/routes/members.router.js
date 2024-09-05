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

module.exports = router;
