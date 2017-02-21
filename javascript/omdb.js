var OMDB_URL = 'https://www.omdbapi.com/?';

function getRatings(title, year) {
	$.getJSON(OMDB_URL, requestOptions(title, year), function(response) {
		ratings = {
			imdb: response.imdbRating,
			imdbID: response.imdbID
		}
		console.log("Ratings: " + JSON.stringify(ratings));
		injectRatings(ratings);
	});
}

function requestOptions(title, year) {
	return {
		t: title
	}
}