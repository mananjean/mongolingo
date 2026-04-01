const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Autorise le frontend React à faire des requêtes vers ce backend
app.use(express.json()); // Permet de lire le JSON dans le corps des requêtes

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connexion à MongoDB réussie !'))
  .catch((err) => console.error('❌ Erreur de connexion à MongoDB :', err));

// Route de test simple
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API Mongolingo !');
});

// Route pour exécuter les requêtes MongoDB brutes
app.post('/api/execute', async (req, res) => {
  const { query } = req.body; // Exemple attendu : "db.movies.find({ phase: 1 })"

  try {
    // 1. Expression régulière (Regex) pour découper la commande
    // Elle extrait "movies", "find" et "{ phase: 1 }"
    const match = query.match(/^db\.([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)\(([\s\S]*)\)$/);
    
    if (!match) {
      return res.status(400).json({ 
        success: false, 
        error: "Format de requête invalide. Attendu : db.collection.methode({...})" 
      });
    }

    const collectionName = match[1];
    const methodName = match[2];
    const argsString = match[3] || '{}';

    // 2. Transformer la chaîne des arguments en véritable objet JavaScript
    // Note : Pour un projet étudiant en local, `new Function` est très pratique pour parser des objets JS non stricts (contrairement à JSON.parse).
    // (En entreprise sur un serveur public, on utiliserait un parseur spécifique pour des raisons de sécurité).
    const args = new Function('return ' + argsString)();

    // 3. Récupérer la collection MongoDB native
    const collection = mongoose.connection.db.collection(collectionName);

    // 4. Exécuter la commande selon la méthode demandée
    let result;
    if (methodName === 'find') {
      // 'find' retourne un curseur, il faut utiliser .toArray() pour avoir les résultats
      result = await collection.find(args).toArray();
    } else if (methodName === 'aggregate') {
      result = await collection.aggregate(args).toArray();
    } else {
      // Pour les autres méthodes comme countDocuments, findOne, etc.
      result = await collection[methodName](args);
    }

    // 5. Renvoyer le résultat au frontend
    res.json({ success: true, data: result });

  } catch (error) {
    // Si la requête MongoDB est mal formulée (ex: champ inexistant, erreur de syntaxe)
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- ROUTES DE SAUVEGARDE ET RESTAURATION ---

const DB_NAME = "mongolingo_mcu"; // Le nom de la base
const BACKUP_DIR = path.join(__dirname, '../backups');

// 1. Exporter en JSON
app.post('/api/backup/json', (req, res) => {
  // On exporte les deux collections
  const cmdMovies = `mongoexport --db ${DB_NAME} --collection movies --out "${path.join(BACKUP_DIR, 'movies_backup.json')}" --jsonArray`;
  const cmdCharacters = `mongoexport --db ${DB_NAME} --collection characters --out "${path.join(BACKUP_DIR, 'characters_backup.json')}" --jsonArray`;

  exec(`${cmdMovies} && ${cmdCharacters}`, (error, stdout, stderr) => {
    if (error) return res.status(500).json({ success: false, error: error.message });
    res.json({ success: true, message: "Sauvegarde JSON réussie dans le dossier backups !" });
  });
});

// 2. Exporter en BSON
app.post('/api/backup/bson', (req, res) => {
  const cmdDump = `mongodump --db ${DB_NAME} --out "${BACKUP_DIR}"`;
  
  exec(cmdDump, (error, stdout, stderr) => {
    if (error) return res.status(500).json({ success: false, error: error.message });
    res.json({ success: true, message: "Sauvegarde BSON réussie !" });
  });
});

// 3. Importer depuis JSON
app.post('/api/restore/json', (req, res) => {
  const cmdMovies = `mongoimport --db ${DB_NAME} --collection movies --file "${path.join(BACKUP_DIR, 'movies_backup.json')}" --jsonArray --drop`;
  const cmdCharacters = `mongoimport --db ${DB_NAME} --collection characters --file "${path.join(BACKUP_DIR, 'characters_backup.json')}" --jsonArray --drop`;

  exec(`${cmdMovies} && ${cmdCharacters}`, (error, stdout, stderr) => {
    if (error) return res.status(500).json({ success: false, error: error.message });
    res.json({ success: true, message: "Restauration JSON réussie !" });
  });
});

// 4. Importer depuis BSON
app.post('/api/restore/bson', (req, res) => {
  const cmdRestore = `mongorestore --db ${DB_NAME} --drop "${path.join(BACKUP_DIR, DB_NAME)}"`;
  
  exec(cmdRestore, (error, stdout, stderr) => {
    if (error) return res.status(500).json({ success: false, error: error.message });
    res.json({ success: true, message: "Restauration BSON réussie !" });
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});