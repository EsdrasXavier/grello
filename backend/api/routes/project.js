'use-stric';

module.exports = (app) => {
  var project = require('../controllers/project');

  app.route('/project/createLane')
    .post(project.createLane);

  app.route('/project/createCard')
    .post(project.createCard)

  app.route('/projects/:email')
    .get(project.getProjects);
}