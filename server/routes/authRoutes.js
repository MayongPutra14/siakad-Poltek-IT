require('dotenv').config(); // using dotenv package.
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/database"); // import databse connection

// define Endpoint Login

router.post("/login", async (req, res) => {
    console.log("Data yang masuk:", req.body); // Tambahkan ini!
  const { nim, password } = req.body;

  // 1. validation Input (basic sanitation)
  if (!nim || !password) {
    return res.status(400).json({
      message: "nim dan Password Wajib di isi",
    });
  }

  try {
    // 2. Search user in database
    // we use [rows] because mysql2/promise return an array
    const query = "SELECT * FROM mahasiswa_account WHERE nim = ?";
    const [rows] = await db.execute(query, [nim]);

    if (rows.length === 0) {
        console.log("=> NIM tidak ditemukan di DB"); // Log Tambahan
      return res.status(401).json({
        message: "Akun tidak ditemukan.",
      });
    }

    const user = rows[0];

    // 3. verification password by bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log("=> Password salah! Hash di DB adalah:", user.password); // Log Tambahan
      return res.status(401).json({
        message: "Akun tidak ditemukan.",
      });
    }

    // 4. Generate Token
    // save id so that front end know who is login
    const token = jwt.sign(
      { id: user.nim },
      process.env.JWT_SECRET || "Private Code",
      { expiresIn: "1h" }
    );

    // 5. Send Success Response
    res.json({
      message: "Login Successfully",
      token: token,
      user: {
        nim: user.nim,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
});

module.exports = router
