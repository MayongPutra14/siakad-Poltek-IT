require('dotenv').config()
const express = require("express");
const session = require("express-session");
const cors = require('cors');
const app = express();

/**
 * ======================
 * CORS
 * ======================
 */

app.use(cors({
  origin: [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:5501",
    "http://127.0.0.1:5501"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

/**
 * ======================
 * GLOBAL MIDDLEWARE
 * ======================
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * ======================
 * SESSION CONFIG
 * ======================
 */

app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24
    },
  })
);

/**
 * ======================
 * ROUTES
 * ======================
 */

const authRoutes = require("./routes/auth.routes.js");
const mahasiswaRoutes = require("./routes/mahasiswa.routes.js");


app.use("/auth", authRoutes);
app.use("/mahasiswa", mahasiswaRoutes);

/**
 * ======================
 * EXPORT APP
 * ======================
 */

module.exports = app;
