const express = require('express');
const router = express.Router();
const {loginMahasiswa} = require('../controllers/auth.controller')

router.post('/login', loginMahasiswa);

module.exports = router;
