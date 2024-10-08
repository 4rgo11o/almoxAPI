const express = require('express');
const dotenv = require('dotenv');
const entradasRouter = require('./routes/entradasRouter');
const { connectDB } = require('./config/db');

dotenv.config();
connectDB();

const app = express();


app.use(express.json());

app.use('/api/entradas', entradasRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
