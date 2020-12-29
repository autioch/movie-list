import ResetButton from '../resetButton';
import Header from '../header';
import './style.scss';

export default function RangeView({ id, label, value: { fromValue, toValue }, order, setValue, setSort }) {
  return (
    <section className={`field${fromValue.length > 0 || toValue.length > 0 ? 'is-filter-active' : ''}`}>
      <Header label={label} order={order} setSort={() => setSort(id)} />
      <div className="field__filter">
        <span className="field-date__text t-hint">From</span>
        <input
          className="field-date__input t-input"
          value={fromValue}
          type="text"
          title={`Set minimum ${label}`}
          placeholder="2016-12-31"
          onChange={(ev) => setValue(id, {
            fromValue: ev.target.value,
            toValue
          })}
        />
        <span className="field-date__text t-hint">To</span>
        <input
          className="field-date__input t-input"
          value={toValue}
          type="text"
          title={`Set maximum ${label}`}
          placeholder="2016-12-31"
          onChange={(ev) => setValue(id, {
            fromValue,
            toValue: ev.target.value
          })}
        />
        <ResetButton label={label} onClick={() => setValue(id, {
          fromValue: '',
          toValue: ''
        })} />
      </div>
    </section>
  );
}
