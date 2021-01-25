import rangeStats from './rangeStats';
import { EMPTY, TYPES } from '../consts';
import { useStore } from '../store';
import { getLabel } from '../utils';
import './index.scss';

const STATS = {
  [TYPES.TEXT]: () => EMPTY,
  [TYPES.RANGE]: ({ key }, items) => ({
    label: key,
    stats: rangeStats(items.flatMap((item) => item[key]))
  }),
  [TYPES.DICTIONARY]: () => EMPTY,
  [TYPES.DATE]: () => EMPTY
};

function Stat({ stat: { rounded, value, key } }) {
  return (
    <div className="field-stat-item">
      <div className="field-stat-item__label">{key}</div>
      <div className={`field-stat-item__value${rounded ? ' is-rounded' : ''}`}>{value}</div>
    </div>
  );
}

function FieldStats({ field: { label, stats } }) {
  return (
    <div className="field-stat">
      <div className="field-stat__header">{getLabel(label)}</div>
      <div className="field-stat__list">
        {stats.map((stat, index) => <Stat stat={stat} key={index} />)}
      </div>
    </div>
  );
}

export default function StatList() {
  const [state] = useStore();
  const { schema: { filters = [] }, items } = state;
  const stats = filters
    .filter((field) => field.stat)
    .map((field) => STATS[field.type](field, items))
    .filter(Boolean);

  return (
    <div>
      {stats.map((field, index) => <FieldStats field={field} key={index}/>)}
    </div>
  );
}
