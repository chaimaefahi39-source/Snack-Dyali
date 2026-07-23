const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Commande = sequelize.define('Commande', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  statut: {
    type: DataTypes.ENUM('En attente', 'En préparation', 'Livré', 'Annulé'),
    defaultValue: 'En attente',
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  }
}, {
  tableName: 'commandes',
  underscored: true
});

module.exports = Commande;