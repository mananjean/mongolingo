const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  phase: Number,
  release_year: Number,
  box_office_millions: Number,
  director: String,
  villains: [String]
});

module.exports = mongoose.model('Movie', movieSchema);