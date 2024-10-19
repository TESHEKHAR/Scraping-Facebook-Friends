function updateUI(data) {
    console.log("Received data:", data); 
    sendScrapedDataToAPI(data);
}

function sendScrapedDataToAPI(data, facebookId) {
    fetch('http://localhost:8000/friends', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            facebookId: facebookId ? facebookId : undefined,
            friends:data
        }),
    })
    .then(response => response.json())
    .then(apiResponse => {
        console.log("API response:", apiResponse);
    })
    .catch(error => {
        console.error("Error sending data to API:", error);
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
                    updateUI(response.data);
                } else {
                    console.warn("No data received in response.");
                }
            });
        } else {
            console.warn("No active tabs found.");
        }
    });
};


startScrap('scrapeData');
