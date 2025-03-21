import admin from 'firebase-admin';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { getDatabase } from 'firebase-admin/database';
import { getStorage } from 'firebase-admin/storage';
import { getAuth } from 'firebase-admin/auth';

// Firebase client configuration for frontend
export const firebaseConfig = {
  apiKey: "AIzaSyB5oH7sdcV16AW5rSw1N4Rl-xUVtJA2sl0",
  authDomain: "chatapp-c7950.firebaseapp.com",
  databaseURL: "https://chatapp-c7950-default-rtdb.firebaseio.com",
  projectId: "chatapp-c7950",
  storageBucket: "chatapp-c7950.firebasestorage.app",
  messagingSenderId: "547852260706",
  appId: "1:547852260706:web:a445da1ec24f48cfde883b",
  measurementId: "G-D5KD364RZ0"
};

// Define a flag to track if Firebase is initialized
let firebaseInitialized = false;

// Initialize Firebase Admin if credentials are available
let db, rtdb, storage, auth;

try {
  // Check if Firebase credentials are available
  if (!process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
    console.warn('Missing Firebase credentials in environment variables. Firebase services will not be available.');
  } else {
    // Create service account object
    const serviceAccount = {
      type: "service_account",
      project_id: firebaseConfig.projectId,
      private_key_id: "2c254eb3a138b31d92335373db8988452fcdcb34",
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: "112928116877502512982",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40${firebaseConfig.projectId}.iam.gserviceaccount.com`,
      universe_domain: "googleapis.com"
    };
    
    console.log('Initializing Firebase with service account...');
    
    // Initialize Firebase Admin SDK
    const app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: firebaseConfig.databaseURL,
      storageBucket: firebaseConfig.storageBucket
    });
    
    // Initialize Firebase services
    db = getFirestore(app);
    rtdb = getDatabase(app);
    storage = getStorage(app);
    auth = getAuth(app);
    
    firebaseInitialized = true;
    console.log('Firebase Admin SDK initialized successfully');
  }
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error);
}

// Export Firebase services and flag (some may be undefined if initialization failed)
export { admin, db, rtdb, storage, auth, Timestamp, FieldValue, firebaseInitialized };