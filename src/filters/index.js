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

export default function Filters({ filters, resetFilter, setFilterValue, setSort }) {
  return (
    <div className="field-list">
      {filters.map((filter) => {
        const View = types[filter.type];
        const { id, label, order, isApplied } = filter;

        return (
          <section key={id} className={`field${isApplied ? ' is-filter-active' : ''}`}>
            <div className="field__sort t-label" onClick={() => setSort(id)} title={`Sort by ${label}`}>
              <span className="field__sort-text">{label}</span>
              <span className={`field__sort-icon t-btn is-sort-${order}`}></span>
            </div>
            <View filter={filter} setFilterValue={setFilterValue}>
              <span
                className="field__filter-reset t-btn"
                title={`Reset ${label} filter`}
                onClick={() => resetFilter(id)}
              >
              </span>
            </View>
          </section>
        );
      })}
    </div>
  );
}
