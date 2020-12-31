import DateModel from './date';
import DictionaryModel from './dictionary';
import RangeModel from './range';
import TextModel from './text';

const factories = {
  '1': TextModel,
  '2': RangeModel,
  '3': DictionaryModel,
  '4': DateModel
};

export default function fieldModelFactory(field) {
  return factories[field.type](field);
}
