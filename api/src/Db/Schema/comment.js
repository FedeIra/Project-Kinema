const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }, 
  idReference: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('comment', dataSchema);