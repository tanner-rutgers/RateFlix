var lastTitle = "";

function getRatings(title, season, episode, year, callback) {
  if (title.length && !lastTitle || lastTitle == title || !title.endsWith(lastTitle)) {
    lastTitle = title;
    fetchRatings(title, season, episode, year, function(ratings) {
      callback(ratings);
    });
  }
}