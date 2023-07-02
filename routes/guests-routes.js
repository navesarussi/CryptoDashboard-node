const express = require('express');
router = express.Router();

const welcome = require('../middlewares/welcome');
const enforceGuest = require('../middlewares/enforce-guests');
console.log('Welcome');

//router.use('/',enforceGuest,welcome );
router.use('/welcome',enforceGuest, welcome);
console.log('Welcome2');

module.exports = router;