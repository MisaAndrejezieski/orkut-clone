const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nome da comunidade
    description: { type: String }, // Descrição da comunidade
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Criador da comunidade
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Membros da comunidade
    createdAt: { type: Date, default: Date.now }, // Data de criação
});

module.exports = mongoose.model('Community', communitySchema);
