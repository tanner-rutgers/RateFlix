chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (/netflix\.com/.test(changeInfo.url)) {
		console.log("tab updated, reloading script");
		chrome.tabs.executeScript(null, { file: "javascript/contentscript.js" });
	}
});