

document.addEventListener("DOMContentLoaded", function () {
    chrome.runtime.sendMessage({ action: "requestData" }, function(response) {
        updateContent(response);
    });
});

function updateContent(data) {
    
    const timeSpentElement = document.getElementById('timeSpentOnTabs');
    const openTabsElement = document.getElementById('openTabsCount');

    if (timeSpentElement) {
        timeSpentElement.textContent = `Time spent on tabs: ${data.timeSpent} seconds`;
    }

    if (openTabsElement) {
        openTabsElement.textContent = `Open tabs count: ${data.openTabs}`;
    }
}
