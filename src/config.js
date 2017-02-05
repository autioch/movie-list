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
  TYPE: { STRING: 1 },

  /* Default size */
  SIZE: 100,

  /* Just 100 percent */
  PERCENT: 100
};
