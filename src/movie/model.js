const { ItemModel } = require('core');
const subtitlesMap = require('./subtitlesMap');
const uniq = require('../core/uniq');

const ROUND_AMOUNT = 1000;
const LEVEL_SIZE = 20;

const RATINGS = {

  /* General Audiences */
  'G': 5,
  'TV-G': 5,

  /* Parental Guidance Suggested */
  'PG': 4,
  'TV-PG': 4,

  /* Parents Strongly Cautioned */
  'PG-13': 3,

  /* Restricted */
  'R': 2,

  /* Adults Only */
  'NC-17': 1
};

module.exports = ItemModel.extend({
  initialize() {
    if (this.rated) {
      this.ratedLevel = RATINGS[this.rated] || 0;
    } else {
      this.rated = 'N/A';
      this.ratedLevel = 0;
    }
    if (this.metascore) {
      this.metascoreLevel = this.getLevel(this.metascore);
    }
    if (this.imdbRating) {
      this.imdbRatingLevel = this.getLevel(this.imdbRating);
      this.imdbRatingRounded = this.imdbRating / 10;
    }
    if (this.imdbVotes) {
      this.imdbVotesRounded = this.roundValue(this.imdbVotes);
    }
    if (!this.genre || !this.genre.length) {
      this.genre = null;
    }
    if (!this.actors || !this.actors.length) {
      this.actors = null;
    } else {
      this.actors = this.actors.sort();
    }
    if (!this.director || !this.director.length) {
      this.director = null;
    } else {
      this.director = this.director.sort();
    }
    if (!this.writer || !this.writer.length) {
      this.writer = null;
    } else {
      this.writer = this.writer.map((writer) => writer.replace(/\([^)]+\)/, '').trim()).sort();
    }
    if (!this.subtitles || !this.subtitles.length) {
      this.subtitles = null;
    } else {
      this.subtitles = uniq(this.subtitles.map((sub) => subtitlesMap[sub] || 'Other').sort());
    }
  },
  getLevel(value) {
    return Math.ceil(value / LEVEL_SIZE);
  },
  roundValue(value) {
    if (value > ROUND_AMOUNT) {
      return `${Math.ceil(value / ROUND_AMOUNT)}K`;
    }

    return value;
  }
});
