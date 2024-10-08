const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db.js');
const User = require('./User');
const Fornecedor = require('./Fornecedor');

class Entrada extends Model {}

Entrada.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    allowNull: false,
  },
  id_fornecedor: {
    type: DataTypes.INTEGER,
    references: {
      model: 'fornecedores',
      key: 'id',
    },
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Entrada',
  tableName: 'entradas',
  timestamps: true,
});

// Associações
Entrada.belongsTo(User, { foreignKey: 'id_user' });
Entrada.belongsTo(Fornecedor, { foreignKey: 'id_fornecedor' });
User.hasMany(Entrada, { foreignKey: 'id_user' });
Fornecedor.hasMany(Entrada, { foreignKey: 'id_fornecedor' });

module.exports = Entrada;