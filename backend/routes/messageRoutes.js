const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Rota para enviar mensagem
router.post('/', authMiddleware, sendMessage);

// Rota para listar mensagens recebidas
router.get('/', authMiddleware, getMessages);

module.exports = router;
