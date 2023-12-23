var toggleButton = document.getElementById('Toggle');
var statusDot = document.getElementById('statusDot');
//stores if productivity mode is on or off
var isProductive = localStorage.getItem('isProductive') === 'true' || false; // Load the state from localStorage

updateUI();

toggleButton.addEventListener('click', function() {
    isProductive = !isProductive;
    localStorage.setItem('isProductive', isProductive);
    updateUI();
    chrome.runtime.sendMessage({ action: 'Toggle', isTracking: isProductive });
});
//goes to the toggle button specified in popup.html and 
//toggles tracking on or off.
document.getElementById("Toggle").addEventListener("click", function() {
    var toggleButtonText = toggleButton.textContent.trim().toLowerCase();

    if (toggleButtonText === 'start productivity') {
        chrome.runtime.sendMessage({ action: "toggleTracking", isTracking: true });
    } else if (toggleButtonText === 'stop') {
        chrome.runtime.sendMessage({ action: "toggleTracking", isTracking: false });
    }
});

//handlers for the status dot.
function updateUI() {
    if (isProductive) {
        statusDot.style.backgroundColor = 'green';
        toggleButton.textContent = 'Stop';
      
    } else {
        statusDot.style.backgroundColor = 'red';
        toggleButton.textContent = 'Start Productivity';
        
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
        // Load the content of anotherPage.html dynamically
        fetch(chrome.extension.getURL("pomodoro.html"))
            .then(response => response.text())
            .then(html => {
                // Replace the entire content of the main popup
                mainPopup.innerHTML = html;
            });
    });
});
