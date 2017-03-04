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
	image.className = "imdbLogo";
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

	if (node && !node.querySelector(".imdbRating")) {
		node.appendChild(imdbLogo(id));
		node.appendChild(imdbRating(id, rating));
	}
}