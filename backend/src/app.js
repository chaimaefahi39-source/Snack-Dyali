const express = require('express');
const sequelize = require('./config/database');
const platRoutes = require('./routes/platRoutes');
const commandeRoutes = require('./routes/commandeRoutes'); 
const { Plat, Commande } = require('./models/index'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/plats', platRoutes);
app.use('/api/commandes', commandeRoutes); 

sequelize.sync({ force: false }).then(() => {
  console.log('Connexion a PostgreSQL réussie & Relations synchronisées !');
  app.listen(PORT, () => {
    console.log("Serveur en cours d'execution sur le port 3000");
  });
}).catch(err => {
  console.error('Erreur de synchronisation:', err.message);
});