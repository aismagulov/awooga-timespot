document.addEventListener('mouseup', function () {
    const selection = window.getSelection().toString().trim();
    // Check for 10 or 13 digit numbers
    if (/^\d{10}$/.test(selection) || /^\d{13}$/.test(selection)) {
        chrome.runtime.sendMessage({
            type: 'TIMESTAMP_SELECTED',
            value: selection
        });
    } else {
        chrome.runtime.sendMessage({
            type: 'TIMESTAMP_CLEARED'
        });
    }
});