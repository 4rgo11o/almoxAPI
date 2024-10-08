// models/index.js
const User = require('./User');
const Almoxarifado = require('./Almoxarifado');
const Fornecedor = require('./Fornecedor');
const Entrada = require('./Entrada');
const Item = require('./Item');
const EntradaItem = require('./EntradaItem');
const { sequelize } = require('../config/db');

// Definir Associações

// Usuário e Almoxarifado
User.belongsTo(Almoxarifado, { foreignKey: 'almoxarifado_id' });
Almoxarifado.hasMany(User, { foreignKey: 'almoxarifado_id' });

// Entrada e Usuário / Fornecedor
Entrada.belongsTo(User, { foreignKey: 'id_user' });
Entrada.belongsTo(Fornecedor, { foreignKey: 'id_fornecedor' });
User.hasMany(Entrada, { foreignKey: 'id_user' });
Fornecedor.hasMany(Entrada, { foreignKey: 'id_fornecedor' });

// Entrada e Item (N:M através de PedidoItem)
Entrada.belongsToMany(Item, { through: EntradaItem, foreignKey: 'id_entrada', otherKey: 'id_item' });
Item.belongsToMany(Entrada, { through: EntradaItem, foreignKey: 'id_item', otherKey: 'id_entrada' });

module.exports = {
  sequelize,
  User,
  Almoxarifado,
  Fornecedor,
  Entrada,
  Item,
  EntradaItem,
};
