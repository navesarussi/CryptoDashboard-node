const express = require('express');
const router = express.Router();

const dashboard = require('.././middlewares/dashboard');
const logout = require('.././middlewares/logout');
const symbol = require('.././middlewares/symbol');

  


router.get('/dashboard',dashboard);
router.get('/logout',logout);
router.post('/symbol',symbol);



module.exports = router;

