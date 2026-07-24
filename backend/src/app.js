const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); 
const sequelize = require('./config/database');
const platRoutes = require('./routes/platRoutes');
const commandeRoutes = require('./routes/commandeRoutes');
const { apiReference } = require('@scalar/express-api-reference');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json());
app.use('/api/plats', platRoutes);
app.use('/api/commandes', commandeRoutes);

try {
  const openapiPath = path.join(__dirname, 'docs', 'openapi.json');
  const openapiDoc = JSON.parse(fs.readFileSync(openapiPath, 'utf8'));
  app.use(
    '/reference',
    apiReference({
      spec: { content: openapiDoc },
    })
  );
} catch (e) {
  console.log("Scalar UI documentation error:", e.message);
}

sequelize.sync({ force: false }).then(() => {
  console.log('Connexion a PostgreSQL réussie !');
  app.listen(PORT, () => {
    console.log("Serveur backend en cours sur le port 3000");
  });
}).catch(err => {
  console.error('Erreur:', err.message);
});