const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    content: { type: String, required: true }, // Conteúdo do depoimento
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Usuário que recebe o depoimento
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Usuário que escreveu o depoimento
    createdAt: { type: Date, default: Date.now }, // Data de criação
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
