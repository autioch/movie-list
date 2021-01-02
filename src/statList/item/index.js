import { Typography } from 'antd';
import './style.scss';

const { Title } = Typography;

function StatItem({ item: { rounded, value, key } }) {
  return (
    <li className="stat__item">
      <span className={`stat-item__value t-value ${rounded ? 'is-rounded' : ''}`}>{value}</span>
      <Title level={5}>{key}</Title>
    </li>
  );
}

export default function FieldStat({ field }) {
  return (
    <section className="stat">
      <Title level={4}>{field.label}</Title>
      <ul className="stat__item-list">
        {field.stats.map((item, index) => <StatItem item={item} key={index} />)}
      </ul>
    </section>
  );
}
