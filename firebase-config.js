// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyYOUR_API_KEY_HERE",
    authDomain: "ngaru-anglican-church.firebaseapp.com",
    projectId: "ngaru-anglican-church",
    storageBucket: "ngaru-anglican-church.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
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
