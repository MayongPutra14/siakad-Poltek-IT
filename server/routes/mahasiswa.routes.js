const express = require("express");
const router = express.Router();
const mahasiswaController = require('../controllers/mahasiswa.controller')
const { isAuthenticatedMahasiswa } = require("../middlewares/auth.middleware");


router.get('/dashboard',isAuthenticatedMahasiswa, mahasiswaController.getDashboardSummary)

router.get("/profile", isAuthenticatedMahasiswa, mahasiswaController.getMyProfile);

router.get('/krs', isAuthenticatedMahasiswa, mahasiswaController.getAllKrs);

router.get('/khs', isAuthenticatedMahasiswa, mahasiswaController.getAllKhs);

module.exports = router;
