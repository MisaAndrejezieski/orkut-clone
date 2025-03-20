const Community = require('../models/Community');

// Criar comunidade
const createCommunity = async (req, res) => {
    const { name, description } = req.body;
    try {
        const community = new Community({
            name,
            description,
            createdBy: req.user.userId, // Usuário autenticado (criador da comunidade)
            members: [req.user.userId], // Adiciona o criador como membro
        });
        await community.save();
        res.status(201).json(community);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};

// Listar comunidades
const getCommunities = async (req, res) => {
    try {
        const communities = await Community.find().populate('createdBy', 'name');
        res.json(communities);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};

module.exports = { createCommunity, getCommunities };
