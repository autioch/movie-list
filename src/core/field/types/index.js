const TYPES = {
  TEXT: 1,
  RANGE: 2,
  DICTIONARY: 3
};

module.exports = {
  [TYPES.TEXT]: require('./text'),
  [TYPES.RANGE]: require('./range'),
  [TYPES.DICTIONARY]: require('./dictionary')
};
