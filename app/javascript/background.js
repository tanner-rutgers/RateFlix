chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (/netflix\.com/.test(changeInfo.url)) {
		console.log("tab updated, reloading script");
		chrome.tabs.executeScript(null, { file: "javascript/contentscript.js" });
	}
});

chrome.runtime.onMessage.addListener(function(message, sender, response) {
	if (message.type == 'showPageAction') {
		chrome.pageAction.show(sender.tab.id);
	}
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.contentScriptQuery == "queryExpDates") {
    var url = "https://www.whats-on-netflix.com/leaving-soon/titles-leaving-netflix-in-" + request.queryDate;
    fetch(url)
        .then(response => response.text())
        .then(text => sendResponse(text))
        .catch(error => console.log(error))
    return true;
  }
});
