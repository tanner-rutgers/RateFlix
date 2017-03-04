var lastTitle = "";

function getInfo(titleNode, episodeNode, callback) {
	var info = {};
	if (titleNode) {
		info["title"] = titleNode.textContent;
	}
	if (episodeNode) {
		var text = episodeNode.textContent;
		var regex = /\D*(\d+)\D*(\d+)/
		var match = regex.exec(text);
		info["season"] = match[1];
		info["episode"] = match[2];
	}
	callback(info);
}

function getRatings(title, season, episode, callback) {
	if (title && title.length && (!lastTitle || lastTitle == title || !title.endsWith(lastTitle))) {
		lastTitle = title;
		fetchRatings(title, season, episode, function(ratings) {
			callback(ratings);
		});
	}
}

function getInfoAndRatings(titleNode, episodeNode, callback) {
	getInfo(titleNode, episodeNode, function(info) {
		getRatings(info["title"], info["season"], info["episode"], callback);
	})
}

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observerOptions = {
	childList: true,
	subtree: true
}

var jawBoneContentObserver = new MutationObserver(function(mutations, observer) {
	var node = mutations[mutations.length - 1].target;
	getInfoAndRatings(node.querySelector(".jawBone > h3"), null, function(ratings) {
		injectRatings(node.querySelector(".meta"), ratings);
	});
});

var titleCardObserver = new MutationObserver(function(mutations, observer) {
	var node = mutations[mutations.length - 1].target;
	getInfoAndRatings(node.querySelector(".bob-title"), null, function(ratings) {
		injectRatings(node.querySelector(".meta"), ratings);
	});
});

function addTitleObserver(node) {
	node.querySelectorAll(".jawBoneContent").forEach(function(node) {
		if (!node.hasAttribute("observed")) {
			jawBoneContentObserver.observe(node, observerOptions);
			node.setAttribute("observed", "true");
		};
	});
	node.querySelectorAll(".title-card-container > div > span").forEach(function(node) {
		if (!node.hasAttribute("observed")) {
			titleCardObserver.observe(node, observerOptions);
			node.setAttribute("observed", "true");
		};
	});
}

var rowObserver = new MutationObserver(function(mutations, observer) {
	mutations.forEach(function(mutation) {
		if (mutation.addedNodes) {
			mutation.addedNodes.forEach(function(node) {
				if (node.nodeType === 1) {
					addTitleObserver(node);
				}
			});
		}
	});
});

var mainObserver = new MutationObserver(function(mutations, observer) {
	var mainView = document.querySelector(".mainView");
	if (mainView) {
		observer.disconnect();
		rowObserver.observe(mainView, observerOptions);
		addTitleObserver(mainView);
		addFeaturedInfo(mainView);
	}
});

function addFeaturedInfo(node) {
	var jawBone = node.querySelector(".jawBoneContainer > .jawBone");
	if (jawBone) {
		getInfoAndRatings(jawBone.querySelector(".title"), null, function(ratings) {
			injectRatings(node.querySelector(".meta"), ratings);
		});
	}
}

var playerObserver = new MutationObserver(function(mutations, observer) {
	var playerTitle = document.querySelector(".player-status-main-title");
	if (playerTitle && playerTitle.textContent && playerTitle.textContent.length > 0) {
		addPlayerInfo(playerTitle);
	}
});

function addPlayerInfo(playerTitle) {
	if (playerTitle) {
		var infoNode = playerTitle.parentNode;
		var episodeSpan;
		Array.prototype.some.call(infoNode.getElementsByTagName('span'), function(span) {
			if (span.classList.length == 0) {
				episodeSpan = span;
				return true;
			}
		});
		getInfoAndRatings(playerTitle, episodeSpan, function(ratings) {
			injectRatings(infoNode, ratings);
		});
	}
}

if (mainView = document.querySelector(".mainView")) {
	rowObserver.observe(mainView, observerOptions);
	addTitleObserver(mainView);
	addFeaturedInfo(mainView);
} else if (player = document.querySelector("#netflix-player")) {
	addPlayerInfo(player);
} else {
	mainObserver.observe(document, observerOptions);
	playerObserver.observe(document, observerOptions);
}