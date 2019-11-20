'use-strict';

const execSQLQuery = require('../../db/db.js');

exports.getBoards = (req, res) => {
  const query = req.params;
  const { projectId } = query;
  
  const sql = `SELECT title, position, created_on, user_email, project_id
                FROM board WHERE project_id = '${projectId}'`;

  execSQLQuery(sql, res);
}

exports.createBoard = (req, res) => {
  const params = req.body;
  const { position, user_email, project_id } = params;
  
  const sql = `INSERT INTO board(position, user_email, project_id)
                VALUES('${position}', '${user_email}', '${project_id}')`;
  
  execSQLQuery(sql, res);
}
