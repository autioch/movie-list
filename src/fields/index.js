import DateView from './types/date/view';
import DictionaryView from './types/dictionary/view';
import RangeView from './types/range/view';
import TextView from './types/text/view';
import './style.scss';

const types = {
  '1': TextView,
  '2': RangeView,
  '3': DictionaryView,
  '4': DateView
};

export default function Fields({ appModel }) {
  return (
    <div className="field-list">
      {appModel
        .query()
        .fields
        .filter((field) => !field.config.hidden)
        .map((field, index) => {
          const View = types[field.type];

          return <View {...field.query()} key={index}/>;
        })}
    </div>
  );
}
