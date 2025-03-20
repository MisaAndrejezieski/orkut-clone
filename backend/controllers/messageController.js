const Message = require('../models/Message');

// Enviar mensagem
const sendMessage = async (req, res) => {
    const { receiverId, content } = req.body;
    try {
        const message = new Message({
            sender: req.user.userId, // Usuário autenticado (remetente)
            receiver: receiverId, // Destinatário
            content,
        });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};

// Listar mensagens recebidas
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ receiver: req.user.userId })
            .populate('sender', 'name');
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};

module.exports = { sendMessage, getMessages };
