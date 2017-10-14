let debug = require('debug')('app:event');
const Event = require('../models/event.js');
const Counter = require('../models/counter.js');

module.exports = {
  getAll: getAll,
  getById: getById,
  create: create,
  update: update,
  delete: remove,
};

function getAll(req, res) {
  Event.find()
    .then(events => res.json(events));
}

function getById(req, res) {
  debug('getById:', req.swagger.params.id.value);
  Event.findOne({ id: req.swagger.params.id.value })
    .then(event => res.json(event));
}

function create(req, res) {
  Counter.issueNewId('event')
    .then(newId => Object.assign({}, req.body, { id: newId }))
    .then(body => Event.create(body))
    .then(newEvent => res.json(newEvent));
}

function update(req, res) {
  debug('update', req.swagger.params.id.value);
  Event.findOneAndUpdate(
    { id: req.swagger.params.id.value },
    { $set: req.body }
  )
  .then(event => res.json(event));
}

function remove(req, res) {
  debug('delete', req.swagger.params.id.value);
  Event.deleteOne({ id: req.swagger.params.id.value })
    .catch(err => debug(err));
}
