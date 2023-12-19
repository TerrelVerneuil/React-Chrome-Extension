



let activeTabs = {}; //store the list of activated tabs
let listenerEnabled = true; //listener is not enabled by default

function startListeners() {
    listenersEnabled = true;
    console.log("Listeners started");
}

function stopListeners() {
    listenersEnabled = false;
    console.log("Listeners stopped");
}

chrome.tabs.onActivated.addListener(activeInfo => { //add a event listener to see 
    //the currently activated tabs
    chrome.tabs.get(activeInfo.tabId, function(tab){
        if(!tab.url || tab.url.startsWith('chrome://')){ //might
        //have to check when differnt browser is used
            return; 
        }
        activeTabs[activeInfo.tabId] = Date.now();
        //log the time for the activated tab
        alert(`Tab activated: ${tab.url}`);
    });
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.url){ //if the tab changed log time spent
        logTime(tabId);
        activeTabs[tabId] = Date.now();
        console.log(`Tab updated: ${changeInfo.url}`);
        alert(`Tab updated: ${tabs.url}`);
    }
});
function logTime(tabId){
    if(activeTabs[tabId]){
        let timeSpent = Date.now() - activeTabs[tabId]; //this gets our 
        alert(`Time spent on tab ${tabId}: ${timeSpent}ms`);
        //time spent variable
        //we can use this for the ML side of things * yoousef
        
        delete activeTabs[tabId];
    }
} 

chrome.tabs.onRemoved.addListener(tabId => {
    logTime(tabId); //log time of the item removed from active tabs
    alert(`Tab removed: ${tabId}`);
});

function saveTimeSpent(url, timeSpent) {
    let hostname = new URL(url).hostname;
    
    chrome.storage.local.get([hostname], function(result) {
        let totalTime = result[hostname] ? result[hostname] + timeSpent : timeSpent;
        chrome.storage.local.set({[hostname]: totalTime});
    });
}