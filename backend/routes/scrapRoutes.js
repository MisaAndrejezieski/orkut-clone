// backend/routes/scrapRoutes.js
const express = require('express');
const { createScrap, getScraps } = require('../controllers/scrapController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Rota para criar scrap
router.post('/', authMiddleware, createScrap);

// Rota para listar scraps
router.get('/', getScraps);

module.exports = router;
