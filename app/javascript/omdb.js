var OMDB_URL = 'https://www.omdbapi.com/?';
var API_KEY = "placeholder";

var cache = {};

function fetchRatings(title, season, episode, callback) {
	var cacheKey = hashKey(title, season, episode);
	if (cache[cacheKey]) {
		callback(cache[cacheKey])
	} else {
		$.getJSON(OMDB_URL, requestOptions(title, season, episode), function(response) {
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

function requestOptions(title, season, episode) {
	var options = {
		"apikey": API_KEY
	};
	if (title) {
		options["t"] = title;
	}
	if (season) {
		options["Season"] = season;
	}
	if (episode) {
		options["Episode"] = episode;
	}
	return options;
}

function hashKey(title, season, episode) {
	return "Title:" + title + "Season:" + season + "Episode:" + episode;
}