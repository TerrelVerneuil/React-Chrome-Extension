let activeTabs = {}; // Store the list of activated tabs
let isTrackingActive = false; // Initial state for tracking
let timeSpent = 0;
// let activeTabCount = 0;

let activeTabCounts = 0;

// chrome.tabs.discard(tabId, function(discardedTab) {
   
// }); unloads content could be use to freeze tab state

function updateOpenTabsCount() {
    chrome.tabs.query({}, function(tabs) {
        // 'tabs' is an array of open tabs
        activeTabCounts = tabs.length;
    });
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggleTracking") {
        isTrackingActive = request.isTracking;
        sendResponse({ status: "Tracking status updated to " + isTrackingActive });
    }
    return true;
});

chrome.tabs.onActivated.addListener(activeInfo => {
    if (!isTrackingActive) return;
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        if (!tab.url || tab.url.startsWith('chrome://')) return;
        activeTabs[activeInfo.tabId] = Date.now();
        updateOpenTabsCount();

        alert("onActivated Test");
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!isTrackingActive) return;
    if (changeInfo.url) {
        logTime(tabId);
        // activeTabCount++;
        activeTabs[tabId] = Date.now();
        alert("onUpdated Test");
    }
});

chrome.tabs.onRemoved.addListener(tabId => {
    if (!isTrackingActive) return;
    logTime(tabId);
    updateOpenTabsCount();

    // activeTabCount--;
    alert("onRemoved Test")
});


function logTime(tabId) {
    if (activeTabs[tabId]) {
        tabtimeSpent = Date.now() - activeTabs[tabId];
        timeSpent+= tabtimeSpent
        saveTimeSpent(tabId, tabtimeSpent);
        delete activeTabs[tabId];
    }
}


function saveTimeSpent(tabId, tabTimeSpent) {
    // Use hostname or another identifier instead of tabId
    let identifier = "Tab-" + tabId; // Example identifier
    chrome.storage.local.get([identifier], function(result) {
        let totalTime = result[identifier] ? result[identifier] + tabTimeSpent : tabTimeSpent;
        chrome.storage.local.set({ [identifier]: totalTime });
    });
}


//function clears data from local storage
//probably will be used when clearing user data.
function removeData(key) {
    chrome.storage.local.remove(key, function() {
        console.log('Data removed for key:', key);
    });
}
//these two functions will be used to generate
//data in account.html.
//saving data to chrome local storage for later use
function saveData(key, data) {
    let obj = {};
    obj[key] = data;
    chrome.storage.local.set(obj, function() {
        console.log('Data saved for key:', key);
    });
}

function loadData(key, callback) {
    chrome.storage.local.get([key], function(result) {
        if (result[key]) {
            console.log('Data loaded for key:', key);
            callback(result[key]);
        } else {
            console.log('No data found for key:', key);
        }
    });
}



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "requestData") {
        chrome.tabs.query({}, function(tabs) {
            let openTabsCount = tabs.length; // Number of open tabs
            let timeSpentInSeconds = timeSpent / 1000; // Convert timeSpent to seconds
            sendResponse({ timeSpent: timeSpentInSeconds, openTabs: openTabsCount });
        });
        return true; // Keep the message channel open for the asynchronous response
    }
});
