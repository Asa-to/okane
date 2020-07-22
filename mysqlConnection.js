const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'us-cdbr-east-02.cleardb.com',
  user: 'bacb732ba69df4',
  password: 'e8313452',
});

mysqlConnection.connect((err) => {
  if (err) throw err;
  console.log('Complite connetion to my database');
});

module.exports = mysqlConnection;