const express = require("express");
const session = require("express-session");

const app = express();

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
    name: "siapit.sid",
    secret: "siapit-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
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
