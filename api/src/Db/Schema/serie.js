const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  genre: {
    type: Array,
    required: true
  },
  popularity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  backPoster: {
    type: String,
    required: true
  },
  vote_average: {
    type: Number,
    required: true
  },
  vote_count: {
    type: Number,
    required: true
  },
  first_air_date: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('serie', dataSchema);