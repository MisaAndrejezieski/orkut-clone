const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Usuário principal
    friend: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Amigo
    status: { type: String, enum: ['pending', 'accepted'], default: 'pending' }, // Status da amizade
    createdAt: { type: Date, default: Date.now }, // Data de criação
});

module.exports = mongoose.model('Friend', friendSchema);
