const express = require('express');
const router = express.Router();

const dashboard = require('.././middlewares/dashboard');
const logout = require('.././middlewares/logout');
const symbol = require('.././middlewares/symbol');
const enforeAuth = require('.././middlewares/enforce-auth');
  


router.get('/dashboard', enforeAuth, dashboard);
router.get('/logout',logout);
router.post('/symbol',symbol);



module.exports = router;

