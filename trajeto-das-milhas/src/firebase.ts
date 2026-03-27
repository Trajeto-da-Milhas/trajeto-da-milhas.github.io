import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Tenta inicializar com o banco de dados específico, mas falha para o padrão se houver erro
let firestoreDb;
try {
  firestoreDb = getFirestore(app, firebaseConfig.firestoreDatabaseId);
} catch (e) {
  console.warn("Falha ao inicializar banco de dados específico, tentando o padrão.");
  firestoreDb = getFirestore(app);
}
export const db = firestoreDb;
export const googleProvider = new GoogleAuthProvider();

export const login = () => signInWithRedirect(auth, googleProvider);
export const logout = () => signOut(auth);
