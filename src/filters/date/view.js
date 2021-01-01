import './style.scss';

export default function DateView({ filter: { id, label, value = {}, minDate, maxDate }, setFilterValue, children }) {
  const { fromDate = '', toDate = '' } = value;

  return (
    <div className="field__filter">
      <span className="field-date__text t-hint">From</span>
      <input
        className="field-date__input t-input"
        type="text"
        value={fromDate}
        title={`Set minimum ${label}`}
        placeholder={minDate}
        onChange={(ev) => setFilterValue(id, {
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
        placeholder={maxDate}
        onChange={(ev) => setFilterValue(id, {
          fromDate,
          toDate: ev.target.value
        })}
      />
      {children}
    </div>
  );
}
