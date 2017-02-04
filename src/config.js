const ORDER = {
  NONE: 0,
  DESC: 1,
  ASC: -1
};

module.exports = {
  FIELDS: [{
    key: 'year',
    size: 25
  }, {
    key: 'title',
    size: 100
  }, {
    key: 'genre',
    size: 100
  }, {
    key: 'plot',
    size: 100
  }, {
    key: 'rated',
    size: 25
  }, {
    key: 'duration',
    size: 25
  }, {
    key: 'metascore',
    size: 25
  }, {
    key: 'imdbRating',
    size: 25
  }, {
    key: 'imdbVotes',
    size: 50
  }],
  ORDER,
  ORDER_INVERSION: {
    [ORDER.NONE]: ORDER.DESC,
    [ORDER.DESC]: ORDER.ASC,
    [ORDER.ASC]: ORDER.DESC
  },
  ORDER_ICON: {
    [ORDER.NONE]: '--',
    [ORDER.DESC]: '\\/',
    [ORDER.ASC]: '/\\'
  },

  /* Field types */
  TYPE: { STRING: 1 },

  /* Default size */
  SIZE: 100
};
