var toggleButton = document.getElementById('Toggle');
var statusDot = document.getElementById('statusDot');
var isProductive = localStorage.getItem('isProductive') === 'true' || false; // Load the state from localStorage

updateUI();

toggleButton.addEventListener('click', function() {
    isProductive = !isProductive;
    localStorage.setItem('isProductive', isProductive);
    updateUI();
    chrome.runtime.sendMessage({ action: 'Toggle', isTracking: isProductive });
});

document.getElementById("Toggle").addEventListener("click", function() {
    var toggleButtonText = toggleButton.textContent.trim().toLowerCase();

    if (toggleButtonText === 'start productivity') {
        chrome.runtime.sendMessage({ action: "toggleTracking", isTracking: true });
    } else if (toggleButtonText === 'stop') {
        chrome.runtime.sendMessage({ action: "toggleTracking", isTracking: false });
    }
});


function updateUI() {
    if (isProductive) {
        statusDot.style.backgroundColor = 'green';
        toggleButton.textContent = 'Stop';
      
    } else {
        statusDot.style.backgroundColor = 'red';
        toggleButton.textContent = 'Start Productivity';
        
    }
}

document.getElementById("Account").addEventListener("click", function() {
    // Open a new tab with the specified URL when the button is clicked
    const newPageURL = chrome.runtime.getURL("Account.html");
    chrome.tabs.create({ url: newPageURL });
});
