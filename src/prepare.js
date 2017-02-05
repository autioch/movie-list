const { RATINGS, PERCENT } = require('./config');

module.exports = function prepare(videos) {
  videos.forEach((video) => {
    if (video.rated) {
      video.ratedLevel = RATINGS[video.rated];
    }
    if (video.metascore) {
      video.metascoreLevel = Math.ceil((PERCENT - video.metascore) / 20);
    }
    if (video.imdbRating) {
      video.imdbRatingLevel = Math.ceil((PERCENT - video.imdbRating) / 20);
      video.imdbRatingRounded = video.imdbRating / 10;
    }
    if (video.imdbVotes) {
      if (video.imdbVotes > 1000) {
        video.imdbVotesRounded = `${Math.ceil(video.imdbVotes / 1000) }K`;
      } else {
        video.imdbVotesRounded = video.imdbVotes;
      }
    }
  });

  return videos;
};
