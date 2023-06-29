const express = require('express');
const router = express.Router();

//const authenticate = require('.././middlewares/authenticate');
//const callback = require('.././middlewares/callback');
const passport = require('../middlewares/auth');



router.get('/', passport.authenticate('github', { scope: [ 'user:email' ] })); 
router.get('/callback', passport.authenticate('github', { failureRedirect: '/welcome', successRedirect: '/dashboard' }))

module.exports = router;

