'use-stric';

module.exports = (app) => {
  var project = require('../controllers/project');

  app.route('/create')
    .post(project.create);

  app.route('/projects')
    .post(project.getProjects);
}