const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db.js');

class Item extends Model {}

Item.init({
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
  modelName: 'Item',
  tableName: 'itens',
  timestamps: false,
});

module.exports = Item;
