const express = require('express');
const sequelize = require('./config/database');
const Plat = require('./models/plat'); 

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

sequelize.sync({ force: false })
  .then(() => {
    console.log('Connexion à PostgreSQL (Docker) réussie !');
    console.log('Le tableau "plats" a été synchronisé avec succès.');
    app.listen(PORT, () => {
      console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Impossible de se connecter à Docker PostgreSQL :', err.message);
  });