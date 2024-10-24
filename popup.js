function updateUI(data, id) {
    console.log("Received data:", data); 
    console.log("Received ID:", id);
    sendScrapedDataToAPI(data, id);
}
function sendScrapedDataToAPI(data, id) {
    fetch('http://localhost:8000/friends', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            facebookId: "",
            friends: data, 
            profileId: id, 
        }),
    })
    .then(response => response.json())
    .then(apiResponse => {
        console.log("API response:", apiResponse);
        // alert('Data saved successfully!');
    })
    .catch(error => {
        console.error("Error sending data to API:", error);
        alert('Error saving data.');
    });
}

const startScrap = (action) => {
    console.log("Sending message to content script...");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id, { action: action }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Error sending message:", chrome.runtime.lastError);
                    return;
                }

                console.log("Received response:", response);
                if (response && response.data) {
                    updateUI(response.data, response.id);
                } else {
                    console.warn("No data received in response.");
                }
            });
        } else {
            console.warn("No active tabs found.");
        }
    });
    
};

// startScrap('scrapeData');
// setInterval(() => startScrap('scrapeData'), 2000);

let scrapingInterval; 

document.addEventListener('DOMContentLoaded', function () {
    const scrapeButton = document.getElementById('scrape');
    let isScraping = false;

    scrapeButton.addEventListener('click', () => {
        isScraping = !isScraping;

        if (isScraping) {
            scrapeButton.textContent = "Stop Scraping";
            scrapeButton.classList.add('active');
            startScraping();
        } else {
            scrapeButton.textContent = "Start Scraping";
            scrapeButton.classList.remove('active');
            stopScraping();
        }
    });

    function startScraping() {
        console.log("Scraping started...");
        scrapingInterval = setInterval(() => {
            startScrap('scrapeData');
        }, 2000);
    }

    function stopScraping() {
        console.log("Scraping stopped...");
        clearInterval(scrapingInterval);
    }
});


