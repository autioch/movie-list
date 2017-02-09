const { TYPES } = require('core/field/dicts');

module.exports = [{
  key: 'title',
  type: TYPES.TEXT,
  stat: false
}, {
  key: 'genre',
  type: TYPES.DICTIONARY,
  stat: false
}, {
  key: 'plot',
  type: TYPES.TEXT,
  stat: false
}, {
  key: 'year',
  type: TYPES.RANGE,
  stat: true
}, {
  key: 'rated',
  type: TYPES.DICTIONARY,
  stat: false
}, {
  key: 'duration',
  type: TYPES.RANGE,
  stat: true
}, {
  key: 'metascore',
  type: TYPES.RANGE,
  stat: true
}, {
  key: 'imdbRating',
  type: TYPES.RANGE,
  stat: true
}, {
  key: 'imdbVotes',
  type: TYPES.RANGE,
  stat: true
}];
