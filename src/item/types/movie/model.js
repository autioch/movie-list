const AbstractModel = require('../abstract/model');
const { RATINGS, PERCENT } = require('config');

const ROUND_AMOUNT = 1000;
const LEVEL_SIZE = 20;

module.exports = AbstractModel.extend({
  initialize() {
    if (this.rated) {
      this.ratedLevel = RATINGS[this.rated];
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
  },
  getLevel(value) {
    return Math.ceil((PERCENT - value) / LEVEL_SIZE);
  },
  roundValue(value) {
    if (value > ROUND_AMOUNT) {
      return `${Math.ceil(value / ROUND_AMOUNT)}K`;
    }

    return value;
  }
});
