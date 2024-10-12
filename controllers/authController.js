const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv/config.js');
const { User } = require('../models');

// Função para gerar o token JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Use uma chave secreta mais forte
};

// Registro de Usuário
const register = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ where: { name } });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe.' });
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo usuário
    const newUser = await User.create({ name, password: hashedPassword });

    // Gerar token JWT
    const token = generateToken(newUser);

    return res.status(201).json({ message: 'Usuário registrado com sucesso.', token });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
};

// Login de Usuário
const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Verificar se o usuário existe
    const user = await User.findOne({ where: { name } });
    if (!user) {
      return res.status(400).json({ message: 'Usuário ou senha incorretos.' });
    }

    // Verificar se a senha está correta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Usuário ou senha incorretos.' });
    }

    // Gerar token JWT
    const token = generateToken(user);

    return res.status(200).json({ message: 'Login bem-sucedido.', token });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao fazer login.' });
  }
};

module.exports = { register, login };
