// backend/firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Caminho para o arquivo de credenciais

// Inicializa o Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Exporta o Firestore
const db = admin.firestore();

module.exports = { admin, db };
