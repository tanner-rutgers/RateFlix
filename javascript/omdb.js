var OMDB_URL = 'https://www.omdbapi.com/?';

var cache = {};

function fetchRatings(title, season, episode, callback) {
	var cacheKey = hashKey(title, season, episode);
	if (cache[cacheKey]) {
		callback(cache[cacheKey])
	} else {
		$.getJSON(OMDB_URL, requestOptions(title, season, episode), function(response) {
			ratings = {
				imdb: response.imdbRating,
				imdbID: response.imdbID
			}
			cache[cacheKey] = ratings;
			callback(ratings);
		});
	}
}

function requestOptions(title, season, episode) {
	options = {};
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