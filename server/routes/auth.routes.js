const express = require('express');
const router = express.Router();
const {loginMahasiswa} = require('../controllers/auth.controller')

// dummy route
router.post('/login', loginMahasiswa);

module.exports = router;
