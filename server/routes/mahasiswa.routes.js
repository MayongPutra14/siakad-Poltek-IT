const express = require("express");
const router = express.Router();
const { isAuthenticatedMahasiswa } = require("../middlewares/auth.middleware");

// dummy route
router.get("/me", isAuthenticatedMahasiswa, (req, res) => {
  res.json({
    message: "Mahasiswa route ready",
    indentity: req.session.user
  });
});

module.exports = router;