const express = require('express');
const { getItemsByAlmoxarifado } = require('../controllers/almoxController');
const authenticateToken = require('../middleware/authMiddleware'); // Middleware de autenticação

const router = express.Router();

// Rota protegida para listar itens de um almoxarifado específico
router.get('/almoxarifado/:id/items', authenticateToken, getItemsByAlmoxarifado);

module.exports = router;
