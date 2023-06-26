const express = require('express');
router = express.Router();

const welcome = require('.././middlewares/welcome');

router.get('/welcome', welcome);

module.exports = router;