import './style.scss';

function StatItem({ item: { rounded, value, key } }) {
  return (
    <li className="stat__item">
      <span className={`stat-item__value t-value ${rounded ? 'is-rounded' : ''}`}>{value}</span>
      <span className="stat-item__label t-hint">{key}</span>
    </li>
  );
}

export default function FieldStat({ field }) {
  return (
    <section className="stat">
      <header className="stat__header t-header">{field.label}</header>
      <ul className="stat__item-list">
        {field.stats.map((item, index) => <StatItem item={item} key={index} />)}
      </ul>
    </section>
  );
}
