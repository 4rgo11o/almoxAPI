const express = require('express');
const dotenv = require('dotenv/config.js');
const entradasRoutes = require('./routes/entradasRoutes');
const authRoutes = require('./routes/authRoutes');
const almoxRoutes = require('./routes/almoxRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const { connectDB } = require('./config/db');


connectDB();

const app = express();


app.use(express.json());

app.use('/api/entradas', authMiddleware, entradasRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', almoxRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
