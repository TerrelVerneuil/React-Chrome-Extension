function updateAccountContent() {
    chrome.runtime.sendMessage({ action: "requestData" }, function(response) {
        document.getElementById('timeSpentOnTabs').textContent = `Time spent: ${response.timeSpent} seconds`;
        document.getElementById('openTabsCount').textContent = `Open tabs: ${response.openTabs}`;
    });
}

chrome.tabs.onActivated.addListener(activeInfo => {
    updateAccountContent();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    updateAccountContent();
});
