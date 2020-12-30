import DateView from './date/view';
import DictionaryView from './dictionary/view';
import RangeView from './range/view';
import TextView from './text/view';
import './style.scss';

const types = {
  '1': TextView,
  '2': RangeView,
  '3': DictionaryView,
  '4': DateView
};

export default function Filters({ filters }) {
  return (
    <div className="field-list">
      {filters.map((filter, index) => {
        const View = types[filter.type];
        const { value, label, order, id, setSort } = filter;

        return (
          <section key={id} className={`field${value.length > 0 ? 'is-filter-active' : ''}`}>
            <div className="field__sort t-label" onClick={setSort} title={`Sort by ${label}`}>
              <span className="field__sort-text">{label}</span>
              <span className={`field__sort-icon t-btn is-${order}`}></span>
            </div>
            <View {...filter} key={index}/>
          </section>
        );
      })}
    </div>
  );
}
