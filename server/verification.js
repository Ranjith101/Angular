// verification.js

const express = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const router = express.Router();
const sql = require("mssql"); // Import sql for database operations
const pool = require("./database"); // Import your database connection
const { async } = require("rxjs/internal/scheduler/async");

router.get("/verify", async (req, res) => {
  const verificationToken = req.query.token;

  try {
    // Define an async function to await the database query
    async function updateUserVerification() {
      const query = `UPDATE users SET Verified = 1 WHERE VerificationToken = @token`;
      const request = pool.request();
      request.input("token", sql.VarChar(64), verificationToken);

      const result = await request.query(query);

      if (result.rowsAffected[0] === 1) {
        // Token was valid and user's verification status updated
        res.status(200).json({ message: "Email verification successful" });
      } else {
        // Token was invalid or user not found
        res.status(400).json({ message: "Invalid verification token" });
      }
    }

    // Call the async function
    await updateUserVerification();
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Error verifying email" });
  }
});

module.exports = router;
