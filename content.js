chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrapeData") {
        const data = friendListGet();
        sendResponse({ data: data });
    }
});

function friendListGet() {
    const data = document.querySelectorAll(".xvq8zen"); 
    const uniqueNames = new Set();

    data.forEach(element => {
        uniqueNames.add(element.innerText);
    });

    return Array.from(uniqueNames);
}
