import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAkMFYizmJ4dd8G8oJ9uw1JdgzwhtmsENU",
  authDomain: "mywebapp-bb780.firebaseapp.com",
  databaseURL: "https://mywebapp-bb780-default-rtdb.firebaseio.com",
  projectId: "mywebapp-bb780",
  storageBucket: "mywebapp-bb780.firebasestorage.app",
  messagingSenderId: "1020137155241",
  appId: "1:1020137155241:web:7f3b26f9f680ee01d897b8",
  measurementId: "G-G6FB4E3WCM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// DOM Elements
const signupForm = document.getElementById("signupForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullName = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  // Create Firebase Auth User
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Save user in Realtime Database as member
      set(ref(db, `users/${user.uid}`), {
        name: fullName,
        email: email,
        ministry: "",
        role: "member"
      });
      alert("Signup successful! Please login.");
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
});
