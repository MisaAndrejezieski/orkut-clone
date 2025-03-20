const Friend = require('../models/Friend');
const User = require('../models/User');

// Adicionar amigo
const addFriend = async (req, res) => {
    const { friendId } = req.body;
    try {
        const friend = new Friend({
            user: req.user.userId, // Usuário autenticado
            friend: friendId, // Amigo a ser adicionado
        });
        await friend.save();
        res.status(201).json(friend);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};

// Listar amigos
const getFriends = async (req, res) => {
    try {
        const friends = await Friend.find({ user: req.user.userId, status: 'accepted' })
            .populate('friend', 'name');
        res.json(friends);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};

module.exports = { addFriend, getFriends };
