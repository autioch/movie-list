import DateView from './date';
import DictionaryView from './dictionary';
import RangeView from './range';
import TextView from './text';
import { TYPES } from '../../../consts';

const TYPE_VIEWS = {
  [TYPES.TEXT]: TextView,
  [TYPES.RANGE]: RangeView,
  [TYPES.DICTIONARY]: DictionaryView,
  [TYPES.DATE]: DateView
};

export default TYPE_VIEWS;
