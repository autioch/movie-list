import Item from './item';
import rangeStats from './rangeStats';
import './style.scss';
import { EMPTY, TYPES } from '../consts';
import { useStore } from '../store';

const STATS = {
  [TYPES.TEXT]: () => EMPTY,
  [TYPES.RANGE]: ({ key }, items) => ({
    label: key,
    stats: rangeStats(items.flatMap((item) => item[key]))
  }),
  [TYPES.DICTIONARY]: () => EMPTY,
  [TYPES.DATE]: () => EMPTY
};

export default function StatList() {
  const [state] = useStore();
  const { schema: { filters = [] }, items } = state;
  const stats = filters
    .filter((field) => field.stat)
    .map((field) => STATS[field.type](field, items))
    .filter(Boolean);

  return (
    <div className="stat-list">
      <div>Statistics</div>
      {stats.map((field, index) => <Item field={field} key={index}/>)}
    </div>
  );
}
