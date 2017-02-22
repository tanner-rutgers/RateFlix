var OMDB_URL = 'https://www.omdbapi.com/?';

function fetchRatings(title, callback) {
	$.getJSON(OMDB_URL, requestOptions(title), function(response) {
		ratings = {
			imdb: response.imdbRating,
			imdbID: response.imdbID
		}
		callback(ratings);
	});
}

function requestOptions(title) {
	return {
		t: title
	}
}