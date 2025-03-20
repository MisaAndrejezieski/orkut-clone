const express = require('express');
const { createCommunity, getCommunities } = require('../controllers/communityController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Rota para criar uma comunidade
router.post('/', authMiddleware, createCommunity);

// Rota para listar comunidades
router.get('/', authMiddleware, getCommunities);

module.exports = router;
