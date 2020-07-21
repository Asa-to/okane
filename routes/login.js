'use strict';
const express = require('express');
const router = express.Router();

//loginページ
router.get('/', (req, res, next) => {
    res.render('login');
});

module.exports = router;