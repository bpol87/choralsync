const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "users" ("username", "password")
    VALUES ($1, $2) RETURNING id, username;`
  
    pool
    .query(queryText, [username, password])
    .then((response) => {
      console.log(response.rows);
      const userId = response.rows[0].id;
      const userEmail = response.rows[0].username;
      console.log(userId, userEmail);
      const profileQuery = `
      INSERT INTO "profile" ("user_id", "email")
    VALUES ($1, $2)
    `;
      pool
        .query(profileQuery, [userId, userEmail])
        .then(() => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log("Error creating profile", err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res, next) => {
  // Use passport's built-in method to log out the user
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.sendStatus(200);
  });
});

module.exports = router;
