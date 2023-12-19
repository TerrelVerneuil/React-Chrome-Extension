


document.getElementById("Stop").addEventListener("click", function() {
    chrome.runtime.sendMessage({ action: "toggleTracking", isTracking: false });
});


document.getElementById("Start").addEventListener("click", function() {
    chrome.runtime.sendMessage({ action: "toggleTracking", isTracking: true });
});

document.getElementById("Stop").addEventListener("click", function() {
    console.log("Stop!");
});
document.getElementById("Account").addEventListener("click", function() {
    // Open a new tab with the specified URL when the button is clicked

    const newPageURL = chrome.runtime.getURL("Account.html");
    chrome.tabs.create({ url: newPageURL });
});


