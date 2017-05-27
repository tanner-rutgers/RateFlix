function imdbSpan() {
	var span = document.createElement("SPAN");
	span.className = "imdbRating";
	return span;
}

function rtSpan() {
	var span = document.createElement("SPAN");
	span.className = "rtRating";
	return span;
}

function imdbLinkNode(id) {
	var link = document.createElement("A");
	link.href = "https://www.imdb.com/title/" + id;
	link.target = "_blank";
	return link;
}

function imdbLogoNode(id) {
	var span = imdbSpan(id);
	var link = imdbLinkNode(id);
	var image = document.createElement("IMG");
	image.src = chrome.extension.getURL("images/imdb_31x14.png");
	image.className = "imdbLogo";
	link.appendChild(image);
	span.appendChild(link);
	return span;
}

function imdbRatingNode(id, rating) {
	var span = imdbSpan();
	var link = imdbLinkNode(id);
	var rating = document.createTextNode(rating);
	link.appendChild(rating);
	span.appendChild(link);
	return span;
}

function rtLogoNode() {
	var span = rtSpan();
	var image = document.createElement("IMG");
	image.src = chrome.extension.getURL("images/rt_logo.png");
	image.className = "rtLogo";
	span.appendChild(image);
	return span;
}

function rtRatingNode(rating) {
	var span = rtSpan();
	var rating = document.createTextNode(rating);
	span.appendChild(rating);
	return span;
}

function injectRatings(node, ratings) {
	var imdbRating = ratings["imdb"];
	var imdbId = ratings["imdbID"];
	var rtRating = ratings["rt"];

	if (node) {
		if (imdbRating && !node.querySelector(".imdbRating")) {
			node.appendChild(imdbLogoNode(imdbId));
			node.appendChild(imdbRatingNode(imdbId, imdbRating));
		}
		if (rtRating && !node.querySelector(".rtRating")) {
			node.appendChild(rtLogoNode());
			node.appendChild(rtRatingNode(rtRating));
		}
	}
}