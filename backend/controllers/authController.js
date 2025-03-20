// backend/controllers/authController.js
const { admin } = require('../firebaseAdmin');

// Registro de usuário
const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });
        res.status(201).json({ uid: userRecord.uid });
    } catch (error) {
        res.status(400).json({ message: error.message });
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
