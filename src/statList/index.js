import Item from './item';
import { STATS } from '../model/actions';
import { Typography } from 'antd';
import './style.scss';

const { Title } = Typography;

export default function StatList({ filters, items }) {
  const stats = filters
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
