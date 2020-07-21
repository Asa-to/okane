const express = require('express');
const router = express.Router();

const today = new Date();

router.get('/', (req, res, next) => {
    res.render('inputForm',{
        today: {
            year: today.getFullYear(),
            month: today.getMonth()+1,
            day: today.getDate()
        }
    });
});

router.post('/confirm', (req, res, next) => {
    const data = {
        year: req.body['year'] ? req.body['year'] : today.getFullYear(),
        month: req.body['month'] ? req.body['month'] : today.getMonth()+1,
        day: req.body['day'] ? req.body['day'] : today.getDate(),
        payment: req.body['payment'] ? req.body['payment'] : 0,
        expence: req.body['balance'] === 'expence'
    };
    res.render('inputForm', {data: data});
});

module.exports = router;