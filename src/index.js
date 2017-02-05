const App = require('./app');
const videos = require('./data.json');

/* TODO move this. */
videos.forEach((video) => {
  if (video.imdbRating) {
    video.imdbRating_view = video.imdbRating / 10;
  }
  if (video.imdbVotes) {
    if (video.imdbVotes > 1000) {
      video.imdbVotes_view = `${Math.round(video.imdbVotes / 1000) }K`;
    } else {
      video.imdbVotes_view = video.imdbVotes;
    }
  }
});

require('./view')(new App(videos, require('./fields')));
