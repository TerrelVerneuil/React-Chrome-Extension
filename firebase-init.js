
async function loadFirebase() {
  // Dynamically import the Firebase SDKs
  const firebaseApp = await import('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
  const firebaseFirestore = await import('https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js');
  const firebaseAuth = await import('https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js');
  const { initializeApp } = await import('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
  const { getAuth, setPersistence, browserLocalPersistence } = await import('https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js');


  
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCjAqJTFNW9uzJENrjpg_7DuBsPD_3xEpM",
    authDomain: "react-chrome-site.firebaseapp.com",
    databaseURL: "https://react-chrome-site-default-rtdb.firebaseio.com",
    projectId: "react-chrome-site",
    storageBucket: "react-chrome-site.appspot.com",
    messagingSenderId: "220152147383",
    appId: "1:220152147383:web:c1e662e8b81bcccfab8c32",
    measurementId: "G-G80V9YNN2Q"
  };

  // Initialize Firebase
  const app = firebaseApp.initializeApp(firebaseConfig);
  
  const auth = firebaseAuth.getAuth(app);
  
  const db = firebaseFirestore.getFirestore(app);

  setPersistence(auth, browserLocalPersistence);

  // Export the initialized services
  return { app, db , auth};
}

window.loadFirebase = loadFirebase; // Attach to window object
