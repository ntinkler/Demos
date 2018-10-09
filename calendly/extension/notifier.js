
chrome.runtime.onInstalled.addListener(() => {

    chrome.alarms.create('CalendlyCheckServer', {
        delayInMinutes: 1,
        periodInMinutes: 1
    });

    chrome.alarms.onAlarm.addListener(async (evt) => {
        let events = await getEvents();
        await displayEvents(events);
    });

    chrome.runtime.onMessage.addListener(async (evt) => {
        console.log(`Received user token: ${evt.token}`);
        await setInStorage(evt);
        var user = await createUser(evt.token);
        console.log('Created user: ', user);
        events = await getEvents();
        await displayEvents(events);
    });

    CreateStartupWindow();

});


async function CreateStartupWindow() {
    let tab = await createTab({
        url: chrome.extension.getURL('tokenPrompt.html'),
        active: false
    });

    let window = await createWindow({
        tabId: tab.id,
        type: 'popup',
        focused: true,
        width: 375,
        height: 215
    });
}


async function displayEvents(events) {
    console.log(events);

    for(let i = 0; i < events.length; i++) {
        let evt = events[i];
        let meetingDate = (new Date(evt.eventAt)).toLocaleTimeString();

        await createNotification({
            type: 'basic',
            buttons: [{title: 'ok'}],
            title: `${evt.invitee} ${evt.type == 'cancel' ? 'canceled' : 'scheduled'} a meeting with you!`,
            message: `${evt.name} at ${meetingDate}`,
            iconUrl: 'calendly_icon.png'
        })
    }
}


// Utility functions to hit our api

async function getEvents() {
    var data = await getFromStorage(['token']);
    var res = await fetch(`https://calendly.cultivariety.com/api/event/${data.token}?nocache=${Math.floor(Date.now() / 1000)}`);
    return await res.json();
}

async function createUser(token) {
    var res = await fetch(`https://calendly.cultivariety.com/api/user/${token}`, {
        method: 'POST'
    });

    var body = await res.json();

    return body;
}


// convert callbacks to promises

function createNotification(options) {
    return new Promise(function(resolve, reject) {
        chrome.notifications.create(options, resolve);
    });
}

function createTab(options) {
    return new Promise(function(resolve, reject) {
        chrome.tabs.create(options, resolve);
    });
}

function createWindow(options) {
    return new Promise(function(resolve, reject) {
        chrome.windows.create(options, resolve);
    });
}

function setInStorage(obj) {
    return new Promise(function(resolve, reject) {
        chrome.storage.sync.set(obj, resolve);
    });
}

function getFromStorage(namesArr) {
    return new Promise(function(resolve, reject) {
        chrome.storage.sync.get(namesArr, resolve);
    });
}




