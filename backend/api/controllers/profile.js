'use-strict';

const execSQLQuery = require('../../db/db.js');

exports.login = (req, res) => {
  const params = req.body;
  const { email, password } = params;
  
  const sql = `SELECT name, email FROM user WHERE 
                email = '${email}' AND
                password = MD5('${password}');`;

  execSQLQuery(sql, res);
}

exports.createAccount = (req, res) => {
  const params = req.body;
  const { email, username, password } = params;

  if (!email || !username || !password) {
    res.json({error: 'Dados inválidos.'})
    return ;
  }
  
  const sql = `INSERT INTO user(email, name, password)
                VALUES('${email}', '${username}', MD5('${password}'))`;
  
  execSQLQuery(sql, res);
}

exports.profile = (req, res) => {
  console.log(req);
  console.log(res);
}