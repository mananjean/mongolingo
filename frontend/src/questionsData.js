// frontend/src/questionsData.js

export const questionsMCU = [
  // --- NIVEAU : FACILE (Requêtes de base : find, match simple) ---
  {
    id: 1,
    level: "Facile",
    instruction: "Affiche tous les films de la base de données.",
    explanation: "La méthode find() sans arguments renvoie tous les documents d'une collection.",
    blocks: ["db.", "movies.", "find()"]
  },
  {
    id: 2,
    level: "Facile",
    instruction: "Trouve tous les films sortis après 2015 (strictement supérieur).",
    explanation: "L'opérateur $gt (greater than) permet de filtrer les valeurs strictement supérieures à un nombre donné.",
    blocks: ["db.", "movies.", "find(", "{ release_year: { $gt: 2015 } }", ")"]
  },
  {
    id: 3,
    level: "Facile",
    instruction: "Trouve le film dont le titre exact est \"The Avengers\".",
    explanation: "MongoDB comprend les types de données. Pour chercher un nombre entier, on passe la valeur directement sans guillemets.",
    blocks: ["db.", "movies.", "find(", "{ title: \"The Avengers\" }", ")"]
  },
  {
    id: 4,
    level: "Facile",
    instruction: "Trouve le personnage dont le nom de héros est \"Iron Man\"",
    explanation: "La recherche sur une chaîne de caractères nécessite une correspondance exacte, respectant les majuscules et les minuscules.",
    blocks: ["db.", "characters.", "find(", "{ hero_name: \"Iron Man\" }", ")"]
  },
  {
    id: 5,
    level: "Facile",
    instruction: "Trouve tous les personnages qui sont de l'espèce \"Human\".",
    explanation: "On applique un filtre simple sur le champ décrivant l'espèce du personnage.",
    blocks: ["db.", "characters.", "find(", "{ species: \"Human\" }", ")"]
  },
  {
    id: 6,
    level: "Facile",
    instruction: "Trouve les films ayant généré moins de 1000 millions au box-office ($lt).",
    explanation: "L'opérateur $lt (less than) permet de filtrer les valeurs strictement inférieures à un nombre donné.",
    blocks: ["db.", "movies.", "find(", "{ box_office_millions: { $lt: 1000 } }", ")"]
  },
  {
    id: 7,
    level: "Facile",
    instruction: "Trouve les personnages qui ne sont plus en activité (is_active: false).",
    explanation: "Pour chercher un booléen, on utilise la valeur true ou false sans guillemets.",
    blocks: ["db.", "characters.", "find(", "{ is_active: false }", ")"]
  },
  {
    id: 8,
    level: "Facile",
    instruction: "Trouve le personnage dont le vrai nom est \"Peter Parker\".",
    explanation: "Une simple requête find() sur le champ contenant le vrai nom du héros.",
    blocks: ["db.", "characters.", "find(", "{ real_name: \"Peter Parker\" }", ")"]
  },
  {
    id: 9,
    level: "Facile",
    instruction: "Trouve tous les films qui appartiennent à la Phase 1 du MCU.",
    explanation: "MongoDB comprend les types de données. Pour chercher un nombre entier, on passe la valeur directement sans guillemets.",
    blocks: ["db.", "movies.", "find(", "{ phase: 1 }", ")"]
  },
  {
    id: 10,
    level: "Facile",
    instruction: "Compte le nombre total de films présents dans la base",
    explanation: "Au lieu de find(), on utilise la méthode countDocuments() qui retourne directement le nombre entier de documents correspondant au filtre.",
    blocks: ["db.", "movies.", "countDocuments()"]
  },

  // --- NIVEAU : MOYEN (Tableaux, objets imbriqués, opérateurs logiques) ---
  {
    id: 11,
    level: "Moyen",
    instruction: "Trouve les personnages qui ont une intelligence supérieure ou égale à 80.",
    explanation: "Pour accéder à un champ à l'intérieur d'un objet (sous-document), on utilise la notation pointée entre guillemets (ex: \"stats.intelligence\"), couplée à l'opérateur $gte (greater than or equal)."
  },
  {
    id: 12,
    level: "Moyen",
    instruction: "Trouve les films où 'Thanos' apparaît parmi les méchants (villains).",
    explanation: "Dans MongoDB, chercher une simple valeur texte dans un champ de type tableau vérifiera automatiquement si cette valeur est présente dans la liste."
  },
  {
    id: 13,
    level: "Moyen",
    instruction: "Trouve les films qui comportent exactement 2 méchants ($size).",
    explanation: "L'opérateur $size permet de trouver les documents dont un tableau a une longueur exacte spécifiée."
  },
  {
    id: 14,
    level: "Moyen",
    instruction: "Trouve les personnages qui sont de l'espèce \"Human\" OU qui sont inactifs ($or)",
    explanation: "L'opérateur logique $or prend un tableau de conditions et retourne les documents qui valident au moins l'une d'entre elles."
  },
  {
    id: 15,
    level: "Moyen",
    instruction: "Trouve les personnages qui sont affiliés à la fois aux \"Avengers\" ET au \"S.H.I.E.L.D.\" ($all).",
    explanation: "L'opérateur $all est parfait pour les tableaux : il s'assure que tous les éléments que l'on précise sont bien présents dans le tableau du document."
  },
  {
    id: 16,
    level: "Moyen",
    instruction: "Trouve les films réalisés soit par \"Jon Favreau\", soit par \"Joss Whedon\" ($in).",
    explanation: "L'opérateur $in vérifie si la valeur d'un champ correspond à au moins l'une des valeurs spécifiées dans notre liste de recherche."
  },
  {
    id: 17,
    level: "Moyen",
    instruction: "Trouve les personnages dont le nom de héros commence par le mot \"Black\" (utiliser une expression régulière $regex).",
    explanation: "L'opérateur $regex permet d'utiliser des expressions régulières, comme ^Black pour chercher les chaînes qui commencent par ce mot."
  },
  {
    id: 18,
    level: "Moyen",
    instruction: "Trouve les personnages ayant une intelligence parfaite de 100 et une force supérieure à 50.",
    explanation: "Par défaut, si l'on met plusieurs champs séparés par des virgules dans un find(), MongoDB applique un opérateur $and implicite."
  },
  {
    id: 19,
    level: "Moyen",
    instruction: "Affiche tous les films, mais ne retourne UNIQUEMENT que leur titre et leur année de sortie (utiliser les projections).",
    explanation: "Le deuxième argument de find() gère la \"projection\". On met 1 pour inclure un champ, et 0 pour masquer le _id (qui s'affiche par défaut)."
  },
  {
    id: 20,
    level: "Moyen",
    instruction: "Trouve les films qui ne font PAS partie de la Phase 1 ($ne).",
    explanation: "L'opérateur $ne (not equal) permet d'exclure les documents qui possèdent une valeur spécifique."
  },

  // --- NIVEAU : DIFFICILE (Agrégations, tris, limites, jointures) ---
  {
    id: 21,
    level: "Difficile",
    instruction: "Affiche les 3 personnages les plus intelligents, triés par ordre décroissant.",
    explanation: "Il faut chaîner les méthodes de curseur : .sort() avec -1 pour un tri décroissant, suivi de .limit(3) pour ne garder que les trois premiers résultats."
  },
  {
    id: 22,
    level: "Difficile",
    instruction: "Trouve les personnages dont la force est strictement supérieure à leur propre intelligence (utiliser l'opérateur $expr pour comparer deux champs d'un même document).",
    explanation: "L'opérateur $expr permet de comparer la valeur de deux champs au sein d'un même document (ici $gt: [\"$stats.strength\", \"$stats.intelligence\"])."
  },
  {
    id: 23,
    level: "Difficile",
    instruction: "Calcule le box-office total généré par l'ensemble des films de la base (aggregate, $group, $sum).",
    explanation: "Dans un aggregate, l'étape $group avec _id: null rassemble tous les documents en un seul groupe. On utilise ensuite l'opérateur $sum pour additionner les montants."
  },
  {
    id: 24,
    level: "Difficile",
    instruction: "Calcule la moyenne d'intelligence des personnages, en les regroupant par espèce (aggregate, $group, $avg).",
    explanation: "Dans l'étape $group, on définit _id: \"$species\" pour regrouper les personnages par espèce, puis on utilise l'opérateur $avg pour calculer la moyenne."
  },
  {
    id: 25,
    level: "Difficile",
    instruction: "Trouve le film le plus rentable (box-office) de la Phase 3 uniquement ($match, $sort, $limit).",
    explanation: "Le pipeline commence par un $match pour filtrer la phase, suivi d'un $sort sur les recettes, et se termine par un $limit pour obtenir le gagnant."
  },
  {
    id: 26,
    level: "Difficile",
    instruction: "Compte combien de membres possède chaque affiliation d'équipe (utiliser $unwind sur le tableau affiliations, puis $group).",
    explanation: "L'étape $unwind \"déroule\" un tableau en créant un document séparé pour chaque élément du tableau. Ensuite, on utilise $group pour les compter avec $sum: 1."
  },
  {
    id: 27,
    level: "Difficile",
    instruction: "Jointure simple : Affiche la liste des personnages en y incluant toutes les informations de leur film d'apparition (utiliser $lookup sur debut_movie_id).",
    explanation: "L'étape $lookup permet de faire une jointure avec une autre collection. Il faut spécifier from (la collection cible), localField, foreignField, et as (le nom du tableau résultant)."
  },
  {
    id: 28,
    level: "Difficile",
    instruction: "Trouve les réalisateurs dont les films ont cumulé plus de 2000 millions au box-office total (un $group suivi d'un $match).",
    explanation: "On utilise un $group par réalisateur avec un $sum pour cumuler le box-office, puis on ajoute une étape $match après le groupe pour filtrer les résultats cumulés."
  },
  {
    id: 29,
    level: "Difficile",
    instruction: "Affiche le nom de chaque méchant individuellement et compte dans combien de films il apparaît ($unwind sur villains, puis $group).",
    explanation: "On commence par un $unwind sur le tableau des méchants pour isoler chaque apparition, puis un $group par le nom du méchant en incrémentant un compteur."
  },
  {
    id: 30,
    level: "Difficile",
    instruction: "Requête Ultime : Trouve les personnages qui ont été introduits dans un film sorti avant 2015 (nécessite un $lookup pour joindre le film, puis un $match sur l'année du film joint).",
    explanation: "C'est un pipeline complet : on part des personnages, on utilise $lookup pour joindre les détails du film, et on termine par un $match utilisant la notation pointée (ex: \"nom_tableau_joint.release_year\") pour filtrer sur l'année."
  }
];