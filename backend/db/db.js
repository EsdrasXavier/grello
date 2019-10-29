var mysql = require('mysql');//Inclui a biblioteca instalada do Mysql
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: ''
});

connection.connect();
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
