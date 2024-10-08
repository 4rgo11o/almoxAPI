const {  DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');
const Entrada = require('./Entrada');
const Item = require('./Item');

class EntradaItem extends Model {}

EntradaItem.init({
  id_entrada: {
    type: DataTypes.INTEGER,
    references: {
      model: 'entradas',
      key: 'id',
    },
    primaryKey: true,
  },
  id_item: {
    type: DataTypes.INTEGER,
    references: {
      model: 'itens',
      key: 'id',
    },
    primaryKey: true,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
}, {
  sequelize,
  modelName: 'EntradaItem',
  tableName: 'entrada_itens',
  timestamps: false,
});


module.exports = EntradaItem;