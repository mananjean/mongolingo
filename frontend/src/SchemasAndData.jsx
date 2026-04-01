import { useState } from 'react';

export default function SchemasAndData() {
  const [message, setMessage] = useState('');

  // Fonctions factices pour l'instant (nous allons créer le backend juste après)
  const handleBackup = async (format) => {
    setMessage(`⌛ Lancement de la sauvegarde au format ${format}...`);
    // Ici, nous ferons un appel fetch vers notre backend plus tard
    try {
      // Si format est 'JSON', on appelle '/api/backup/json', sinon '/api/backup/bson'
      const route = format === 'JSON' ? '/api/backup/json' : '/api/backup/bson';
      const response = await fetch(`http://localhost:5000${route}`, { method: 'POST' });
      const data = await response.json();
      
      if (data.success) {
        setMessage(`✅ ${data.message}`);
      } else {
        setMessage(`❌ Erreur : ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Impossible de joindre le serveur.");
    }
  };

  const handleRestore = async (format) => {
    setMessage(`⌛ Chargement des données depuis le format ${format}...`);
    // Pareil, appel backend à venir
    try {
      const route = format === 'JSON' ? '/api/restore/json' : '/api/restore/bson';
      const response = await fetch(`http://localhost:5000${route}`, { method: 'POST' });
      const data = await response.json();
      
      if (data.success) {
        setMessage(`🔄 ${data.message}`);
      } else {
        setMessage(`❌ Erreur : ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Impossible de joindre le serveur.");
    }
  };

  return (
    <div className="schemas-container duo-card">
      <h2>Comprendre la base de données MCU</h2>
      <img src={`public/assets/characters/dancing_bird.gif`} alt="dancing_bird" className="duo-character"/>
      <p className="schemas-intro">
        Pour réussir tes requêtes, observe bien la structure de nos documents !
      </p>

      <div className="schema-cards">
        <div className="schema-card duo-border-card">
          <h3>🎬 Collection : movies</h3>
          <ul>
            <li><code>_id</code> : ObjectId</li>
            <li><code>title</code> : String</li>
            <li><code>phase</code> : Number</li>
            <li><code>release_year</code> : Number</li>
            <li><code>box_office_millions</code> : Number</li>
            <li><code>director</code> : String</li>
            <li><code>villains</code> : Array of Strings</li>
          </ul>
        </div>

        <div className="schema-card duo-border-card">
          <h3>🦸‍♂️ Collection : characters</h3>
          <ul>
            <li><code>_id</code> : ObjectId</li>
            <li><code>hero_name</code> : String</li>
            <li><code>real_name</code> : String</li>
            <li><code>species</code> : String</li>
            <li><code>affiliations</code> : Array of Strings</li>
            <li><code>is_active</code> : Boolean</li>
            <li><code>stats</code> : Object (strength, intelligence...)</li>
            <li><code>debut_movie_id</code> : ObjectId</li>
          </ul>
        </div>
      </div>

      <hr className="divider" />

      <h2>Sauvegardes & Chargements</h2>
      <img src={`public/assets/characters/adventure_bird.gif`} alt="adventure_bird" className="duo-character"/>
      <p className="schemas-intro">Gère tes données aux formats JSON et BSON.</p>
      
      {message && <div className="status-message duo-alert-green">{message}</div>}

      <div className="data-actions">
        <div className="action-group">
          <h4 className="format-title">Format JSON</h4>
          <button onClick={() => handleBackup('JSON')} className="duo-btn duo-btn-blue">Exporter JSON</button>
          <button onClick={() => handleRestore('JSON')} className="duo-btn duo-btn-orange">Importer JSON</button>
        </div>
        <div className="action-group">
          <h4 className="format-title">Format BSON</h4>
          <button onClick={() => handleBackup('BSON')} className="duo-btn duo-btn-blue">Exporter BSON</button>
          <button onClick={() => handleRestore('BSON')} className="duo-btn duo-btn-orange">Importer BSON</button>
        </div>
      </div>
    </div>
  );
}