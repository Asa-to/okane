'use strict';
var express = require('express');
var router = express.Router();

//loginページ
router.get('/', function(req, res, next){
    res.render('login');
});

module.exports = router;