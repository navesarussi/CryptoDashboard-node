const express = require('express');
router = express.Router();

const welcome = require('.././middlewares/welcome');


//router.use('/',welcome );
router.use('/welcome', welcome);

module.exports = router;