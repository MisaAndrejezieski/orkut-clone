const express = require('express');
const authRoutes = require('./routes/authRoutes');
const scrapRoutes = require('./routes/scrapRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const communityRoutes = require('./routes/communityRoutes');
const friendRoutes = require('./routes/friendRoutes');
const path = require('path');
const { admin } = require('./firebaseAdmin');

const app = express();

// Middlewares
app.use(express.json());

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../fontend')));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/scraps', scrapRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/friends', friendRoutes);

// Criar usuário administrador automaticamente
const createAdminUser = async () => {
    try {
        const uid = 'XZqtcAuAilVuxkfcmTLo3YxPzo53';
        const email = 'misamisa@example.com';
        const password = '#Sonho1313';
        const name = 'Administrador';

        const userRecord = await admin.auth().getUser(uid).catch(() => null);

        if (!userRecord) {
            const newUser = await admin.auth().createUser({ uid, email, password });
            await admin.firestore().collection('users').doc(newUser.uid).set({
                email,
                name,
                role: 'admin',
                createdAt: admin.firestore.Timestamp.now(),
            });
            console.log('Usuário administrador criado com sucesso!');
        } else {
            console.log('Usuário administrador já existe.');
        }
    } catch (error) {
        console.error('Erro ao criar usuário administrador:', error.message);
    }
};

createAdminUser().catch((error) => {
    console.error('Erro ao inicializar o administrador:', error.message);
});

// Inicia o servidor
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}. Acesse http://localhost:${PORT}`))
    .on('error', (err) => {
        console.error('Erro ao iniciar o servidor:', err.message);
    });
