'use-stric';

module.exports = (app) => {
  var project = require('../controllers/project');

  app.route('/project/create')
    .post(project.create);

  app.route('/projects/:email')
    .get(project.getProjects);
}