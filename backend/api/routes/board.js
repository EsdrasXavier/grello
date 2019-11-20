'use-strict';

module.exports = (app) => {
  var board = require('../controllers/board');

  app.route('/createBoard')
    .post(board.createBoard);

  app.route('/board/:projectId')
    .get(board.getBoards);
}
