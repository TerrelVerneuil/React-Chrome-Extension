const websiteCategories = {
    // Social Media
    "facebook.com": "Social Media",
    "twitter.com": "Social Media",
    "instagram.com": "Social Media",
    "linkedin.com": "Professional Networking",
    "pinterest.com": "Social Media",
    "snapchat.com": "Social Media",
    "tiktok.com": "Social Media",
    "reddit.com": "Social Media",
    "tumblr.com": "Social Media",
    "quora.com": "Social Media",
    "nextdoor.com": "Social Media",

    // Entertainment
    "youtube.com": "Entertainment",
    "netflix.com": "Entertainment",
    "hulu.com": "Entertainment",
    "amazonprime.com": "Entertainment",
    "disneyplus.com": "Entertainment",
    "vimeo.com": "Entertainment",
    "soundcloud.com": "Entertainment",
    "spotify.com": "Entertainment",
    "applemusic.com": "Entertainment",
    "deezer.com": "Entertainment",
    "tidal.com": "Entertainment",
    "bandcamp.com": "Entertainment",
    "vudu.com": "Entertainment",
    "crunchyroll.com": "Entertainment",
    "funimation.com": "Entertainment",

    // Education
    "wikipedia.org": "Education",
    "khanacademy.org": "Education",
    "coursera.org": "Education",
    "udemy.com": "Education",
    "edx.org": "Education",
    "pluralsight.com": "Education",
    "codecademy.com": "Education",
    "quizlet.com": "Education",
    "ted.com": "Education",
    "duolingo.com": "Education",
    "memrise.com": "Education",
    "brilliant.org": "Education",
    "udacity.com": "Education",
    "futurelearn.com": "Education",
    "udel.edu": "Education",

    // News
    "nytimes.com": "News",
    "theguardian.com": "News",
    "bbc.com": "News",
    "cnn.com": "News",
    "foxnews.com": "News",
    "aljazeera.com": "News",
    "huffpost.com": "News",
    "reuters.com": "News",
    "apnews.com": "News",
    "usatoday.com": "News",
    "npr.org": "News",
    "news.ycombinator.com": "News",
    "drudgereport.com": "News",
    "news.google.com": "News",
    "independent.co.uk": "News",
    "forbes.com": "News",
    "bloomberg.com": "News",

    // Shopping
    "amazon.com": "Shopping",
    "ebay.com": "Shopping",
    "walmart.com": "Shopping",
    "etsy.com": "Shopping",
    "bestbuy.com": "Shopping",
    "target.com": "Shopping",
    "asos.com": "Shopping",
    "zappos.com": "Shopping",
    "sephora.com": "Shopping",
    "macys.com": "Shopping",
    "nordstrom.com": "Shopping",
    "gap.com": "Shopping",
    "saksfifthavenue.com": "Shopping",
    "forever21.com": "Shopping",
    "bloomingdales.com": "Shopping",
    "oldnavy.com": "Shopping",
    "hm.com": "Shopping",
    "aliexpress.com": "Shopping",
    "newegg.com": "Shopping",

    // Technology
    "stackoverflow.com": "Technology",
    "github.com": "Technology",
    "reddit.com": "Forums",
    "quora.com": "Forums",
    "techcrunch.com": "Technology News",
    "mashable.com": "Technology News",
    "arstechnica.com": "Technology News",
    "theverge.com": "Technology News",
    "wired.com": "Technology News",
    "zdnet.com": "Technology News",
    "tomshardware.com": "Technology News",
    "engadget.com": "Technology News",
    "slashdot.org": "Technology News",
    "gizmodo.com": "Technology News",
    "techradar.com": "Technology News",
    "digitaltrends.com": "Technology News",
    "gsmarena.com": "Technology News",
    "anandtech.com": "Technology News",

    // Blogging
    "tumblr.com": "Blogging",
    "blogger.com": "Blogging",
    "medium.com": "Blogging",
    "wordpress.com": "Blogging",
    "ghost.org": "Blogging",
    "substack.com": "Blogging",
    "dev.to": "Blogging",
    "hashnode.com": "Blogging",
    "squarespace.com": "Blogging",
    "weebly.com": "Blogging",
    "wix.com": "Blogging",

    // Music
    "spotify.com": "Music",
    "pandora.com": "Music",
    "applemusic.com": "Music",
    "deezer.com": "Music",
    "tidal.com": "Music",
    "bandcamp.com": "Music",
    "soundcloud.com": "Music",
    "last.fm": "Music",
    "jazzradio.com": "Music",
    "8tracks.com": "Music",
    "di.fm": "Music",
    "hypem.com": "Music",
    "musixmatch.com": "Music",
    "genius.com": "Music",
    "songkick.com": "Music",

    // Email
    "gmail.com": "Email",
    "outlook.com": "Email",
    "yahoo.com": "Email",
    "protonmail.com": "Email",
    "mailchimp.com": "Email",
    "zoho.com": "Email",
    "aol.com": "Email",
    "yandex.com": "Email",
    "icloud.com": "Email",
    "gmx.com": "Email",
    "mail.com": "Email",

    // Streaming
    "twitch.tv": "Streaming",
    "mixer.com": "Streaming",
    "cbsallaccess.com": "Streaming",
    "hbomax.com": "Streaming",
    "peacocktv.com": "Streaming",
    "discoveryplus.com": "Streaming",
    "sling.com": "Streaming",
    "fubo.tv": "Streaming",
    "hulu.com/live": "Streaming",
    "youtube.com/tv": "Streaming",

    // Communication
    "zoom.us": "Communication",
    "skype.com": "Communication",
    "discord.com": "Communication",
    "slack.com": "Work",
    "teams.microsoft.com": "Communication",
    "googlemeet.com": "Communication",
    "webex.com": "Communication",
    "gotomeeting.com": "Communication",
    "jitsi.org": "Communication",
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
        let totalTimeInSeconds = 0;

        for (let key in items) {
            if (key.startsWith("Domain-") && key.endsWith("-Time")) {
                const timeInSeconds = items[key] / 1000;
                totalTimeInSeconds += timeInSeconds;
                displayString += `<p>${key}: ${formatTime(timeInSeconds)}</p>`;
            }
        }

        const formattedTotalTime = formatTime(totalTimeInSeconds);
        document.getElementById('totalTimeDisplay').textContent = `Total Time: ${formattedTotalTime}`;
        document.getElementById("timeData").innerHTML = displayString;
    });
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
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
    
