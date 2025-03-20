const Scrap = require('../models/Scrap');

// Função para criar um scrap
const createScrap = async (req, res) => {
    const { content } = req.body;
    try {
        const scrap = new Scrap({
            content,
            user: req.user.userId, // Usuário autenticado
        });
        await scrap.save();
        res.status(201).json(scrap);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};

// Função para listar scraps
const getScraps = async (req, res) => {
    try {
        const scraps = await Scrap.find().populate('user', 'name');
        res.json(scraps);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};

module.exports = { createScrap, getScraps };
