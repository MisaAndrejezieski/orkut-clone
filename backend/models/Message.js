const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Remetente
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Destinatário
    content: { type: String, required: true }, // Conteúdo da mensagem
    createdAt: { type: Date, default: Date.now }, // Data de criação
});

module.exports = mongoose.model('Message', messageSchema);
