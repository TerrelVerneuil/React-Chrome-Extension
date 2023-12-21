let activeTabs = {}; // Store the list of activated tabs
let isTrackingActive = false; // Initial state for tracking
let timeSpent = 0;
// let activeTabCount = 0;
let activeTabCounts = 0;
let visitedSites = {};
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "Toggle") {
        isTrackingActive = request.isTracking;
        sendResponse({ status: "Tracking status updated to " + isTrackingActive });
        
    }
     else if (request.action === "requestData") {
        updateTabStatus();
        chrome.tabs.query({}, function(tabs) { 
            let openTabsCount = tabs.length; 
            
            let timeSpentInSeconds = timeSpent / 1000; 
            sendResponse({ timeSpent: timeSpentInSeconds, openTabs: openTabsCount });
            
            
            chrome.browserAction.setBadgeText({ text: openTabsCount.toString()});
            chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] }); // Change color to force refresh
            chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 0] }); // Set back to transparent
        });
        return true;
    }
});
//on created updates the badge text.
chrome.tabs.onCreated.addListener(updateBadgeText);
chrome.tabs.onRemoved.addListener(updateBadgeText);
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "requestData") {
        chrome.tabs.query({}, function(tabs) { 
            let openTabsCount = tabs.length; 
            
            let timeSpentInSeconds = timeSpent / 1000; 
            sendResponse({ timeSpent: timeSpentInSeconds, openTabs: openTabsCount });
        });
        return true; 
    }
});
//this is function is used for the count on the number of tabs
function updateBadgeText() {
    chrome.tabs.query({}, function(tabs) {
        let openTabsCount = tabs.length;
        chrome.browserAction.setBadgeText({ text: openTabsCount.toString() });
    });
}
function updateTabStatus() {
    const currentTime = Date.now();
    for (const tabId in activeTabs) {
        const lastActivatedTime = activeTabs[tabId];
        const inactiveTime = currentTime - lastActivatedTime;

        if (inactiveTime >= 120000) { //120000 miliseconds
            // Suspend tabs that haven't been used for 2 minutes
            chrome.tabs.discard(parseInt(tabId), function (discardedTab) {
            });
        }
    }
}
//used to log the each individual tab time so we can store all 
//urls or tabId's with a unique time attached.
function logTime(tabId) {
    if (activeTabs[tabId]) {
        const tabTimeSpent = Date.now() - activeTabs[tabId];
        timeSpent += tabTimeSpent;

        for (const id in activeTabs) {
            // Calculate time spent on each tab and update local storage
            const identifier = "Tab-" + id;
            const individualTabTime = Date.now() - activeTabs[id];
            chrome.storage.local.get([identifier], function(result) {
                const totalTime = result[identifier] ? result[identifier] + individualTabTime : individualTabTime;
                chrome.storage.local.set({ [identifier]: totalTime });
            });
        }

        delete activeTabs[tabId];
    }
}
//used when switching it gets the activated tab so 
//logTime is used as long as a tab is activated.
chrome.tabs.onActivated.addListener(activeInfo => {
    if (!isTrackingActive) return;
    updateTabStatus()
    
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        if (!tab.url || tab.url.startsWith('chrome://')) return;
        logTime(activeInfo.tabId);
        activeTabs[activeInfo.tabId] = Date.now();
    });
});
//used when adding new tabs or updating state of a tab
//s.a refreshing, creating new tab
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!isTrackingActive) return;
    updateTabStatus();
    if (changeInfo.url) {
       
        activeTabs[tabId] = Date.now();
        alert("onUpdated Test");
    }
});
chrome.tabs.onRemoved.addListener(tabId => {
    if (!isTrackingActive) return;
    updateTabStatus();
    
    //alert("onRemoved Test")
});
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

//load data is in fact not going to be used currently.
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






