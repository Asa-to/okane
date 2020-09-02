const express = require('express');
const router = express.Router();
const mysqlPool = require('./../mysqlPool');

const zeroPadding = (num, length) => {
    return ('00000000000000000000' + num).slice(-length);
}

router.get('/', (req, res, next) => {
    res.send('Please access to /sakura or anything');
});

router.get('/sakura', (req, res, next) => {
    const date = `${req.query.year}-${zeroPadding(req.query.month, 2)}-01`
    const query = `SELECT id, title, amount, DATE_FORMAT(date, '%Y-%m-%d') AS date FROM heroku_8b85ae0ae7221fe.money WHERE user=? AND date BETWEEN ? AND LAST_DAY(?) ORDER BY date ;`;
    mysqlPool.query(query, [req.user.id, date, date], (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        res.json(JSON.stringify(result));
    });
});

router.get('/totalAsset', (req, res, next) => {
    const query = `SELECT SUM(amount) FROM heroku_8b85ae0ae7221fe.money WHERE user=?;`;
    mysqlPool.query(query, [req.user.id], (err, result, fields) => {
        if(err) throw err;
        console.log(JSON.stringify(result));
        res.json(JSON.stringify(result));
    });
});

module.exports = router;