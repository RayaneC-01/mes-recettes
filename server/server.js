// 1. Importation des dépendances
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');

// 2. Initialisation de l'application Express
const app = express();

// 3. Middlewares de base
// Autorise le Frontend (React) à appeler l'API
app.use(cors());
// Permet à Express de lire le format JSON dans les requêtes
app.use(express.json());

// 4. Définition des routes
app.use('/api/auth', authRoutes);


// 4. Connexion à MongoDB via Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connexion à MongoDB réussie !'))
  .catch((err) => console.error('❌ Erreur de connexion à MongoDB :', err));

// 5. Une petite route de test pour vérifier que tout fonctionne
app.get('/', (req, res) => {
  res.send('Le serveur de MesRecettes tourne nickel !');
});

// 6. Lancement du serveur Express sur le port configuré
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur : http://localhost:${PORT}`);
});