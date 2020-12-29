import ResetButton from '../resetButton';
import Header from '../header';
import './style.scss';

export default function DictionaryView({ id, label, value, order, options, setValue, setSort }) {
  return (
    <section className={`field${value.length > 0 ? 'is-filter-active' : ''}`}>
      <Header label={label} order={order} setSort={() => setSort(id)} />
      <div className="field__filter">
        <select
          value={value}
          className="field-dictionary__select t-input"
          title={`Filter by ${label}`}
          onChange={(ev) => setValue(ev.target.value)}
        >
          {options.map((option, index) => <option key={index}>{option}</option>)}
        </select>
        <ResetButton label={label} onClick={() => setValue(id, undefined)} />
      </div>
    </section>
  );
}
