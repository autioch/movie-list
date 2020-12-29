import DateModel from './date/model';
import DictionaryModel from './dictionary/model';
import RangeModel from './range/model';
import TextModel from './text/model';

const factories = {
  '1': TextModel,
  '2': RangeModel,
  '3': DictionaryModel,
  '4': DateModel
};

export default function fieldModelFactory(field, appModel) {
  return factories[field.type](field, appModel);
}
