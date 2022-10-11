function imdbLink(id) {
	if (id) {
		var link = document.createElement("a");
		link.href = "https://www.imdb.com/title/" + id;
		link.target = "_blank";
		link.id = "rateflix--imdbRating";
		return link;
	}
}

function injectRating(ratingsDiv, rating, icon_location, link) {
	if ((rating && rating != "N/A") || link) {
		var icon = document.createElement("img");
		icon.src = chrome.runtime.getURL(icon_location);
		icon.className = "rateflix--icon";

		var span = document.createElement("span");
		span.className = "rateflix--ratings-span"
		span.appendChild(icon);

		if (rating && rating != "N/A") {
			var rating = document.createTextNode(rating);
			span.appendChild(rating);
		}

		if (link) {
			link.appendChild(span);
			ratingsDiv.appendChild(link);
		} else {
			ratingsDiv.appendChild(span);
		}
	}
}

function injectRatings(node, ratings) {
	if (!node.querySelector("#rateflix--ratings")) {
		ratingsDiv = document.createElement("div");
		ratingsDiv.style.opacity = 1;
		ratingsDiv.id = "rateflix--ratings";

		injectRating(ratingsDiv, ratings["imdb"], "images/imdb_31x14.png", imdbLink(ratings["imdbId"]))
		injectRating(ratingsDiv, ratings["rt"], "images/rt_logo.png", null)
		injectRating(ratingsDiv, ratings["metacritic"], "images/metacritic_logo.png", null)

		node.appendChild(ratingsDiv);
	}
}
