const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Almoxarifado extends Model {}

Almoxarifado.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Almoxarifado',
  tableName: 'almoxarifados',
  timestamps: false,
});

module.exports = Almoxarifado;