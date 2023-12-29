const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  idUser: {
    type: String,
    required: true
  },
  idContent: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('like', dataSchema);