const express = require('express');
const authRoutes = require('./routes/authRoutes');
const scrapRoutes = require('./routes/scrapRoutes');
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

const testimonialRoutes = require('./routes/testimonialRoutes');
const communityRoutes = require('./routes/communityRoutes');
const friendRoutes = require('./routes/friendRoutes');

// Rotas adicionais
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/friends', friendRoutes);

// Criar usuário administrador automaticamente
const createAdminUser = async () => {
    try {
        const uid = 'XZqtcAuAilVuxkfcmTLo3YxPzo53'; // UID fornecido
        const email = 'misamisa';
        const password = '#Sonho1313';
        const name = 'Administrador';

        // Verifica se o usuário já existe no Firebase Authentication
        const userRecord = await admin.auth().getUser(uid).catch(() => null);

        if (!userRecord) {
            // Cria o usuário no Firebase Authentication com o UID fornecido
            const newUser = await admin.auth().createUser({
                uid,
                email,
                password,
            });

            // Salva os dados no Firestore com a role de admin
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

// Chama a função para criar o administrador
createAdminUser();

// Inicia o servidor
const PORT = process.env.PORT || 5500; // Alterado para 5500
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
