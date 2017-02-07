const ORDER = {
  NONE: 0,
  DESC: 1,
  ASC: -1
};

module.exports = {
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
  TYPES: {
    STRING: 1,
    NUMBER: 2
  },

  /* Just 100 percent */
  PERCENT: 100,

  /* Rounding  */
  ROUND: 1000,

  /* MPAA ratings */
  RATINGS: {

    /* General Audiences */
    'G': 1,

    /* Parental Guidance Suggested */
    'PG': 2,

    /* Parents Strongly Cautioned */
    'PG-13': 3,

    /* Restricted */
    'R': 4,

    /* Adults Only */
    'NC-17': 5
  }
};
