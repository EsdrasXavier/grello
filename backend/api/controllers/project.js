'use-strict';

const execSQLQuery = require('../../db/db.js');

exports.create = (req, res) => {
  const params = req.body;
  const { title, email } = params;

  const sql = `INSERT INTO project(title, user_email, created_on)
              VALUES('${title}', '${email}', CURRENT_TIMESTAMP)`;

  execSQLQuery(sql, res);
}

exports.getProjects = (req, res) => {
  const query = req.params;
  const { email } = query;

  const sql = `SELECT id, title, user_email FROM 
                project WHERE user_email = '${email}'`;

  execSQLQuery(sql, res);
}