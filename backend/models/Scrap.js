// Importa o Mongoose para definir o esquema do modelo
const mongoose = require('mongoose');

// Define o esquema do scrap
const scrapSchema = new mongoose.Schema({
    content: { type: String, required: true }, // Conteúdo do scrap (obrigatório)
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Usuário que criou o scrap (obrigatório)
    createdAt: { type: Date, default: Date.now }, // Data de criação do scrap (automática)
});

// Exporta o modelo de scrap para ser usado em outras partes do código
module.exports = mongoose.model('Scrap', scrapSchema);
