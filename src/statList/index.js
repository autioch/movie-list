import Item from './item';
import rangeStats from './rangeStats';
import { Typography } from 'antd';
import './style.scss';
import { EMPTY, TYPES } from '../consts';

const { Title } = Typography;

export const STATS = {
  [TYPES.TEXT]: () => EMPTY,
  [TYPES.RANGE]: ({ id, label }, items) => ({
    label,
    stats: rangeStats(items.map((item) => item[id]))
  }),
  [TYPES.DICTIONARY]: () => EMPTY,
  [TYPES.DATE]: () => EMPTY
};

export default function StatList({ schema, items }) {
  const stats = schema.fields
    .filter((field) => field.stat)
    .map((field) => STATS[field.type](field, items))
    .filter(Boolean);

  return (
    <div className="stat-list">
      <Title level={3}>Statistics</Title>
      {stats.map((field, index) => <Item field={field} key={index}/>)}
    </div>
  );
}
