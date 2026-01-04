// ===== Import Firebase modules =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getDatabase, ref, set, push, onChildAdded, remove, get, child } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

// ===== Firebase Config =====
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

// ===== Initialize Firebase =====
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// ===== DOM Elements =====
const adminAnnouncementForm = document.getElementById("adminAnnouncementForm");
const announcementInput = document.getElementById("announcementInput");
const announcementFeed = document.getElementById("announcementFeed");
const allUserPosts = document.getElementById("allUserPosts");
const membersList = document.getElementById("membersList");

let currentUserId = null;

// ===== Auth State =====
onAuthStateChanged(auth, user => {
  if (user) {
    currentUserId = user.uid;

    // Optional: check if user is admin
    get(ref(db, `admins/${currentUserId}`)).then(snapshot => {
      if(!snapshot.exists()){
        alert("You are not an admin!");
        window.location.href = "index.html";
      }
    });

    loadAnnouncements();
    loadAllUserPosts();
    loadMembers();
  } else {
    window.location.href = "login.html";
  }
});

// ===== Post Admin Announcement =====
adminAnnouncementForm.addEventListener("submit", e => {
  e.preventDefault();
  const text = announcementInput.value;
  const newAnnRef = push(ref(db, "announcements"));
  set(newAnnRef, { text });
  announcementInput.value = "";
  alert("Announcement posted!");
});

// ===== Load Admin Announcements =====
function loadAnnouncements() {
  const announcementsRef = ref(db, "announcements");
  onChildAdded(announcementsRef, snapshot => {
    const announcement = snapshot.val();
    const annDiv = document.createElement("div");
    annDiv.classList.add("announcement-item");
    annDiv.innerHTML = `
      <p><strong>Admin:</strong> ${announcement.text}</p>
      <button class="delete-btn">Delete</button>
    `;
    announcementFeed.prepend(annDiv);

    annDiv.querySelector(".delete-btn").addEventListener("click", () => {
      remove(ref(db, `announcements/${snapshot.key}`));
      annDiv.remove();
    });
  });
}

// ===== Load All User Posts =====
function loadAllUserPosts() {
  const postsRef = ref(db, "posts");
  onChildAdded(postsRef, snapshot => {
    const userId = snapshot.key;

    // For each user, get their posts
    onChildAdded(ref(db, `posts/${userId}`), postSnap => {
      const postDiv = document.createElement("div");
      postDiv.classList.add("user-post-item");
      postDiv.innerHTML = `
        <p><strong>User:</strong> ${userId} - ${postSnap.val().text}</p>
        <button class="delete-btn">Delete</button>
      `;
      allUserPosts.prepend(postDiv);

      postDiv.querySelector(".delete-btn").addEventListener("click", () => {
        remove(ref(db, `posts/${userId}/${postSnap.key}`));
        postDiv.remove();
      });
    });
  });
}

// ===== Load Members List =====
function loadMembers() {
  const usersRef = ref(db, "users");
  onChildAdded(usersRef, snapshot => {
    const data = snapshot.val();
    const memberDiv = document.createElement("div");
    memberDiv.classList.add("member-item");
    memberDiv.innerHTML = `
      <p><strong>Name:</strong> ${data.name || "N/A"} | <strong>Email:</strong> ${data.email || "N/A"} | <strong>Ministry:</strong> ${data.ministry || "None"}</p>
    `;
    membersList.prepend(memberDiv);
  });
}

// ===== Logout Function =====
export function logout() {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
}
