const subtitlesMap = require('./subtitlesMap');
const ratingsMap = require('./ratingsMap');
const uniq = require('../../core/uniq');

const ROUND_AMOUNT = 1000;
const LEVEL_SIZE = 20;

function getLevel(value) {
  return Math.ceil(value / LEVEL_SIZE);
}

function roundValue(value) {
  if (value > ROUND_AMOUNT) {
    return `${Math.ceil(value / ROUND_AMOUNT)}K`;
  }

  return value;
}

module.exports = function itemParser(item) {
  if (item.rated) {
    item.ratedLevel = ratingsMap[item.rated] || 0;
  } else {
    item.rated = 'N/A';
    item.ratedLevel = 0;
  }
  if (item.errors) {
    item.errors = item.errors.map((error) => error.label);
  } else {
    item.errors = [];
  }
  if (item.metascore) {
    item.metascoreLevel = getLevel(item.metascore);
  }
  if (item.imdbRating) {
    item.imdbRatingLevel = getLevel(item.imdbRating);
    item.imdbRatingRounded = item.imdbRating / 10;
  }
  if (item.imdbVotes) {
    item.imdbVotesRounded = roundValue(item.imdbVotes);
  }
  if (!item.genre || !item.genre.length) {
    item.genre = null;
  }
  if (!item.actors || !item.actors.length) {
    item.actors = null;
  } else {
    item.actors = item.actors.sort();
  }
  if (!item.director || !item.director.length) {
    item.director = null;
  } else {
    item.director = item.director.sort();
  }
  if (!item.writer || !item.writer.length) {
    item.writer = null;
  } else {
    item.writer = item.writer.map((writer) => writer.replace(/\([^)]+\)/, '').trim()).sort();
  }
  if (!item.subtitles || !item.subtitles.length) {
    item.subtitles = null;
  } else {
    item.subtitles = uniq(item.subtitles.map((sub) => subtitlesMap[sub] || 'Other').sort());
  }

  return item;
};
