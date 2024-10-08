const express = require('express');
const router = express.Router();
const { getEntradasUser, postEntradaUser } = require('../controllers/entradasController');

// Importar os modelos através de models/index.js
const { User, Almoxarifado, Entrada, Fornecedor, Item, EntradaItem } = require('../models');

/**
 * @route GET /pedidos/usuario/:id
 * @desc Lista todos os itens solicitados por um determinado usuário
 * @access Público (ajuste conforme necessário)
 */
router.get('/usuario/:id', getEntradasUser);
router.post('/', postEntradaUser);


module.exports = router;
