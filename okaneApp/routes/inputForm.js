var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('inputForm');
});

router.post('/confirm', function(req, res, next){
    var today = new Date();
    var data = {
        year: req.body['year'] ? req.body['year'] : today.getFullYear(),
        month: req.body['month'] ? req.body['month'] : today.getMonth(),
        day: req.body['day'] ? req.body['day'] : today.getDay,
        payment: req.body['payment'] ? req.body['payment'] : 0,
        expence: req.body['balance'].value === 'expence'
    };
    console.log(data['year']);
    res.render('inputForm', {data: data});
});

module.exports = router;