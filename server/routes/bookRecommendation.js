/* routes/bookRecommendation.js */

const express = require('express');

const router = express.Router();

const { recommendBooks } = require('../controllers/bookRecommendationController');

router.get('/:bookType(*)', recommendBooks);

module.exports = router;