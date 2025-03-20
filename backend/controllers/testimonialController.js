const Testimonial = require('../models/Testimonial');

// Criar depoimento
const createTestimonial = async (req, res) => {
    const { content, userId } = req.body; // userId é o usuário que recebe o depoimento
    try {
        const testimonial = new Testimonial({
            content,
            user: userId,
            author: req.user.userId, // Usuário autenticado (quem escreveu o depoimento)
        });
        await testimonial.save();
        res.status(201).json(testimonial);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};

// Listar depoimentos de um usuário
const getTestimonials = async (req, res) => {
    const { userId } = req.params;
    try {
        const testimonials = await Testimonial.find({ user: userId }).populate('author', 'name');
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};

module.exports = { createTestimonial, getTestimonials };
