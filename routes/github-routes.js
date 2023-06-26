const express = require('express');
const router = express.Router();

const authenticate = require('.././middlewares/authenticate');
const callback = require('.././middlewares/callback');



router.get('/', authenticate);
router.get('/callback',callback);

module.exports = router;

