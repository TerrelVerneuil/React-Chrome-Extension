// In accountScript.js
chrome.runtime.sendMessage({ action: "requestData" }, function(response) {
    if (response) {
        document.getElementById('timeSpentOnTabs').textContent = 'Time Spent on Tabs: ' + response.timeSpent + ' seconds';
        document.getElementById('openTabsCount').textContent = 'Open Tabs: ' + response.openTabs;
    }
});
