import ResetButton from '../resetButton';
import './style.scss';

export default function DictionaryView({ id, label, value, options, setValue }) {
  return (
    <div className="field__filter">
      <select
        value={value}
        className="field-dictionary__select t-input"
        title={`Filter by ${label}`}
        onChange={(ev) => setValue(ev.target.value)}
      >
        {options.map((option, index) => <option key={index}>{option}</option>)}
      </select>
      <ResetButton label={label} onClick={() => setValue(id, undefined)} />
    </div>
  );
}
