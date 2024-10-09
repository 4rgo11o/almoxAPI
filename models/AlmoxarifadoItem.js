const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AlmoxarifadoItem = sequelize.define('AlmoxarifadoItem', {
  id_almoxarifado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'almoxarifados',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  id_item: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'items',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'almoxarifado_items',
  timestamps: true,
});

module.exports = AlmoxarifadoItem;