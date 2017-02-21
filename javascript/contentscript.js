var lastTitle = "";

function getInfo(title) {
	if (!lastTitle || !title.endsWith(lastTitle)) {
		lastTitle = title;
		console.log(title);
	}
}

function addTitleObserver(node) {
	titleObservers = titleObservers + 1;
	console.log("Adding title observer " + titleObservers);
	titleObserver.observe(node, options);
}

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observerOptions = {
	childList: true,
	characterData: true,
	subtree: true
}

var titleObserver = new MutationObserver(function(mutations, observer) {
	var header = $(".jawBone > h3")
	if (header.length) {
		getInfo(header.text());
	}
});

var rowObserver = new MutationObserver(function(mutations, observer) {
	mutations.forEach(function(mutation) {
		if (mutation.addedNodes) {
			mutation.addedNodes.forEach(function(node) {
				if (node.classList && node.classList.contains("lolomoRow_title_card")) {
					titleObserver.observe(node.querySelector(".jawBoneContent"), observerOptions);
				}
			});
		}
	});
});

document.querySelectorAll(".jawBoneContent").forEach(function(node) {
	titleObserver.observe(node, observerOptions);
});

rowObserver.observe(document.querySelector(".mainView > div"), { childList: true });