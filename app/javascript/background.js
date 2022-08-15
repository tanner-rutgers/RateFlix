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

chrome.runtime.onInstalled.addListener(function (object) {
  chrome.tabs.create({url: "https://www.patreon.com/posts/rateflix-is-back-70573858"})
})