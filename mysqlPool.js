const mysql = require('mysql');

const mysqlPool = mysql.createPool({
  host: 'us-cdbr-east-02.cleardb.com',
  user: 'bacb732ba69df4',
  password: 'e8313452',
});

mysqlPool.getConnection((err) => {
  if (err) {
    console.log('mysql connection defined');
    throw err;
  }
  console.log('Complite connetion to my database');
});

module.exports = mysqlPool;