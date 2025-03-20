// backend/routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Rota de registro
router.post('/register', register);

// Rota de login
router.post('/login', login);

module.exports = router;
