import ResetButton from '../resetButton';
import TextInput from '../textInput';
import Header from '../header';
import './style.scss';

export default function DateView({ id, label, value: { fromDate, toDate }, order, setValue, setSort }) {
  return (
    <section className={`field${fromDate.length > 0 || toDate.length > 0 ? 'is-filter-active' : ''}`}>
      <Header label={label} order={order} setSort={() => setSort(id)} />
      <div className="field__filter">
        <span className="field-date__text t-hint">From</span>
        <TextInput
          className="field-date__input"
          value={fromDate}
          title={`Set minimum ${label}`}
          placeholder="2016-12-31"
          onKeyUp={(ev) => setValue(id, {
            fromDate: ev.target.value,
            toDate
          })}
        />
        <span className="field-date__text t-hint">To</span>
        <TextInput
          className="field-date__input"
          value={toDate}
          title={`Set maximum ${label}`}
          placeholder="2016-12-31"
          onKeyUp={(ev) => setValue(id, {
            fromDate,
            toDate: ev.target.value
          })}
        />
        <ResetButton label={label} onClick={() => setValue(id, {
          fromDate: '',
          toDate: ''
        })} />
      </div>
    </section>
  );
}
