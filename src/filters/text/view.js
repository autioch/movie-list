import './style.scss';

export default function TextView({ filter: { id, value = '' }, setFilterValue, children }) {
  return (
    <div className="field__filter">
      <input
        className="field-text__input t-input"
        onChange={(ev) => setFilterValue(id, ev.target.value)}
        type="text"
        value={value}
      />
      {children}
    </div>
  );
}
