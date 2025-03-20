// backend/createAdmin.js
const { admin } = require('./config/firebaseAdmin');

const email = 'admin@example.com'; // E-mail do administrador
const password = 'senha123'; // Senha do administrador

async function createAdminUser() {
  try {
    // Cria o usuário no Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Adiciona o usuário ao Firestore com a role de admin
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      email,
      role: 'admin',
      createdAt: admin.firestore.Timestamp.now(),
    });

    console.log('Usuário administrador criado com sucesso!');
    console.log('UID:', userRecord.uid);
  } catch (error) {
    console.error('Erro ao criar usuário administrador:', error);
  }
}

createAdminUser();
