const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  id: Number,
  title: String,
  date: Date,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', EventSchema);
