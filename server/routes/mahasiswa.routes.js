const express = require('express');
const router = express.Router();

// dummy route
router.get('/me', (req, res) => {
  res.json({ message: 'Mahasiswa route ready' });
});

module.exports = router;