'use-strict';

module.exports = function(app) {
  // console.log(app)
  var profile = require('../controllers/profile');

  app.route('/login')
    .post(profile.login);

  app.route('/profile/:profileId')
    .get(profile.profile);
}