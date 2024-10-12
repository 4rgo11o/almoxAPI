const jwt = require('jsonwebtoken');
const dotenv = require('dotenv/config.js');

// Middleware para verificar o token JWT
const authenticateToken = (req, res, next) => {
  // Captura o token do header Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado: Token não fornecido.' });
  }

  // Verifica se o token é válido
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Acesso negado: Token inválido.' });
    }

    req.user = user;  // Salva o usuário no request para usar nas rotas protegidas
    next();  // Continua a execução
  });
};

module.exports = authenticateToken;
