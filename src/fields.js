const { TYPES } = require('./config');

module.exports = [{
  key: 'title',
  type: TYPES.TEXT
}, {
  key: 'genre',
  type: TYPES.TEXT
}, {
  key: 'plot',
  type: TYPES.TEXT
}, {
  key: 'year',
  type: TYPES.RANGE
}, {
  key: 'rated',
  type: TYPES.TEXT
}, {
  key: 'duration',
  type: TYPES.RANGE
}, {
  key: 'metascore',
  type: TYPES.RANGE
}, {
  key: 'imdbRating',
  type: TYPES.RANGE
}, {
  key: 'imdbVotes',
  type: TYPES.RANGE
}];
