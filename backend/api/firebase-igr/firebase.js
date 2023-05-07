import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './creds.json' assert { type: "json" }; // Asumiendo que creds.json es un archivo JSON válido

// Configurar la credencial de Firebase
const admin = initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://sos2223-11-bbc8a-default-rtdb.europe-west1.firebasedatabase.app" // Reemplaza con la URL de tu proyecto Firebase
});

const db = getFirestore(admin); // Obtener una instancia de Firestore

export {db,admin};