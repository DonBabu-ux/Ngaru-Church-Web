// Firebase Configuration
const firebaseConfig = {
   apiKey: "AIzaSyA7Fx-54SHm02nIszZFSmkqo_S7VPS7W_Y",
  authDomain: "ngaru-church.firebaseapp.com",
  databaseURL: "https://ngaru-church-default-rtdb.firebaseio.com",
  projectId: "ngaru-church",
  storageBucket: "ngaru-church.firebasestorage.app",
  messagingSenderId: "207707689742",
  appId: "1:207707689742:web:954e317f69acc5959cbd5f",
  measurementId: "G-WFBY03PEJH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const analytics = firebase.analytics();

// Export Firebase services
const firebaseServices = {
    auth,
    db,
    analytics
};
