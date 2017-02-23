var OMDB_URL = 'https://www.omdbapi.com/?';

var cache = {};

function fetchRatings(title, callback) {
	if (cache[title]) {
		callback(cache[title])
	} else {
		$.getJSON(OMDB_URL, requestOptions(title), function(response) {
			ratings = {
				imdb: response.imdbRating,
				imdbID: response.imdbID
			}
			cache[title] = ratings;
			callback(ratings);
		});
	}
}

function requestOptions(title) {
	return {
		t: title
	}
}