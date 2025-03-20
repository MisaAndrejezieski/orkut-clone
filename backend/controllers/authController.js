// backend/controllers/authController.js
const { admin } = require('../firebaseAdmin');

// Registro de usuário
const register = async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    try {
        // Verifica se o e-mail já está registrado
        const existingUser = await admin.auth().getUserByEmail(email).catch(() => null);
        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já está em uso.' });
        }

        // Cria o usuário no Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });

        // Salvar dados do usuário no Firestore
        await admin.firestore().collection('users').doc(userRecord.uid).set({
            email,
            name,
            role: 'user', // Define o papel padrão como "user"
            createdAt: admin.firestore.Timestamp.now(),
        });

        res.status(201).json({ uid: userRecord.uid, message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error.message);
        res.status(500).json({ message: 'Erro ao registrar usuário. Tente novamente mais tarde.' });
    }
};

// Login de usuário
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
    }
    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        res.json({ uid: userRecord.uid, email: userRecord.email });
    } catch (error) {
        console.error('Erro ao fazer login:', error.message);
        res.status(400).json({ message: 'Credenciais inválidas ou usuário não encontrado.' });
    }
};

module.exports = { register, login };
