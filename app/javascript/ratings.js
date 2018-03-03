var lastTitle = "";

function getRatings(title, season, episode, callback) {
  if (title.length && !lastTitle || lastTitle == title || !title.endsWith(lastTitle)) {
    lastTitle = title;
    fetchRatings(title, season, episode, function(ratings) {
      callback(ratings);
    });
  }
}