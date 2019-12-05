'use-strict';

const execSQLQuery = require('../../db/db.js');

exports.createLane = (req, res) => {
  const params = req.body;
  const { title, email } = params;

  const sql = `
  INSERT INTO lanes(name_id, title, user_id) 
  VALUES('${title}', '${title}', (SELECT id FROM user WHERE email = '${email}'))`;

  console.log(sql)
  execSQLQuery(sql, res);
}

exports.createCard = (req, res) => {
  const params = req.body;
  const { id, title, label, description, lane_id } = params;

  const sql = `
  INSERT INTO card(id, title, label, description, lanes_id) 
  VALUES('${id}', '${title}', '${label}', '${description}', '${lane_id}')
  `;

  console.log(sql)
  execSQLQuery(sql, res);
}

exports.getProjects = (req, res) => {
  const query = req.params;
  const { email } = query;

  const sql = `
  SELECT ln.id AS lane_id,
        ln.name_id AS label_name, ln.title AS lane_title,
		    cd.title AS card_title, cd.label AS card_label,
        cd.description AS card_description,
        cd.lanes_id AS card_lane_id,
        cd.id AS cardId
	  FROM  lanes AS ln
	  LEFT JOIN card AS cd
    ON cd.lanes_id = ln.id 
    WHERE ln.user_id = (
		  SELECT id FROM user 
		  WHERE email = '${email}'
    );`
      console.log(sql)
  execSQLQuery(sql, res);
}