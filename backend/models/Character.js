const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  hero_name: String,
  real_name: String,
  species: String,
  affiliations: [String],
  is_active: Boolean,
  stats: {
    strength: Number,
    intelligence: Number,
    combat_skills: Number
  },
  debut_movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }
});

module.exports = mongoose.model('Character', characterSchema);