'use-strict';

module.exports = (app) => {
  var profile = require('../controllers/profile');

  app.route('/login')
    .post(profile.login);
  
  app.route('/createAccount')
    .post(profile.createAccount);

  app.route('/profile/:profileId')
    .get(profile.profile);
}