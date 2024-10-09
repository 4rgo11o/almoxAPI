const User = require('./User');
const Almoxarifado = require('./Almoxarifado');
const Fornecedor = require('./Fornecedor');
const Entrada = require('./Entrada');
const Item = require('./Item');
const EntradaItem = require('./EntradaItem');
const AlmoxarifadoItem = require('./AlmoxarifadoItem'); // Novo modelo
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

// Entrada e Item (N:M através de EntradaItem)
Entrada.belongsToMany(Item, { through: EntradaItem, foreignKey: 'id_entrada', otherKey: 'id_item' });
Item.belongsToMany(Entrada, { through: EntradaItem, foreignKey: 'id_item', otherKey: 'id_entrada' });

// Relacionamento N:M entre Almoxarifado e Item através de AlmoxarifadoItem
Almoxarifado.belongsToMany(Item, { through: AlmoxarifadoItem, foreignKey: 'id_almoxarifado', otherKey: 'id_item' });
Item.belongsToMany(Almoxarifado, { through: AlmoxarifadoItem, foreignKey: 'id_item', otherKey: 'id_almoxarifado' });

module.exports = {
  sequelize,
  User,
  Almoxarifado,
  Fornecedor,
  Entrada,
  Item,
  EntradaItem,
  AlmoxarifadoItem, // Exportar o novo modelo
};