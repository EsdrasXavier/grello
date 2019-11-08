'use-strict';

const execSQLQuery = require('../../db/db.js');

exports.create = (req, res) => {
  const params = req.body;
  const { title, email } = params;
  
  // const sql = `SELECT name, email FROM user WHERE 
  //               email = '${email}' AND
  //               password = MD5('${password}');`;

  // execSQLQuery(sql, res);
  res.json({ message: 'ok' });
}

exports.getProjects = (req, res) => {
  const params = req.body;
  const { email } = params;
  
  res.json({ message: 'ok' });
}