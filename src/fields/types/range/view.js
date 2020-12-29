import ResetButton from '../resetButton';
import TextInput from '../textInput';
import Header from '../header';
import './style.scss';

export default function RangeView({ id, label, value: { fromValue, toValue }, order, setValue, setSort }) {
  return (
    <section className={`field${fromValue.length > 0 || toValue.length > 0 ? 'is-filter-active' : ''}`}>
      <Header label={label} order={order} setSort={() => setSort(id)} />
      <div className="field__filter">
        <span className="field-date__text t-hint">From</span>
        <TextInput
          className="field-date__input"
          value={fromValue}
          title={`Set minimum ${label}`}
          placeholder="2016-12-31"
          onKeyUp={(ev) => setValue(id, {
            fromValue: ev.target.value,
            toValue
          })}
        />
        <span className="field-date__text t-hint">To</span>
        <TextInput
          className="field-date__input"
          value={toValue}
          title={`Set maximum ${label}`}
          placeholder="2016-12-31"
          onKeyUp={(ev) => setValue(id, {
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
