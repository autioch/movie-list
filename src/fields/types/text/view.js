import ResetButton from '../resetButton';
import TextInput from '../textInput';
import Header from '../header';
import './style.scss';

export default function TextView({ id, label, value, order, setValue, setSort }) {
  return (
    <section className={`field${value.length > 0 ? 'is-filter-active' : ''}`}>
      <Header label={label} order={order} setSort={() => setSort(id)} />
      <div className="field__filter">
        <TextInput
          className="field-text__input"
          value={value}
          title={`Reset ${label} filter`}
          onKeyUp={(ev) => setValue(id, ev.target.value)}
        />
        <ResetButton label={label} onClick={() => setValue(id, '')} />
      </div>
    </section>
  );
}
