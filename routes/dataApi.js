const express = require('express');
const router = express.Router();

const zeroPadding = (num, length) => {
    return ('00000000000000000000' + num).slice(-length);
}

router.get('/sakura', (req, res, next) => {
    const query = `SELECT * FROM heroku_8b85ae0ae7221fe.money WHERE user=? AND DATE_FORMAT(date, '%Y%m')=?;`;
    mysqlPool.query(query, [req.user.id, `${req.query.year}${zeroPadding(req.query.month,2)}`], (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        res.json(JSON.stringify(result));
    });
});