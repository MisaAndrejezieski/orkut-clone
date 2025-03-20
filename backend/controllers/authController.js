// Importa o bcryptjs para criptografar senhas
const bcrypt = require('bcryptjs');

// Importa o jsonwebtoken para gerar tokens JWT
const jwt = require('jsonwebtoken');

// Importa o modelo de usuário
const User = require('../models/User');

// Função para registrar um novo usuário
const register = async (req, res) => {
    const { name, email, password } = req.body; // Extrai os dados do corpo da requisição

    try {
        // Verifica se o usuário já existe no banco de dados
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Usuário já existe.' });
        }

        // Cria um novo usuário
        user = new User({ name, email, password });

        // Gera um salt para criptografar a senha
        const salt = await bcrypt.genSalt(10);

        // Criptografa a senha usando o salt
        user.password = await bcrypt.hash(password, salt);

        // Salva o usuário no banco de dados
        await user.save();

        // Cria um payload para o token JWT
        const payload = { userId: user.id };

        // Gera um token JWT com o payload e uma chave secreta
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Retorna o token como resposta
        res.status(201).json({ token });
    } catch (error) {
        // Retorna um erro caso algo dê errado
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};

// Função para fazer login de um usuário
const login = async (req, res) => {
    const { email, password } = req.body; // Extrai os dados do corpo da requisição

    try {
        // Busca o usuário no banco de dados pelo e-mail
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciais inválidas.' });
        }

        // Compara a senha fornecida com a senha criptografada no banco de dados
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciais inválidas.' });
        }

        // Cria um payload para o token JWT
        const payload = { userId: user.id };

        // Gera um token JWT com o payload e uma chave secreta
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Retorna o token como resposta
        res.json({ token });
    } catch (error) {
        // Retorna um erro caso algo dê errado
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};

// Exporta as funções de registro e login
module.exports = { register, login };
