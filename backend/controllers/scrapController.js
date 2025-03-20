// backend/controllers/scrapController.js
const { db } = require('../firebaseAdmin');

// Criar scrap
const createScrap = async (req, res) => {
    const { content } = req.body;
    const userId = req.user.uid; // ID do usuário autenticado
    try {
        const scrap = {
            content,
            userId,
            createdAt: admin.firestore.Timestamp.now(),
        };
        const docRef = await db.collection('scraps').add(scrap);
        res.status(201).json({ id: docRef.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Listar scraps
const getScraps = async (req, res) => {
    try {
        const scrapsSnapshot = await db.collection('scraps').get();
        const scraps = [];
        scrapsSnapshot.forEach((doc) => {
            scraps.push({ id: doc.id, ...doc.data() });
        });
        res.json(scraps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createScrap, getScraps };
