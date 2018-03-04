var OMDB_URL = 'https://www.omdbapi.com/?';
var API_KEY = "placeholder";

var fetchedCache = {};
var fetchingCache = {};

function fetchRatings(title, season, episode, year, callback) {
	argsString = Array.from(arguments).slice(0, 4).join(", ");
	var cacheKey = hashKey(title, season, episode, year);
	if (fetchedCache[cacheKey]) {
		log("Cached ratings for " + argsString);
		callback(fetchedCache[cacheKey])
	} else if (!fetchingCache[cacheKey]) {
		log("Fetching ratings for " + argsString);
		fetchingCache[cacheKey] = true;
		$.getJSON(OMDB_URL, requestOptions(title, season, episode, year), function(response) {
			if (!response.imdbRating && year) {
				log("Failed to fetch ratings for " + argsString)
				fetchRatings(title, season, episode, null, callback);
			}
			var ratings = {
				imdb: response.imdbRating,
				imdbID: response.imdbID,
				rt: fetchRTRating(response),
				metacritic: response.Metascore
			}
			fetchedCache[cacheKey] = ratings;
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

function requestOptions(title, season, episode, year) {
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
	if (year) {
		options["y"] = year;
	}
	return options;
}

function hashKey(title, season, episode, year) {
	return "Title:" + title + "&Season:" + season + "&Episode:" + episode + "&Year:" + year;
}