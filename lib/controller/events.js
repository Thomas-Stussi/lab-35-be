const { Router } = require('express');
const Event = require('../models/Event');

module.exports = new Router()
  .post('/', (req, res, next) => {
    Event
      .insert(req.body)
      .then(event => res.send(event))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Event
      .findById(req.params.id)
      .then(event => res.send(event))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Event
      .find()
      .then(events => res.send(events))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Event
      .update(req.params.id, req.body)
      .then(event => res.send(event))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Event
      .delete(req.params.id)
      .then(event => res.send(event))
      .catch(next);
  });
