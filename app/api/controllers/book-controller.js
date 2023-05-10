'use strict';

var mongoose = require('mongoose');
var Books = mongoose.model('Books');

exports.findAll = (req, res) => {
  Books.find()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Libros."
    });
  });
};

exports.create = function (req, res) {
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  if (!req.body.isbn) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const libro = new Books({
    title: req.body.title,
    isbn: req.body.isbn,
  });

  libro
    .save(libro)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Book."
      });
    });
};

exports.find = function (req, res) {
  const id = req.params.id;

  Books.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Book with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Book with id=" + id });
    });
};

exports.update = function (req, res) {
  const id = req.params.id;

  Books.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Book with id=${id}. Maybe Book was not found!`
        });
      } else res.send({ message: "Book was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Book with id=" + id
      });
    });
};

exports.delete = function (req, res) {
  const id = req.params.id;

  Books.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Books with id=${id}. Maybe Book was not found!`
        });
      } else {
        res.send({
          message: "Book was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Book with id=" + id
      });
    });
};