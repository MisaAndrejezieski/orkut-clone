// backend/controllers/authController.js
const { admin } = require('../firebaseAdmin');

// Registro de usuário
const register = async (req, res) => {
    const { email, password, name } = req.body; // Adicionar nome ao registro
    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });

        // Salvar dados do usuário no Firestore
        await admin.firestore().collection('users').doc(userRecord.uid).set({
            email,
            name,
            createdAt: admin.firestore.Timestamp.now(),
        });

        res.status(201).json({ uid: userRecord.uid });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao registrar usuário: ' + error.message });
    }
};

// Login de usuário
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        res.json({ uid: userRecord.uid });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { register, login };
