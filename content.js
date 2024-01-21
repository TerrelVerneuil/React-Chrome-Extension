



var toggleButton = document.getElementById('Toggle');
var statusDot = document.getElementById('statusDot');
var isProductive = localStorage.getItem('isProductive') === 'true' || false;


updateUI();

toggleButton.addEventListener('click', function() {
    isProductive = !isProductive;
    localStorage.setItem('isProductive', isProductive);
    updateUI();
    chrome.runtime.sendMessage({ action: 'Toggle', isTracking: isProductive });
    
});
document.getElementById("SignInButton").addEventListener("click", function() {
    //for testing the current tab created is local host
    chrome.tabs.create({ url: "localhost:3000" });
});

document.getElementById("Toggle").addEventListener("click", function() {
    var toggleButtonText = toggleButton.textContent.trim().toLowerCase();

    if (toggleButtonText === 'start productivity') {
        chrome.runtime.sendMessage({ action: "toggleTracking", isTracking: true });
        
    } else if (toggleButtonText === 'stop productivity') {
        
        chrome.runtime.sendMessage({ action: "toggleTracking", isTracking: false });
    }
});

function updateUI() {
    if (isProductive) {
        statusDot.style.backgroundColor = 'green';
        toggleButton.textContent = 'Stop Productivity';
        toggleButton.style.backgroundColor = 'Red';
    } else {
        statusDot.style.backgroundColor = 'red';
        toggleButton.textContent = 'Start Productivity';
        toggleButton.style.backgroundColor = 'Green';
    }



}

//generates the account html form
document.getElementById("Account").addEventListener("click", function() {
    const newPageURL = chrome.runtime.getURL("Account.html");
    chrome.tabs.create({ url: newPageURL });
});
// popup.js
document.addEventListener("DOMContentLoaded", function() {
    const mainPopup = document.getElementById("mainPopup");
    const dynamicContent = document.getElementById("dynamicContent");

    const goToAnotherPageButton = document.getElementById("goToAnotherPage");

    goToAnotherPageButton.addEventListener("click", function() {
        fetch(chrome.extension.getURL("pomodoro.html"))
            .then(response => response.text())
            .then(html => {
                mainPopup.innerHTML = html;
                // Find script tags
                const scripts = mainPopup.getElementsByTagName("script");
                for (let script of scripts) {
                    const newScript = document.createElement("script");
                    // If the script has a 'src', set it
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        // If it's inline script, set its content
                        newScript.textContent = script.textContent;
                    }
                    document.body.appendChild(newScript);
                }
            });
    });
    
    
});


function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}


function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

(async () => {
    console.log("test");
    const modulePath = chrome.runtime.getURL("firebase-init.js");
    await import(modulePath);

    window.addEventListener('message', function(event) {
        console.log("test");
        // Ensure the message is from your domain and contains the expected data
        if (event.origin === "http://localhost:3000" && event.data.action === "userSignedIn") {
            const uid = event.data.uid;
            setCookie('uid', uid, 30); 
            const storedUid = getCookie(uid); 
            console.log(storedUid); 
        }
    });
    window.loadFirebase().then(({ app, auth , db}) => {
        auth.onAuthStateChanged(user => {
            if (user) {
                // User is signed in
                console.log('User is signed in:', user.uid);
                // Update UI accordingly
            } else {
                console.log('User is not signed in, u sure');
            }


            
        });


    }).catch((error) => {
        console.error("Error loading Firebase:", error);
    });
})();


// popup.js
document.addEventListener('DOMContentLoaded', function () {
    // Get the "home" button element
    var homeButton = document.getElementById('Home');

    // Add a click event listener to the "home" button
    homeButton.addEventListener('click', function () {
        // Send a message to background.js to update the current tab's URL
        chrome.runtime.sendMessage({ action: 'goHome' });
    });
});



  










// Check if the user is signed in

// Set up the Firebase authentication state change listener once
// const unsubscribe = auth.onAuthStateChanged(user => {
//     if (user) {
//         // User is signed in
//         signInButton.textContent = 'Sign Out';
//         console.log('User is signed in:', user.uid);
//     } else {
//         // User is not signed in
//         signInButton.textContent = 'Sign In';
//         console.log('User is not signed in');
//     }
// });

// Event listener for the Sign In/Sign Out button
// signInButton.addEventListener('click', function() {
//     console.log('Sign In/Sign Out button clicked');

//     if (signInButton.textContent === 'Sign In') {
//         // Open a new tab for the user to sign in
//         chrome.tabs.create({ url: "http://localhost:3000" });
//     } else {
//         // Sign out logic
//         auth.signOut().then(() => {
//             console.log('User signed out');
//         }).catch(error => {
//             console.error('Sign-out error:', error);
//         });
//     }
// });

// Define variables to track time and state







