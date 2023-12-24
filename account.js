function updateAccountContent() {
    chrome.runtime.sendMessage({ action: "requestData" }, function(response) {
        document.getElementById('timeSpentOnTabs').textContent = `Time spent: ${response.timeSpent} seconds`;
        document.getElementById('openTabsCount').textContent = `Open tabs: ${response.openTabs}`;
    });
}

// chrome.tabs.onActivated.addListener(activeInfo => {
//     updateAccountContent();
//     displayData();
//     displayBlockedSites();
// });

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     updateAccountContent();
//     displayData();
//     displayBlockedSites();
// });
function displayTimePerDomain() {
    chrome.storage.local.get(null, function(items) {
        let displayString = '';
        for (let key in items) {
            if (key.startsWith("Domain-") && key.endsWith("-Time")) {
                const timeInSeconds = items[key] / 1000; // Convert milliseconds to seconds
                displayString += `<p>${key}: ${timeInSeconds.toFixed(2)} seconds</p>`; // Fixed to 2 decimal places
            }
        }
        document.getElementById("timeData").innerHTML = displayString;
    });
}





function displayBlockedSites() {
        chrome.storage.local.get({ blockedSites: [] }, function(result) {
            let blockedSitesHtml = '';
            result.blockedSites.forEach(site => {
                blockedSitesHtml += `<p>${site}</p>`;
            });
            document.getElementById('blockedSites').innerHTML = blockedSitesHtml;
        });
    }
    
document.addEventListener('DOMContentLoaded', function() {
        updateAccountContent();
        displayTimePerDomain();
        displayBlockedSites();
});
    
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === "updateAccountContent") {
            updateAccountContent();
            displayTimePerDomain();
            displayBlockedSites();
        }
});
    
