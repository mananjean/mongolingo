
export default function Home({ onPlay }) {
  return (
    <div className="home-container">
      <div className="mascot-placeholder">
        <img src={`public/assets/characters/hello_bird.webp`} alt="Coucou" className='mascot-image'/>
      </div>
      <h1>Apprends MongoDB gratuitement.<br/>Pour toujours.</h1>
      <p>
        La façon la plus amusante et efficace d'apprendre à faire 
        des requêtes NoSQL pour maîtriser le MCU !
      </p>
      <button className="duo-btn duo-btn-primary" onClick={onPlay}>
        C'est parti !
      </button>
    </div>
  );
}