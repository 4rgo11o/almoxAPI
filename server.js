const express = require('express');
const dotenv = require('dotenv/config.js');
const entradasRouter = require('./routes/entradasRouter');
const authRouter = require('./routes/authRouter');
const authMiddleware = require('./middleware/authMiddleware');
const { connectDB } = require('./config/db');


connectDB();

const app = express();


app.use(express.json());

app.use('/api/entradas', authMiddleware, entradasRouter);
app.use('/api/auth', authRouter);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
