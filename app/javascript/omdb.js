var OMDB_URL = 'https://www.omdbapi.com/?';
var API_KEY = "placeholder";
var TIMEOUT = 3000;

var fetchedCache = {};
var fetchingCache = {};

function fetchRatings(title, season, episode, year, callback) {
	argsString = Array.from(arguments).slice(0, 4).join(", ");
	var cacheKey = hashKey(title, season, episode, year);
	if (fetchedCache[cacheKey]) {
		log("Cached ratings for " + argsString);
		callback(fetchedCache[cacheKey]);
	} else if (!fetchingCache[cacheKey]) {
		log("Fetching ratings for " + argsString);
		fetchingCache[cacheKey] = true;
		$.ajax({
			url: OMDB_URL,
			dataType: 'json',
			data: requestOptions(title, season, episode, year),
			success: function(response) {
				if (!response.imdbRating && year) {
					log("Failed to fetch ratings for " + argsString);
					delete fetchingCache[cacheKey];
					return fetchRatings(title, season, episode, null, callback);
				}
				var ratings = {
					imdb: response.imdbRating,
					imdbID: response.imdbID,
					rt: fetchRTRating(response),
					metacritic: response.Metascore
				}
				log("Fetched ratings for " + argsString + ": " + JSON.stringify(ratings));
				fetchedCache[cacheKey] = ratings;
				callback(ratings);
			},
			error: function(jqXHR, status, errorThrown) {
				if (status == "timeout") {
					log("Failed to fetch ratings for " + argsString + " due to timeout");
					delete fetchingCache[cacheKey];
					fetchRatings(title, season, episode, null, callback);
				}
			},
			timeout: TIMEOUT
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