const express = require('express');
const { createTestimonial, getTestimonials } = require('../controllers/testimonialController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Rota para criar um depoimento
router.post('/', authMiddleware, createTestimonial);

// Rota para listar depoimentos de um usuário
router.get('/:userId', authMiddleware, getTestimonials);

module.exports = router;
