const express = require('express');
const path = require('path');

const router = express.Router();

// GET / -> index.html 파일 제공
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html')); 
});

module.exports = router;