import { useState } from 'react';
import Home from './Home';
import Quiz from './Quiz';
import SchemasAndData from './SchemasAndData';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fonction pour changer de page ET fermer le menu sur mobile
  const handleNavigation = (view) => {
    setCurrentView(view);
    setIsMenuOpen(false); 
  };

  return (
    <div className="mongolingo-app">
      {/* Menu horizontal façon Duolingo */}
      <nav className="top-navbar">
        <div className="logo">mongolingo</div>
        {/* Le bouton Burger (affiché uniquement sur mobile en CSS) */}
        <button 
          className="burger-menu" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✖' : '☰'}
        </button>
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <button 
            className={currentView === 'home' ? 'nav-btn active' : 'nav-btn'} 
            onClick={() => handleNavigation('home')}
          >
            Accueil
          </button>
          
          <button 
            className={currentView === 'quizz' ? 'nav-btn active' : 'nav-btn'} 
            onClick={() => handleNavigation('quizz')}
          >
            Jouer
          </button>
          
          <button 
            className={currentView === 'schemas' ? 'nav-btn active' : 'nav-btn'} 
            onClick={() => handleNavigation('schemas')}
          >
            Schémas & Données
          </button>
        </div>
      </nav>

      {/* Zone de contenu principal */}
      <main className="main-content">
        <div className="content-wrapper">
          {currentView === 'home' && <Home onPlay={() => handleNavigation('quizz')} />}
          {currentView === 'quizz' && <Quiz />}
          {currentView === 'schemas' && <SchemasAndData />}
        </div>
      </main>
    </div>
  );
}

export default App;