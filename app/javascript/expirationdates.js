var EXP_NETFLIX_URL = 'https://www.whats-on-netflix.com/leaving-soon/';
var TIMEOUT = 3000;

var expiredMovies = new Map();

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var today = new Date();
var year = today.getFullYear();
var month = monthNames[today.getMonth()];
var current_url = EXP_NETFLIX_URL + 'titles-leaving-netflix-in-' + month + '-' + year + '/';
var query_url = month + '-' + year + '/'

var expFetchCache = {};
var expFetchingCache = {};

chrome.runtime.sendMessage({contentScriptQuery: "queryExpDates", queryDate: query_url},
    function(response) {
      debugger;
       expiredMovies = response;
    }
);

function getExpiredMovies() {
  return expiredMovies;
}

// function populateTitles(callback) {
// 	var cacheKey = hashKey(title);
// 	if (expFetchedCache[cacheKey]) {
// 		log("Cached expiration dates for " + cacheKey);
// 		callback(expFetchedCache[cacheKey]);
// 	} else if (!expFetchingCache[cacheKey]) {
// 		log("Fetching expiration dates for " + argsString);
// 		expfetchingCache[cacheKey] = true;
// 		$.ajax({
// 			url: current_url,
// 			dataType: 'jsonp',
// 			success: function(response) {
// 				if (!response.imdbRating && year) {
// 					log("Failed to fetch ratings for " + argsString);
// 					delete expFetchingCache[cacheKey];
// 					return fetchRatings(title, season, episode, null, callback);
// 				}
// 				var ratings = {
// 					imdb: response.imdbRating,
// 					imdbID: response.imdbID,
// 					rt: fetchRTRating(response),
// 					metacritic: response.Metascore
// 				}
// 				log("Fetched ratings for " + argsString + ": " + JSON.stringify(ratings));
// 				fetchedCache[cacheKey] = ratings;
// 				callback(ratings);
// 			},
// 			error: function(jqXHR, status, errorThrown) {
// 				if (status == "timeout") {
// 					log("Failed to fetch ratings for " + argsString + " due to timeout");
// 					delete fetchingCache[cacheKey];
// 					fetchExpDates(title, season, episode, null, callback);
// 				}
// 			},
// 			timeout: TIMEOUT
// 		});
// 	}
// }
