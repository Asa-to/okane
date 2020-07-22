const express = require('express');
const { response } = require('../app');
const router = express.Router();
const mysql = require('mysql');

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

    const mysqlConnection = mysql.createConnection({
        host: 'us-cdbr-east-02.cleardb.com',
        user: 'bacb732ba69df4',
        password: 'e8313452',
    });
    mysqlConnection.connect((err) => {
        if (err) throw err;
        console.log('Complite connetion to my database');
    });
    console.log(req.user.id);
    const sql = `INSERT INTO heroku_8b85ae0ae7221fe.money(user, amount, date, title) VALUES('${req.user.id}', '${req.body['payment'] * (req.body['balance'] === 'income' ? 1 : -1)}', '${req.body['date']}', '${req.body['title']}');`;
    mysqlConnection.query(sql, (err, result, fields) => {
        if(err) throw err;
        console.log('data send complite');
        res.render('inputForm', { data: data });
    });
});

module.exports = router;