// Fonction pour envoyer une fausse requête depuis notre terminal vers notre serveur
const testNotreAPI = async () => {
  try {
    // On simule ce que fera React plus tard : envoyer "db.movies.find({ phase: 1 })"
    const reponse = await fetch('http://localhost:5000/api/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        query: "db.movies.find({ phase: 1 })" 
      })
    });

    const resultat = await reponse.json();
    
    console.log("🚀 Résultat de la requête :");
    // On affiche le résultat joliment formaté
    console.dir(resultat, { depth: null, colors: true });

  } catch (erreur) {
    console.error("❌ Erreur de connexion au serveur :", erreur.message);
  }
};

testNotreAPI();