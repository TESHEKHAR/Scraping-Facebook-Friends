function scrapeProfileData() {
    const profiles = document.querySelectorAll('.x1qjc9v5');
    const uniqueProfiles = new Set();
    const profileData = [];

    profiles.forEach(profile => {
        const nameElement = profile.querySelector('span.x193iq5w');
        const name = nameElement ? nameElement.textContent : 'No name found';

        const imageElement = profile.querySelector('image');
        const imageUrl = imageElement ? imageElement.getAttribute('xlink:href') : 'No image found';

        let mutualFriends = 'No mutual friends found';
        const spanElements = profile.querySelectorAll('span');

        spanElements.forEach(span => {
            if (span.textContent.includes('mutual friends')) {
                const match = span.textContent.match(/\d+/);
                mutualFriends = match ? match[0] : 'No mutual friends found';
            }
        });
        if (!uniqueProfiles.has(name)) {
            uniqueProfiles.add(name); 
            profileData.push({ name, imageUrl, mutualFriends }); 
        }
    });
    
    return profileData;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrapeData") {
        const data = scrapeProfileData();
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
