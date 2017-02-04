const ORDER = {
  NONE: 0,
  DESC: 1,
  ASC: -1
};

module.exports = {
  FIELDS: ['title', 'genre', 'plot', 'year', 'rated', 'duration', 'metascore', 'imdbRating', 'imdbVotes'],
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
  }
};
