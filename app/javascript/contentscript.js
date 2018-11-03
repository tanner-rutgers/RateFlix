chrome.runtime.sendMessage({type: 'showPageAction'});

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observerOptions = {
	childList: true,
	subtree: true
}

var checkTitles = getTitles();
var checkDates = getDates();

function expCheck(title) {
	for (var i = 0; i < checkTitles.length; i++) {
		if (checkTitles[i] == title) {
			return checkDates[i];
		}
	}
	return "N/A";
}

var jawBoneContentObserver = new MutationObserver(function(mutations, observer) {
	var node = mutations.find(function(mutation) { return mutation.target.hasAttribute("observed") });
	if (node) {
		node = node.target;
		var headerNode = node.querySelector(".jawBone > h3");
		if (headerNode) {
			var titleNode = headerNode.querySelector(".title");
			var title = titleNode.querySelector("img") ? titleNode.querySelector("img").alt : titleNode.textContent;
			if (title) {
				var exp = expCheck(title);
				getRatings(title, null, null, extractYear(node), function(ratings) {
					injectRatings(node.querySelector(".meta"), ratings, exp);
				});
			}
		}
	}
});

var titleCardObserver = new MutationObserver(function(mutations, observer) {
	var node = mutations.find(function(mutation) { return mutation.target.hasAttribute("observed") });
	if (node) {
		node = node.target;
		var titleNode = node.querySelector(".bob-title");
		if (titleNode && (title = titleNode.textContent)) {
			var exp = expCheck(title);
			getRatings(title, null, null, extractYear(node), function(ratings) {
				injectRatings(node.querySelector(".meta") || titleNode, ratings, exp);
			});
		}
	}
});

function addTitleObserver(node) {
	node.querySelectorAll(".jawBoneContent").forEach(function(node) {
		if (!node.hasAttribute("observed")) {
			node.setAttribute("observed", "true");
			jawBoneContentObserver.observe(node, observerOptions);
		};
	});
	node.querySelectorAll(".title-card-container > div > span").forEach(function(node) {
		if (!node.hasAttribute("observed")) {
			node.setAttribute("observed", "true");
			titleCardObserver.observe(node, observerOptions);
		};
	});
	node.querySelectorAll(".bob-container-tall-panel > span").forEach(function(node) {
		if (!node.hasAttribute("observed")) {
			node.setAttribute("observed", "true");
			titleCardObserver.observe(node, observerOptions);
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
		addFeaturedRatings(mainView);
	}
});

function addFeaturedRatings(node) {
	var jawBoneNode = node.querySelector(".jawBoneContainer > .jawBone");
	if (jawBoneNode) {
		var titleNode = jawBoneNode.querySelector(".title");
		if (titleNode) {
			if (img = titleNode.querySelector("img")) {
				title = img.alt;
			} else {
				title = titleNode.textContent;
			}
			var exp = expCheck(title);
			getRatings(title, null, null, extractYear(jawBoneNode), function(ratings) {
				injectRatings(node.querySelector(".meta"), ratings, exp);
			});
		}
	}
}

var playerObserver = new MutationObserver(function(mutations, observer) {
	if (titleContainerNode = document.querySelector(".video-title")) {
		observer.disconnect();
		addPlayerRatings(titleContainerNode);
	}
});

function addPlayerRatings(titleContainerNode) {
	var titleNode = titleContainerNode.getElementsByTagName('h4')[0];
	var episodeInfo = {};
	Array.prototype.some.call(titleContainerNode.getElementsByTagName('span'), function(span) {
		if (span.classList.length == 0) {
			episodeInfo = extractEpisodeInfo(span.textContent);
			return true;
		}
	});
	var exp = expCheck(titleNode.textContent);
	getRatings(titleNode.textContent, episodeInfo["season"], episodeInfo["episode"], null, function(ratings) {
		injectRatings(titleNode.parentNode, ratings, exp);
	});
}

var episodeContainerObserver = new MutationObserver(function(mutations, observer) {
	var episodeListContainer = document.querySelector(".episodes-pane");
	if (episodeListContainer) {
		addEpisodeRatings(episodeListContainer);
	}
});

function addEpisodeRatings(episodeListContainer) {
	var title = document.querySelector(".video-title").getElementsByTagName('h4')[0].textContent;
	var seasonNode = episodeListContainer.querySelector(".header-title");
	var season = extractSeasonNumber(seasonNode.textContent);
	if (season) {
		var episodes = episodeListContainer.querySelectorAll(".episode-row > div > span.number");
		episodes.forEach(function(episode) {
			if (title) {
				var exp = expCheck(title);
				getRatings(title, season, episode.textContent, null, function(ratings) {
					injectRatings(episode.parentNode, ratings, exp);
				});
			}
		});
	}
}

if (mainView = document.querySelector(".mainView")) {
	rowObserver.observe(mainView, observerOptions);
	addTitleObserver(mainView);
	addFeaturedRatings(mainView);
} else if (titleContainerNode = document.querySelector(".video-title")) {
	addPlayerRatings(titleContainerNode);
} else {
	mainObserver.observe(document, observerOptions);
	playerObserver.observe(document, observerOptions);
	episodeContainerObserver.observe(document, observerOptions);
}
