function updateUI(data) {
    console.log("Received data:", data); 
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
