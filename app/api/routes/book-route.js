'use strict';

module.exports = function (app) {
  var book = require('../controllers/book-controller');

  app.route('/books')
    .get(book.findAll)
    .post(book.create);

  app.route('/books/:id')
    .get(book.find)
    .put(book.update)
    .delete(book.delete);
};