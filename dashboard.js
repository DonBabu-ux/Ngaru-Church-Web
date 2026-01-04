import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getDatabase, ref, set, push, onChildAdded, remove, get } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
   apiKey: "AIzaSyAkMFYizmJ4dd8G8oJ9uw1JdgzwhtmsENU",
  authDomain: "mywebapp-bb780.firebaseapp.com",
  databaseURL: "https://mywebapp-bb780-default-rtdb.firebaseio.com",
  projectId: "mywebapp-bb780",
  storageBucket: "mywebapp-bb780.firebasestorage.app",
  messagingSenderId: "1020137155241",
  appId: "1:1020137155241:web:7f3b26f9f680ee01d897b8",
  measurementId: "G-G6FB4E3W
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// DOM Elements
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userMinistry = document.getElementById("userMinistry");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const updateProfileForm = document.getElementById("updateProfileForm");
const joinMinistryForm = document.getElementById("joinMinistryForm");
const ministrySelect = document.getElementById("ministrySelect");
const userPostForm = document.getElementById("userPostForm");
const postInput = document.getElementById("postInput");
const userPosts = document.getElementById("userPosts");
const announcementFeed = document.getElementById("announcementFeed");

let currentUserId = null;

// ===== AUTH STATE =====
onAuthStateChanged(auth, user => {
  if(user){
    currentUserId = user.uid;
    userEmail.textContent = user.email;

    const userRef = ref(db, `users/${user.uid}`);
    get(userRef).then(snapshot => {
      if(snapshot.exists()){
        const data = snapshot.val();
        userName.textContent = data.name || user.displayName || "Member";
        userMinistry.textContent = data.ministry || "None";
      }
    });

    // User posts
    const postsRef = ref(db, `posts/${user.uid}`);
    onChildAdded(postsRef, snapshot => {
      addPostToDOM(snapshot.key, snapshot.val().text);
    });

    // Admin announcements
    const announcementsRef = ref(db, "announcements");
    onChildAdded(announcementsRef, snapshot => {
      const announcement = snapshot.val();
      const annDiv = document.createElement("div");
      annDiv.classList.add("announcement-item");
      annDiv.innerHTML = `<p><strong>Admin:</strong> ${announcement.text}</p>`;
      announcementFeed.prepend(annDiv);
    });
  } else {
    window.location.href = "login.html";
  }
});

// ===== PROFILE UPDATE =====
updateProfileForm.addEventListener("submit", e => {
  e.preventDefault();
  set(ref(db, `users/${currentUserId}`), {
    name: nameInput.value,
    email: emailInput.value,
    ministry: userMinistry.textContent
  });
  userName.textContent = nameInput.value;
  userEmail.textContent = emailInput.value;
  alert("Profile updated successfully!");
  updateProfileForm.reset();
});

// ===== JOIN MINISTRY =====
joinMinistryForm.addEventListener("submit", e => {
  e.preventDefault();
  const ministry = ministrySelect.value;
  set(ref(db, `users/${currentUserId}/ministry`), ministry);
  userMinistry.textContent = ministry;
  alert(`You joined ${ministry}!`);
  joinMinistryForm.reset();
});

// ===== USER POST FEED =====
userPostForm.addEventListener("submit", e => {
  e.preventDefault();
  const postText = postInput.value;
  const newPostRef = push(ref(db, `posts/${currentUserId}`));
  set(newPostRef, { text: postText });
  postInput.value = "";
});

function addPostToDOM(key, text){
  const postDiv = document.createElement("div");
  postDiv.classList.add("user-post-item");
  postDiv.setAttribute("data-key", key);
  postDiv.innerHTML = `<p>${text}</p><button class="delete-btn">Delete</button>`;
  userPosts.prepend(postDiv);

  postDiv.querySelector(".delete-btn").addEventListener("click", ()=>{
    remove(ref(db, `posts/${currentUserId}/${key}`));
    postDiv.remove();
  });
}

// ===== LOGOUT =====
export function logout(){
  signOut(auth).then(()=>{
    window.location.href = "login.html";
  });
}

