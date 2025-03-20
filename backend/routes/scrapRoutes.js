const express = require('express');
const { body, validationResult } = require('express-validator'); // Importa o express-validator
const { createScrap } = require('../controllers/scrapController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Rota para criar scrap com validação
router.post(
    '/',
    authMiddleware, // Middleware de autenticação
    [
        // Validação do campo "content"
        body('content').notEmpty().withMessage('Conteúdo é obrigatório'),
    ],
    (req, res) => {
        // Verifica se há erros de validação
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Se não houver erros, chama o controlador de criar scrap
        createScrap(req, res);
    }
);

module.exports = router;
