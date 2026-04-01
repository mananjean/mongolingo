const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Movie = require('./models/Movie');
const Character = require('./models/Character');

// Chemins vers tes fichiers de démonstration
const moviesDataPath = path.join(__dirname, '../data_demo/movies.json');
const charactersDataPath = path.join(__dirname, '../data_demo/characters.json');

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connecté à MongoDB pour importation...');

    // Vider les collections existantes pour éviter les doublons
    await Movie.deleteMany();
    await Character.deleteMany();
    console.log('🗑️ Collections vidées.');

    // Lire et parser les fichiers JSON
    const movies = JSON.parse(fs.readFileSync(moviesDataPath, 'utf-8'));
    const characters = JSON.parse(fs.readFileSync(charactersDataPath, 'utf-8'));

    // Insérer les données
    await Movie.insertMany(movies);
    await Character.insertMany(characters);

    console.log('🎉 Données importées avec succès !');
    process.exit();
  } catch (error) {
    console.error('❌ Erreur lors de l\'importation :', error);
    process.exit(1);
  }
};

importData();