import ResetButton from '../resetButton';
import './style.scss';

export default function TextView({ id, label, value, setValue }) {
  return (
    <div className="field__filter">
      <input
        className="field-text__input t-input"
        onChange={(ev) => setValue(id, ev.target.value)}
        type="text"
        value={value}
        title={`Reset ${label} filter`}
      />
      <ResetButton label={label} onClick={() => setValue(id, '')} />
    </div>
  );
}
