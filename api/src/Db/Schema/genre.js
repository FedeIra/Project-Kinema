const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    lowercase: true,
    enum: ['movie', 'tv'],
    required: true
  }
});

module.exports = mongoose.model('genre', dataSchema);