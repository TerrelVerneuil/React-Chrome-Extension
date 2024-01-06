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
window.addEventListener('load', () => {
    
  firebase.initializeApp(firebaseConfig);

});