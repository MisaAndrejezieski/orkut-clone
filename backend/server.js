// Importa o framework Express para criar o servidor
const express = require('express');

// Importa o CORS para permitir requisições de diferentes origens (útil para o frontend)
const cors = require('cors');

// Importa o dotenv para gerenciar variáveis de ambiente (como a conexão com o banco de dados)
const dotenv = require('dotenv');

// Importa a função connectDB para conectar ao banco de dados MongoDB
const connectDB = require('./config/db');

// Importa as rotas de autenticação
const authRoutes = require('./routes/authRoutes');

// Importa as rotas de scraps
const scrapRoutes = require('./routes/scrapRoutes');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Conecta ao banco de dados MongoDB
connectDB();

// Cria uma instância do Express
const app = express();

// Habilita o CORS para permitir requisições do frontend
app.use(cors());

// Habilita o uso de JSON no corpo das requisições
app.use(express.json());

// Define as rotas de autenticação (registro e login)
app.use('/api/auth', authRoutes);

// Define as rotas de scraps (criar e listar scraps)
app.use('/api/scraps', scrapRoutes);

// Define a porta do servidor (usando a variável de ambiente PORT ou a porta 5000 como fallback)
const PORT = process.env.PORT || 5000;

// Inicia o servidor e escuta na porta definida
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const testimonialRoutes = require('./routes/testimonialRoutes');
app.use('/api/testimonials', testimonialRoutes);
