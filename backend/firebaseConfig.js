// backend/firebaseConfig.js
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

// Configuração do Firebase (substitua pelos seus dados)
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app);

module.exports = db;
