const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const scrapRoutes = require('./routes/scrapRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const communityRoutes = require('./routes/communityRoutes');
const friendRoutes = require('./routes/friendRoutes');
const messageRoutes = require('./routes/messageRoutes');
const connectDB = require('./config/db');

// Carrega as variáveis de ambiente
dotenv.config();

// Conecta ao MongoDB
connectDB();

// Cria uma instância do Express
const app = express();

// Middlewares
app.use(helmet()); // Protege cabeçalhos HTTP
app.use(express.json()); // Habilita o uso de JSON no corpo das requisições

// Limita o número de requisições por IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 requisições por IP
});
app.use(limiter);

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/scraps', scrapRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/messages', messageRoutes);

// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erro no servidor.' });
});

// Exporta o app para uso nos testes
module.exports = app;

// Inicia o servidor apenas se o arquivo for executado diretamente
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}
