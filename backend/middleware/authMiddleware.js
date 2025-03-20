// Importa o jsonwebtoken para verificar tokens JWT
const jwt = require('jsonwebtoken');

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
    // Obtém o token do cabeçalho da requisição e remove a palavra "Bearer"
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Verifica se o token foi fornecido
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        // Verifica se o token é válido e decodifica o payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Adiciona o payload decodificado ao objeto de requisição (req)
        req.user = decoded;

        // Passa para o próximo middleware ou rota
        next();
    } catch (error) {
        // Retorna um erro caso o token seja inválido
        res.status(400).json({ message: 'Token inválido.' });
    }
};

// Exporta o middleware para ser usado nas rotas
module.exports = authMiddleware;
