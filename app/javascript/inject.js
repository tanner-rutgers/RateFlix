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

// NEW FUNCTION
function expirationSpan() {
	var span = document.createElement("SPAN");
	span.className = "expiration";
	return span;
}

// NEW FUNCTION
function expirationNode() {
	var span = expirationSpan();
	var image = document.createElement("IMG");
	image.src = chrome.extension.getURL("images/expiration.png");
	image.className = "expLogo";
	span.appendChild(image);
	return span;
}

function expDateNode(rating) {
	var span = expirationSpan();
	var rating = document.createTextNode(rating);
	span.appendChild(rating);
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

function injectRatings(node, ratings, exp) {
	var imdbRating = ratings["imdb"];
	var imdbId = ratings["imdbID"];
	var rtRating = ratings["rt"];
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
		if (rtRating && !node.querySelector(".rtRating")) {
			node.appendChild(rtLogoNode());
			node.appendChild(rtRatingNode(rtRating));
		}
		if (metascore && metascore != "N/A" && !node.querySelector(".metacriticRating")) {
			node.appendChild(metacriticLogoNode());
			node.appendChild(metacriticRatingNode(metascore));
		}
		if (exp != "N/A"){
			node.appendChild(expirationNode());
			node.appendChild(expDateNode("Expiring " + exp));
		}
	}
}