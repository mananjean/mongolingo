import { useState, useEffect } from 'react';
import { questionsMCU as questions } from './questionsData';

export default function Quiz() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userQuery, setUserQuery] = useState('');

  const [availableBlocks, setAvailableBlocks] = useState([]);
  const [selectedBlocks, setSelectedBlocks] = useState([]);

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResultData, setShowResultData] = useState(false);

  const question = questions[currentQIndex];

  // 1. Liste de tes fichiers GIFs (mets ici les noms exacts de tes fichiers)
  const characters = [
    'bear.gif',
    'fingers_girl.gif',
    'fitness_guy.gif',
    'gothic_girl.gif',
    'happy_woman.gif',
    'like_old_man.gif',
    'little_boy.gif',
    'mister_kiss.gif',
    'woman_kiss.gif'
  ];

  // 2. State pour stocker le personnage actuel
  const [currentCharacter, setCurrentCharacter] = useState(characters[0]);

  // 3. Changer de personnage aléatoirement à chaque nouvelle question
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    setCurrentCharacter(characters[randomIndex]);
  }, [currentQIndex]); // Se déclenche quand on change de question

  // À chaque fois qu'on change de question, on prépare l'interface
  useEffect(() => {
    if (question.level === "Facile" && question.blocks) {
      // On transforme les strings en objets avec un ID unique pour éviter les bugs si deux blocs ont le même texte (ex: deux parenthèses)
      const blocksWithIds = question.blocks.map((text, i) => ({ id: i, text }));
      // On mélange le tableau pour la banque de mots
      const shuffled = blocksWithIds.sort(() => Math.random() - 0.5);
      setAvailableBlocks(shuffled);
      setSelectedBlocks([]);
    } else {
      // Pour Moyen et Difficile, on vide simplement le champ texte
      setUserQuery('');
    }
  }, [currentQIndex, question]);

  // Fonctions pour déplacer les blocs en cliquant dessus
  const moveToSelected = (block) => {
    setAvailableBlocks((prev) => prev.filter((b) => b.id !== block.id));
    setSelectedBlocks((prev) => [...prev, block]);
  };

  const moveToAvailable = (block) => {
    setSelectedBlocks((prev) => prev.filter((b) => b.id !== block.id));
    setAvailableBlocks((prev) => [...prev, block]);
  };

  const handleExecute = async () => {
    setError(null);
    setResult(null);
    setShowResultData(false);
    
    // Si c'est facile, la requête est la fusion des blocs sélectionnés. Sinon, c'est le texte tapé.
    const queryToSend = question.level === "Facile" 
      ? selectedBlocks.map(b => b.text).join('') 
      : userQuery;
    
    try {
      const response = await fetch('http://localhost:5000/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryToSend })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult(data.data);
        setShowExplanation(true); // On affiche l'explication après une exécution réussie
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Impossible de se connecter au serveur. Est-il bien lancé ?");
    }
  };

  const nextQuestion = () => {
    setCurrentQIndex((prev) => (prev + 1) % questions.length); // Passe à la suivante ou boucle
    setUserQuery('');
    setResult(null);
    setError(null);
    setShowExplanation(false);
    setShowResultData(false);
  };

  return (
    <div className="quiz-container duo-card">
      <div className="quiz-header">
        <span className="duo-badge">Niveau {question.level}</span>
        <h3 className="quiz-progress">Défi {currentQIndex + 1} / {questions.length}</h3>
      </div>
      <div className="quiz-instruction-wrapper">
        <div className="character-container">
          <img 
            src={`public/assets/characters/${currentCharacter}`} 
            alt="Personnage" 
            className="duo-character" 
          />
        </div>
        
        <div className="instruction-box duo-speech-bubble">
          <p><strong>Mission :</strong> {question.instruction}</p>
        </div>
      </div>
      
      {question.level === "Facile" ? (
        <div className="blocks-game-container">
          {/* Zone de la phrase en construction */}
          <div className="selected-blocks-zone">
            {selectedBlocks.length === 0 && <span className="placeholder-text">Clique sur les blocs pour construire ta requête...</span>}
            {selectedBlocks.map((block) => (
              <button 
                key={block.id} 
                className="duo-block-btn selected"
                onClick={() => moveToAvailable(block)}
              >
                {block.text}
              </button>
            ))}
          </div>

          <hr className="blocks-divider" />

          {/* Banque de mots mélangés */}
          <div className="available-blocks-zone">
            {availableBlocks.map((block) => (
              <button 
                key={block.id} 
                className="duo-block-btn available"
                onClick={() => moveToSelected(block)}
              >
                {block.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <textarea 
          value={userQuery} 
          onChange={(e) => setUserQuery(e.target.value)} 
          placeholder="Tape ta requête ici... (ex: db.movies.find({ phase: 1 }))"
          rows="4"
          className="query-input duo-input"
        />
      )}
      
      <div className="quiz-actions">
        <button className="duo-btn duo-btn-primary" onClick={handleExecute}>
          Vérifier
        </button>
      </div>

      {error && <div className="error-box duo-alert-red">❌ Aïe : {error}</div>}

      {/* Affichage des résultats venant de la base de données */}
      {result && (
        <div className="result-box duo-alert-gray">
          {!showResultData ? (
            <button 
              className="duo-btn duo-btn-secondary toggle-result-btn" 
              onClick={() => setShowResultData(true)}
            >
              Afficher le résultat de la requête
            </button>
          ) : (
            <>
              <div className="result-header">
                <h4>Données renvoyées par MongoDB :</h4>
                <button 
                  className="hide-result-btn" 
                  onClick={() => setShowResultData(false)}
                >
                  Masquer
                </button>
              </div>
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </>
          )}
        </div>
      )}

      {showExplanation && (
        <div className="explanation-box duo-alert-blue">
          <h4>Super ! Voici l'explication :</h4>
          <p>{question.explanation}</p>
          <button className="duo-btn duo-btn-blue next-btn" onClick={nextQuestion}>
            Continuer
          </button>
        </div>
      )}
    </div>
  );
}