'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: {
    type: String,
    required: 'Title Book'
  },
  isbn: {
    type: String,
    required: 'ISBN Book'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Books', BookSchema);