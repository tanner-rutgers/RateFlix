var OMDB_URL = 'https://www.omdbapi.com/?';

var cache = {};

function fetchRatings(title, season, episode, callback) {
	if (cache[title]) {
		callback(cache[title])
	} else {
		$.getJSON(OMDB_URL, requestOptions(title, season, episode), function(response) {
			ratings = {
				imdb: response.imdbRating,
				imdbID: response.imdbID
			}
			cache[title] = ratings;
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