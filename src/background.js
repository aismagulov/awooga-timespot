let contextMenuId = null;

function formatTimestamp(ts) {
    let date;
    if (ts.length === 10) {
        // Seconds
        date = new Date(Number(ts) * 1000);
    } else if (ts.length === 13) {
        // Milliseconds
        date = new Date(Number(ts));
    } else {
        return null;
    }
    const pad = n => n.toString().padStart(2, '0');
    return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'TIMESTAMP_SELECTED') {
        const formatted = formatTimestamp(message.value);
        if (formatted) {
            // Remove previous menu if exists
            if (contextMenuId !== null) {
                chrome.contextMenus.remove(contextMenuId);
            }
            contextMenuId = chrome.contextMenus.create({
                id: 'timestamp-context-menu',
                title: formatted,
                contexts: ['selection']
            });
        }
    } else if (message.type === 'TIMESTAMP_CLEARED') {
        if (contextMenuId !== null) {
            chrome.contextMenus.remove(contextMenuId);
            contextMenuId = null;
        }
    }
});