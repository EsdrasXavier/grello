var mysql = require('mysql');//Inclui a biblioteca instalada do Mysql

module.exports = (sqlQuery, res) => {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'new_grello'
  });

  connection.connect();
  connection.query(sqlQuery, (error, results, fields) => {
    if (error) res.json(error);
    else res.json(results)
  
    connection.end();
  });
}   