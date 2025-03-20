// Importa o Express para criar as rotas
const express = require('express');

// Importa as funções de registro e login do controlador de autenticação
const { register, login } = require('../controllers/authController');

// Cria um roteador do Express
const router = express.Router();

// Define a rota POST /api/auth/register para registrar um novo usuário
router.post('/register', register);

// Define a rota POST /api/auth/login para fazer login de um usuário
router.post('/login', login);

// Exporta o roteador para ser usado no servidor principal
module.exports = router;
