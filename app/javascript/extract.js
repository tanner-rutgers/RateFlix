function extractSeasonNumber(seasonText) {
  var regex = /(S|s)eason (\d+)/
  var match = regex.exec(seasonText);
  if (match) {
    return match[2];
  }
  return null;
}

function extractEpisodeInfo(episodeText) {
  var info = {};
  if (episodeText) {
    var regex = /\D*(\d+)\D*(\d+)/
    var match = regex.exec(episodeText);
    info["season"] = match[1];
    info["episode"] = match[2];
  }
  return info;
}

function extractYear(containerNode) {
  yearNode = containerNode.querySelector(".year");
  year = yearNode ? yearNode.textContent : null;

  // Try to guess first year of TV show (Netflix usually uses last season year)
  durationNode = containerNode.querySelector(".duration");
  if (durationNode) {
    if (match = /(\d+) Seasons?/.exec(durationNode.textContent)) {
      log("Year was " + year);
      log("Match is " + match[1]);
      year = year - (match[1] - 1);
      log("Guessing " + year);
    }
  }

  return year;
}