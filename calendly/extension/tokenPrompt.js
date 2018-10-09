document.forms[0].onsubmit = function(e) {
    e.preventDefault();
    chrome.runtime.sendMessage({
        token:  document.getElementById('token').value
    }, () => {
        window.close();
    });
};