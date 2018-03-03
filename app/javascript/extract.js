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