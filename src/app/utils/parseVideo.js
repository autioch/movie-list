const seconds = 60;

const sizes = 1024;
const mb = sizes * sizes;
const votesRegex = /\./g;

function parseMetascore(metascore) {
  return (metascore && metascore != 'N/A') ? parseInt(metascore, 10) : undefined;
}

function parseImdbRating(imdbrating) {
  return (imdbrating && imdbrating != 'N/A') ? parseInt(imdbrating, 10) : undefined;
}

function parseImdbVotes(imdbvotes) {
  return (imdbvotes && imdbvotes != 'N/A') ? parseInt(imdbvotes.replace(votesRegex, ''), 10) : undefined;
}

module.exports = function parseVideo(video) {
  const { omdb = {}, ffmpeg = {} } = video;

  return {
    name: video.name,
    genre: omdb.genre,
    plot: omdb.plot && omdb.plot != 'N/A' ? omdb.plot : undefined,
    rated: omdb.rated && omdb.rated != 'N/A' ? omdb.rated : undefined,
    duration: ffmpeg.duration ? Math.floor(ffmpeg.duration / seconds) : undefined,
    year: parseInt(video.year, 10),
    director: omdb.director,
    metascore: parseMetascore(omdb.metascore),
    imdbRating: parseImdbRating(omdb.imdbrating),
    imdbVotes: parseImdbVotes(omdb.imdbvotes),
    size: Math.floor(video.size / mb),
    errors: video.errors || []
  };
};
