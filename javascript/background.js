chrome.tabs.onUpdated.addListener(function() {
	console.log("tab updated, reloading script");
	chrome.tabs.executeScript(null, { file: "javascript/contentscript.js" });
});