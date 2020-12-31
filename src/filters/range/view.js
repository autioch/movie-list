import './style.scss';

export default function RangeView({ filter: { id, label, value = {} }, setFilterValue, children }) {
  const { fromValue = '', toValue = '' } = value;

  return (
    <div className="field__filter">
      <span className="field-date__text t-hint">From</span>
      <input
        className="field-date__input t-input"
        value={fromValue}
        type="text"
        title={`Set minimum ${label}`}
        onChange={(ev) => setFilterValue(id, {
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
        onChange={(ev) => setFilterValue(id, {
          fromValue,
          toValue: ev.target.value
        })}
      />
      {children}
    </div>
  );
}
