import './style.scss';

export default function DictionaryView({ filter: { id, label, value, options }, setFilterValue, children }) {
  return (
    <div className="field__filter">
      <select
        value={value}
        className="field-dictionary__select t-input"
        title={`Filter by ${label}`}
        onChange={(ev) => setFilterValue(id, ev.target.value)}
      >
        <option></option>
        {options.map((option, index) => <option key={index} value={option}>{option}</option>)}
      </select>
      {children}
    </div>
  );
}
