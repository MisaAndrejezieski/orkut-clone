const express = require('express');
const { addFriend, getFriends } = require('../controllers/friendController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Rota para adicionar amigo
router.post('/', authMiddleware, addFriend);

// Rota para listar amigos
router.get('/', authMiddleware, getFriends);

module.exports = router;
