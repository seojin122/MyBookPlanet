/* routes/booklumi.js */

const express = require("express");

const router = express.Router();

const { submitBooklumi } = require("../controllers/booklumiController");

router.post("/", submitBooklumi);

module.exports = router;