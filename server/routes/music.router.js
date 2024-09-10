const express = require("express");
const pool = require("../modules/pool");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const router = express.Router();

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