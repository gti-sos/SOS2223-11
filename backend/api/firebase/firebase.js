import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import serviceAccount from './creds.json' assert { type: "json" }; // Asumiendo que creds.json es un archivo JSON válido
import pkg from 'firebase-admin';
const { credential } = pkg;
// Configurar la credencial de Firebase
const admin = initializeApp({
  credential: credential.cert(serviceAccount),
  databaseURL: "https://sos2223-11-bbc8a-default-rtdb.europe-west1.firebasedatabase.app" // Reemplaza con la URL de tu proyecto Firebase
});

const db = getDatabase(admin); // Obtener una instancia de Firestore

export default db;