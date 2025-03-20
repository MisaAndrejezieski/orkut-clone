// backend/routes/adminRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Rota protegida para administradores
router.get('/admin', authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: 'Bem-vindo, administrador!' });
});

module.exports = router;
