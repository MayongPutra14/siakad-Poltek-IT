const express = require("express");
const router = express.Router();
const mahasiswaController = require('../controllers/mahasiswa.controller')
const { isAuthenticatedMahasiswa } = require("../middlewares/auth.middleware");


router.get("/me", isAuthenticatedMahasiswa, mahasiswaController.getMyProfile);

module.exports = router;