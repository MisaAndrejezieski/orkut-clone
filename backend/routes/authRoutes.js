const express = require('express');
const { body, validationResult } = require('express-validator'); // Importa o express-validator
const { register, login } = require('../controllers/authController'); // Importa os controladores

const router = express.Router();

// Rota de registro com validação
router.post(
    '/register',
    [
        // Validação do campo "name"
        body('name').notEmpty().withMessage('Nome é obrigatório'),

        // Validação do campo "email"
        body('email').isEmail().withMessage('E-mail inválido'),

        // Validação do campo "password"
        body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
    ],
    (req, res) => {
        // Verifica se há erros de validação
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Se não houver erros, chama o controlador de registro
        register(req, res);
    }
);

// Rota de login com validação
router.post(
    '/login',
    [
        // Validação do campo "email"
        body('email').isEmail().withMessage('E-mail inválido'),

        // Validação do campo "password"
        body('password').notEmpty().withMessage('Senha é obrigatória'),
    ],
    (req, res) => {
        // Verifica se há erros de validação
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Se não houver erros, chama o controlador de login
        login(req, res);
    }
);

module.exports = router;

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Erro de validação
 */
router.post('/register', register);
