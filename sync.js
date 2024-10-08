const { sequelize } = require('./config/db');
const User = require('./models/User');
const Almoxarifado = require('./models/Almoxarifado');
const Fornecedor = require('./models/Fornecedor');
const Entrada = require('./models/Entrada');
const Item = require('./models/Item');
const EntradaItem = require('./models/EntradaItem');

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    await sequelize.sync({ alter: true }); // Use { force: true } para recriar as tabelas
    console.log('Modelos sincronizados com o banco de dados.');
  } catch (error) {
    console.error('Erro ao conectar ou sincronizar com o banco de dados:', error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();