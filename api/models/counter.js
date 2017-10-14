const mongoose = require('mongoose');
const debug = require('debug')('app:counter');

const CounterSchemae = new mongoose.Schema({
  _id: String,
  seq: Number
});

CounterSchemae.statics.issueNewId = function(keyId) {
  return new Promise((resolve, reject) => {
    this.findByIdAndUpdate(
      keyId,
      { $inc: { seq: 1 } },
      {
        new: true,
        upsert: true
      },
      (err, counter) => {
        if (err) reject(err);
        debug(counter.seq);
        resolve(counter.seq);
      }
    );
  });
};

module.exports = mongoose.model('Counter', CounterSchemae);
