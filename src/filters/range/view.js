import ResetButton from '../resetButton';
import './style.scss';

export default function RangeView({ id, label, value: { fromValue, toValue }, setValue }) {
  return (
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
  );
}
