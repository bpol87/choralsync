const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.put('/profile-info', (req, res) => {
    console.log('req.body is:', req.body)
    
  const sqlQuery = `
  UPDATE "profile"
  SET "first_name" = $1, "last_name" = $2, "middle_initial" = $3, "hide_middle_initial" = $4, "pronouns" = $5, "hide_pronouns" = $6, "nickname" = $7, "formal_name" = $8, "height_ft" = $9, "height_in" = $10, "birthday" = $11, "sheet_music" = $12, "accessibility" = $13, "shirt_size_id" = $14
  WHERE "user_id" = $15
  `

  const sqlValues = [req.body.first_name, req.body.last_name, req.body.middle_initial, req.body.hide_middle_initial, req.body.pronouns, req.body.hide_pronouns, req.body.nickname, req.body.formal_name, req.body.height_ft, req.body.height_in, req.body.birthday, req.body.sheet_music, req.body.accessibility, req.body.shirt_size_id]

pool.query(sqlQuery, sqlValues)
.then(result => {
 console.log('PUT Request has received a request')
})
.catch(()=>{
    console.log()
})

});

module.exports = router;
