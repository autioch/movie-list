export const ORDER = {
  NONE: 0,
  DESC: 1,
  ASC: -1
};

export const ORDER_INVERSION = {
  [ORDER.NONE]: ORDER.DESC,
  [ORDER.DESC]: ORDER.ASC,
  [ORDER.ASC]: ORDER.DESC
};

export const EMPTY = undefined;

export const TYPES = {
  TEXT: '1',
  RANGE: '2',
  DICTIONARY: '3',
  DATE: '4'
};

export const IGNORED = {
  undefined: true,
  'null': true,
  'N/A': true
};
