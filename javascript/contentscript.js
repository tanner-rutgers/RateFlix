var lastTitle = "";

function getInfo(node) {
	var header = node.querySelector(".jawBone > h3");
	if (header) {
		var title = header.textContent;
		if (title.length && (!lastTitle || !title.endsWith(lastTitle))) {
			lastTitle = title;
			// var year = $(".year").text().substring(0, 4);
			fetchRatings(title, function(ratings) {
				injectRatings(node, ratings);
			});
		}
	}
}

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observerOptions = {
	childList: true,
	subtree: true
}

var titleObserver = new MutationObserver(function(mutations, observer) {
	getInfo(mutations[mutations.length - 1].target);
});

function addTitleObserver(node) {
	node.querySelectorAll(".jawBoneContent").forEach(function(node) {
		if (!node.hasAttribute("observed")) {
			console.log("adding title observer");
			titleObserver.observe(node, observerOptions);
			node.setAttribute("observed", "true");
		}
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
		rowObserver.observe(mainView, observerOptions);
		addTitleObserver(mainView);
		mainObserver.disconnect();
	}
});

if (mainView = document.querySelector(".mainView")) {
	rowObserver.observe(mainView, observerOptions);
	addTitleObserver(mainView);
} else {
	mainObserver.observe(document, observerOptions);
}

function imdbSpan(id) {
	var span = document.createElement("SPAN");
	span.className = "imdbRating";
	return span;
}

function imdbLink(id) {
	var link = document.createElement("A");
	link.href = "https://www.imdb.com/title/" + id;
	link.target = "_blank";
	return link;
}

function imdbLogo(id) {
	var span = imdbSpan(id);
	var link = imdbLink(id);
	var image = document.createElement("IMG");
	image.src = chrome.extension.getURL("images/imdb_31x14.png");
	link.appendChild(image);
	span.appendChild(link);
	return span;
}

function imdbRating(id, rating) {
	var span = imdbSpan(id);
	var link = imdbLink(id);
	var rating = document.createTextNode(rating + "/10");
	link.appendChild(rating);
	span.appendChild(link);
	return span;
}

function injectRatings(node, ratings) {
	rating = ratings["imdb"];
	id = ratings["imdbID"];

	if (!rating) { return }

	var meta = node.querySelector(".meta");
	if (!meta.querySelector(".imdbRating")) {
		meta.appendChild(imdbLogo(id));
		meta.appendChild(imdbRating(id, rating));
	}
}