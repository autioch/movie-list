export const HTTP_OK = 200;
export const HTTP_ERROR = 400;

export const ORDER = {
  NONE: 0,
  DESC: 1,
  ASC: -1
};

export const ORDER_NEXT = {
  [ORDER.NONE]: ORDER.DESC,
  [ORDER.DESC]: ORDER.ASC,
  [ORDER.ASC]: ORDER.NONE,
  [undefined]: ORDER.DESC
};

export const RANK_LEVELS = [0, 1, 2, 3, 4, 5]; // eslint-disable-line no-magic-numbers

export const EMPTY = undefined;
export const NO_VALUE = undefined;

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

export const EQUAL = 0;
export const ITEM_1_LATER = 1;
export const ITEM_2_LATER = -1;

export const ROUTES = {
  ABOUT: '/about',
  FILTER_LIST: '/filterList',
  ITEM_LIST: '/',
  SETTINGS: '/settings',
  STAT_LIST: '/statList'
};

export const ROUTE_LABELS = {
  [ROUTES.FILTER_LIST]: 'Apply filters',
  [ROUTES.STAT_LIST]: 'Statistics',
  [ROUTES.ABOUT]: 'FAQ',
  [ROUTES.SETTINGS]: 'Settings'
};
