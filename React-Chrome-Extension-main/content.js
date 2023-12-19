


document.getElementById("Stop").addEventListener("click", function() {
    chrome.runtime.sendMessage({ action: "toggleTracking", isTracking: false });
    alert("stopped");
});


document.getElementById("Start").addEventListener("click", function() {
     chrome.runtime.sendMessage({ action: "toggleTracking", isTracking: true });
     alert("tracking");
 });





document.getElementById("Account").addEventListener("click", function() {
    // Open a new tab with the specified URL when the button is clicked

    const newPageURL = chrome.runtime.getURL("Account.html");
    chrome.tabs.create({ url: newPageURL });
});


