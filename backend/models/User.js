// Importa o Mongoose para definir o esquema do modelo
const mongoose = require('mongoose');

// Define o esquema do usuário
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nome do usuário (obrigatório)
    email: { type: String, required: true, unique: true }, // E-mail do usuário (obrigatório e único)
    password: { type: String, required: true }, // Senha do usuário (obrigatória)
    scraps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scrap' }], // Lista de scraps do usuário
    testimonials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Testimonial' }], // Lista de depoimentos do usuário
    communities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }], // Lista de comunidades do usuário
});

// Exporta o modelo de usuário para ser usado em outras partes do código
module.exports = mongoose.model('User', userSchema);
