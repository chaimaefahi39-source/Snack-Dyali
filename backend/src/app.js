const express = require('express');
const sequelize = require('./config/database');
const platRoutes = require('./routes/platRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/plats', platRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log('Connexion a PostgreSQL réussie !');
  app.listen(PORT, () => {
    console.log("Serveur en cours d'execution sur le port 3000");
  });
});