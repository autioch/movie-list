import ResetButton from '../resetButton';
import Header from '../header';
import './style.scss';

export default function TextView({ id, label, value, order, setValue, setSort }) {
  return (
    <section className={`field${value.length > 0 ? 'is-filter-active' : ''}`}>
      <Header label={label} order={order} setSort={() => setSort(id)} />
      <div className="field__filter">
        <input
          className="field-text__input t-input"
          onChange={(ev) => setValue(id, ev.target.value)}
          type="text"
          value={value}
          title={`Reset ${label} filter`}
        />
        <ResetButton label={label} onClick={() => setValue(id, '')} />
      </div>
    </section>
  );
}
