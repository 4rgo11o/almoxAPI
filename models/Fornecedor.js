const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Fornecedor extends Model {}

Fornecedor.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnpj: {
    type: DataTypes.STRING,
  },
  contato: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Fornecedor',
  tableName: 'fornecedores',
  timestamps: false,
});

module.exports = Fornecedor;