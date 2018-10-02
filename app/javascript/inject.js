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

function metacriticSpan() {
	var span = document.createElement("SPAN");
	span.className = "metacriticRating";
	return span;
}

function imdbLinkNode(id) {
	var link = document.createElement("A");
	link.href = "https://www.imdb.com/title/" + id;
	link.target = "_blank";
	return link;
}

function imdbLogoNode(id) {
	var span = imdbSpan();
	var link = imdbLinkNode(id);
	var image = document.createElement("IMG");
	image.src = chrome.extension.getURL("images/imdb_31x14.png");
	image.className = "imdbLogo";
	link.appendChild(image);
	span.appendChild(link);
	return span;
}

function imdbRatingNode(id, rating) {
	rating = rating.replace("N/A", "");
	var span = imdbSpan();
	var link = imdbLinkNode(id);
	var ratingNode = document.createTextNode(rating);
	link.appendChild(ratingNode);
	span.appendChild(link);
	return span;
}

function rtLinkNode(url) {
	var link = document.createElement("A");
	link.href = "https://www.rottentomatoes.com" + url;
	link.target = "_blank";
	return link;
}

function rtLogoNode(url) {
	var span = rtSpan();
	var image = document.createElement("IMG");
	image.src = chrome.extension.getURL("images/rt_logo.png");
	image.className = "rtLogo";
	if (url) {
		var link = rtLinkNode(url);
		link.appendChild(image);
		span.appendChild(link);
	}	else {
		span.appendChild(image);
	}
	return span;
}

function rtRatingNode(url, rating) {
	var span = rtSpan();
	var ratingNode = document.createTextNode(rating);
	if (url) {
		var link = rtLinkNode(url);
		link.appendChild(ratingNode);
		span.appendChild(link);
	}	else {
		span.appendChild(ratingNode);
	}
	return span;
}

function metacriticLogoNode() {
	var span = metacriticSpan();
	var image = document.createElement("IMG");
	image.src = chrome.extension.getURL("images/metacritic_logo.png");
	image.className = "metacriticLogo";
	span.appendChild(image);
	return span;
}

function metacriticRatingNode(rating) {
	var span = metacriticSpan();
	var rating = document.createTextNode(rating);
	span.appendChild(rating);
	return span;
}

function should_append_imdb(rating, id) {
	if ((rating && rating != "N/A") || id) {
		return true;
	}
	return false;
}

function injectRatings(node, ratings) {
	var imdbRating = ratings["imdb"];
	var imdbId = ratings["imdbID"];
	var rtRating = ratings["rt"];
	var rtUrl = ratings["rtUrl"];
	var metascore = ratings["metacritic"];
	if (node) {
		if (!node.querySelector(".imdbRating")) {
			if (should_append_imdb(imdbRating, imdbId)) {
				node.appendChild(imdbLogoNode(imdbId));
				node.appendChild(imdbRatingNode(imdbId, imdbRating));
			} else {
				node.appendChild(imdbSpan());
				node.appendChild(imdbSpan());
			}
		}
		if ((rtRating || rtUrl) && !node.querySelector(".rtRating")) {
			node.appendChild(rtLogoNode(rtUrl));
			if (rtRating) {
				node.appendChild(rtRatingNode(rtUrl, rtRating))
			};
		}
		if (metascore && metascore != "N/A" && !node.querySelector(".metacriticRating")) {
			node.appendChild(metacriticLogoNode());
			node.appendChild(metacriticRatingNode(metascore));
		}
	}
}