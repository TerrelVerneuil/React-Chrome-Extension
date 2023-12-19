console.log("Content script loaded");
document.getElementById("Start").addEventListener("click", function() {
    console.log("Start!");
});
document.getElementById("Stop").addEventListener("click", function() {
    console.log("Stop!");
});
document.getElementById("Account").addEventListener("click", function() {
    console.log("Account!");
});

document.getElementById("Account").addEventListener("click", function() {
    // Open a new tab with the specified URL when the button is clicked

    const newPageURL = chrome.runtime.getURL("Account.html");

    chrome.tabs.create({ url: newPageURL });
});


