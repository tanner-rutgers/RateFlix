var OMDB_URL = 'https://www.omdbapi.com/?';
var API_KEY = "placeholder";

var cache = {};

function fetchRatings(info, callback) {
	var cacheKey = JSON.stringify(info);
	if (cache[cacheKey]) {
		callback(cache[cacheKey])
	} else {
		$.getJSON(OMDB_URL, requestOptions(info), function(response) {
			var ratings = {
				imdb: response.imdbRating,
				imdbID: response.imdbID,
				rt: fetchRTRating(response)
			}
			cache[cacheKey] = ratings;
			callback(ratings);
		});
	}
}

function fetchRTRating(response) {
	var ratingsArray = response["Ratings"];
	if (ratingsArray) {
		var rtRating = ratingsArray.find(rtFilter);
		if (rtRating) {
			return rtRating["Value"];
		}
	}
}

function rtFilter(rating) {
	return rating["Source"] == "Rotten Tomatoes";
}

function requestOptions(info) {
	var options = {
		"apikey": API_KEY
	};
	if (info["title"]) {
		options["t"] = info["title"];
	}
	if (info["year"]) {
		options["y"] = info["year"];
	}
	if (info["season"]) {
		options["Season"] = info["season"];
	}
	if (info["episode"]) {
		options["Episode"] = info["episode"];
	}
	return options;
}