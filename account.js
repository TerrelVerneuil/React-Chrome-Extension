const websiteCategories = {
    "facebook.com": "Social Media",
    "twitter.com": "Social Media",
    "instagram.com": "Social Media",
    "linkedin.com": "Professional Networking",
    "youtube.com": "Entertainment",
    "netflix.com": "Entertainment",
    "hulu.com": "Entertainment",
    "wikipedia.org": "Education",
    "khanacademy.org": "Education",
    "coursera.org": "Education",
    "nytimes.com": "News",
    "theguardian.com": "News",
    "bbc.com": "News",
    "amazon.com": "Shopping",
    "ebay.com": "Shopping",
    "walmart.com": "Shopping",
    "stackoverflow.com": "Technology",
    "github.com": "Technology",
    "reddit.com": "Forums",
    "quora.com": "Forums",
    "tumblr.com": "Blogging",
    "blogger.com": "Blogging",
    "medium.com": "Blogging",
    "spotify.com": "Music",
    "soundcloud.com": "Music",
    "pandora.com": "Music",
    "gmail.com": "Email",
    "outlook.com": "Email",
    "yahoo.com": "Email",
    "twitch.tv": "Streaming",
    "zoom.us": "Communication",
    "skype.com": "Communication",
    "discord.com": "Communication",
    "slack.com": "Work",
    "asana.com": "Work",
    "trello.com": "Work",
    "dropbox.com": "Cloud Storage",
    "drive.google.com": "Cloud Storage",
    "onedrive.live.com": "Cloud Storage",
    "evernote.com": "Productivity",
    "notion.so": "Productivity",
    "airtable.com": "Productivity",
    "tripadvisor.com": "Travel",
    "booking.com": "Travel",
    "airbnb.com": "Travel",
    "expedia.com": "Travel",
    "udemy.com": "Education",
    "edx.org": "Education",
    "pluralsight.com": "Education",
    "goodreads.com": "Reading",
    "wired.com": "Technology News",
    "techcrunch.com": "Technology News",
    "mashable.com": "Technology News",
    "espn.com": "Sports",
    "nfl.com": "Sports",
    "nba.com": "Sports",
    "mlb.com": "Sports",
    "fifa.com": "Sports",
    "cnn.com": "News",
    "foxnews.com": "News",
    "aljazeera.com": "News",
    "huffpost.com": "News",
    "chat.openai.com":"Technology"
};



function getCategoryForWebsite(domain) {
    return websiteCategories[domain] || "Other";
}

function calculateTimePerCategory(callback) {
    chrome.storage.local.get(null, function(items) {
        let timePerCategory = {};

        for (let key in items) {
            if (key.startsWith("Domain-") && key.endsWith("-Time")) {
                let domain = key.replace("Domain-", "").replace("-Time", "");
                let category = getCategoryForWebsite(domain);

                if (!timePerCategory[category]) {
                    timePerCategory[category] = 0;
                }
                timePerCategory[category] += items[key];
            }
        }

        callback(timePerCategory);
    });
}

function updateAccountContent() {
   
}


function displayTimePerDomain() {
    chrome.storage.local.get(null, function(items) {
        let displayString = '';
        let totalTime = 0; // Initialize total time

        for (let key in items) {
            if (key.startsWith("Domain-") && key.endsWith("-Time")) {
                const timeInSeconds = items[key] / 1000; // Convert milliseconds to seconds
                totalTime += timeInSeconds; // Accumulate total time
                displayString += `<p>${key}: ${timeInSeconds.toFixed(2)} seconds</p>`; // Append domain time
            }
        }

        // Update total time display at the top of the page
        document.getElementById('totalTimeDisplay').textContent = `Total Time: ${totalTime.toFixed(2)} seconds`;
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

    function displayTimePerCategory() {
        calculateTimePerCategory(function(timePerCategory) {
            let displayString = '';
            for (let category in timePerCategory) {
                const timeInSeconds = (timePerCategory[category] / 1000).toFixed(2);
                displayString += `<p>${category}: ${timeInSeconds} seconds</p>`;
            }
            document.getElementById("categoryTimeData").innerHTML = displayString;
        });
    }
    
    
    
document.addEventListener('DOMContentLoaded', function() {
        updateAccountContent();
        displayTimePerCategory();
        displayTimePerDomain();
        displayBlockedSites();
});
    
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === "updateAccountContent") {
            updateAccountContent();
            displayTimePerCategory();
            displayTimePerDomain();
            displayBlockedSites();
        }
});
    
