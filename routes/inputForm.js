const express = require('express');
const router = express.Router();

const today = new Date();

router.get('/', (req, res, next) => {
    res.render('inputForm',{today: `${today.getFullYear()}-${('00' + (today.getMonth()+1)).slice(-2)}-${('00' + today.getDate()).slice(-2)}`});
});

router.post('/confirm', (req, res, next) => {
    console.log(typeof(req.body['date']));
    const data = {
        year: req.body['date'].substr(0,4),
        month: req.body['date'].substr(5,2),
        day: req.body['date'].substr(8,2),
        payment: req.body['payment'],
        income: req.body['balance'] === 'income'
    };
    res.render('inputForm', {data: data});
});

module.exports = router;