let activeTabs = {}; // Store the list of activated tabs
let isTrackingActive = true; // Initial state for tracking


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
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!isTrackingActive) return;
    if (changeInfo.url) {
        logTime(tabId);
        activeTabs[tabId] = Date.now();
    }
});

chrome.tabs.onRemoved.addListener(tabId => {
    if (!isTrackingActive) return;
    logTime(tabId);
});


function logTime(tabId) {
    if (activeTabs[tabId]) {
        let timeSpent = Date.now() - activeTabs[tabId];
        delete activeTabs[tabId];
    }
}


function saveTimeSpent(url, timeSpent) {
    let hostname = new URL(url).hostname;
    chrome.storage.local.get([hostname], function(result) {
        let totalTime = result[hostname] ? result[hostname] + timeSpent : timeSpent;
        chrome.storage.local.set({ [hostname]: totalTime });
    });
}
