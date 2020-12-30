import ResetButton from '../resetButton';
import './style.scss';

export default function DateView({ id, label, value: { fromDate, toDate }, setValue }) {
  return (
    <div className="field__filter">
      <span className="field-date__text t-hint">From</span>
      <input
        className="field-date__input t-input"
        type="text"
        value={fromDate}
        title={`Set minimum ${label}`}
        placeholder="2016-12-31"
        onChange={(ev) => setValue(id, {
          fromDate: ev.target.value,
          toDate
        })}
      />
      <span className="field-date__text t-hint">To</span>
      <input
        className="field-date__input t-input"
        type="text"
        value={toDate}
        title={`Set maximum ${label}`}
        placeholder="2016-12-31"
        onChange={(ev) => setValue(id, {
          fromDate,
          toDate: ev.target.value
        })}
      />
      <ResetButton label={label} onClick={() => setValue(id, {
        fromDate: '',
        toDate: ''
      })} />
    </div>
  );
}
