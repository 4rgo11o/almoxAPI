const { Sequelize } = require('sequelize');
const dotenv = require('dotenv/config.js') ;

// Criar uma nova instância do Sequelize com as configurações do PostgreSQL
const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  dialect: 'postgres',
  port: process.env.PG_PORT,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao PostgreSQL!');
  } catch (error) {
    console.error('Erro ao conectar:', error);
    process.exit(1);
  }
};

// Exportar tanto a função de conectar quanto a instância do sequelize
module.exports = { connectDB, sequelize };
