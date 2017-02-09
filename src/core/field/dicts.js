const TYPES = {
  TEXT: 1,
  RANGE: 2,
  DICTIONARY: 3
};

module.exports = Object.freeze({
  TYPES,
  TYPE_NAMES: {
    [TYPES.TEXT]: 'Text',
    [TYPES.RANGE]: 'Range',
    [TYPES.DICTIONARY]: 'Dictionary'
  }
});
