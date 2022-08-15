function imdbLink(id) {
	var link = document.createElement("a");
	link.href = "https://www.imdb.com/title/" + id;
	link.target = "_blank";
	link.id = "imdbRating";
	return link;
}

function injectImdbRating(ratingsDiv, ratings) {
	var rating = ratings["imdb"];
	var id = ratings["imdbID"];

	if ((rating && rating != "N/A") || id) {
		var logo = document.createElement("img");
		logo.src = chrome.extension.getURL("images/imdb_31x14.png");
		logo.className = "imdbLogo";
		logo.style.paddingRight = "0.5vw";

		var span = document.createElement("span");
		span.appendChild(logo);

		if (rating && rating != "N/A") {
			var rating = document.createTextNode(rating);
			span.appendChild(rating);
		}

		if (id) {
			link = imdbLink(id);
			link.style.paddingRight = "1vw";
			link.appendChild(span);
			ratingsDiv.appendChild(link);
		} else {
			span.style.paddingRight = "1vw";
			ratingsDiv.appendChild(span);
		}
	}
}

function injectRtRating(ratingsDiv, ratings) {
	var rating = ratings["rt"];

	if (rating && rating != "N/A") {
		var logo = document.createElement("img");
		logo.src = chrome.extension.getURL("images/rt_logo.png");
		logo.className = "rtLogo";
		logo.style.paddingRight = "0.5vw";

		var rating = document.createTextNode(rating);

		var span = document.createElement("span");
		span.style.paddingRight = "1vw";
		span.appendChild(logo);
		span.appendChild(rating);
		
		ratingsDiv.appendChild(span);
	}
}

function injectMetascoreRating(ratingsDiv, ratings) {
	var rating = ratings["metacritic"];

	if (rating && rating != "N/A") {
		var logo = document.createElement("img");
		logo.src = chrome.extension.getURL("images/metacritic_logo.png")
		logo.className = "metacriticLogo";
		logo.style.paddingRight = "0.5vw";

		var rating = document.createTextNode(rating);

		var span = document.createElement("span");
		span.style.paddingRight = "1vw";
		span.appendChild(logo);
		span.appendChild(rating);
		
		ratingsDiv.appendChild(span);
	}
}

function injectRatings(node, ratings) {
	if (!node.querySelector("#rateFlixRatings")) {
		ratingsDiv = document.createElement("div");
		ratingsDiv.style.opacity = 1;
		ratingsDiv.id = "rateFlixRatings";

		injectImdbRating(ratingsDiv, ratings);
		injectRtRating(ratingsDiv, ratings);
		injectMetascoreRating(ratingsDiv, ratings);

		node.appendChild(ratingsDiv);
	}
}
