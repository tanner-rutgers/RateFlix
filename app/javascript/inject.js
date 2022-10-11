function imdbLink(id) {
	var link = document.createElement("a");
	link.href = "https://www.imdb.com/title/" + id;
	link.target = "_blank";
	link.id = "rateflix--imdbRating";
	return link;
}

function injectRating(rating, ratingsDiv, icon) {
	if (rating && rating != "N/A") {
		var icon = document.createElement("img");
		icon.src = chrome.runtime.getURL(icon)
		icon.className = "rateflix--icon";

		var rating = document.createTextNode(rating);

		var span = document.createElement("span");
		span.className = "rateflix--ratings-span"
		span.appendChild(icon);
		span.appendChild(rating);
		
		ratingsDiv.appendChild(span);
	}
}

function injectRatings(node, ratings) {
	if (!node.querySelector("#rateflix--ratings")) {
		ratingsDiv = document.createElement("div");
		ratingsDiv.style.opacity = 1;
		ratingsDiv.id = "rateflix--ratings";

		injectRating(ratings["imdb"], ratingsDiv, "images/imdb_31x14.png")
		injectRating(ratings["rt"], ratingsDiv, "images/rt_logo.png")
		injectRating(ratings["metacritic"], ratingsDiv, "images/metacritic_logo.png")

		node.appendChild(ratingsDiv);
	}
}
