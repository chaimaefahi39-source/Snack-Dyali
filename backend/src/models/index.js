const Plat = require('./plat');
const Commande = require('./commande');

Commande.belongsToMany(Plat, { 
  through: 'commande_plats', 
  foreignKey: 'commande_id', 
  otherKey: 'plat_id',
  as: 'plats' 
});
Plat.belongsToMany(Commande, { 
  through: 'commande_plats', 
  foreignKey: 'plat_id', 
  otherKey: 'commande_id',
  as: 'commandes' 
});
module.exports = {
  Plat,
  Commande
};