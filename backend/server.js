const express = require('express');
const authRoutes = require('./routes/authRoutes');
const scrapRoutes = require('./routes/scrapRoutes');

const app = express();

// Middlewares
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/scraps', scrapRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
