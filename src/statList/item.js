function StatItem({ item: { rounded, value, key } }) {
  return (
    <li className="stat__item">
      <span className={`stat-item__value t-value ${rounded ? 'is-rounded' : ''}`}>{value}</span>
      <div>{key}</div>
    </li>
  );
}

export default function FieldStat({ field }) {
  return (
    <section className="stat">
      <div>{field.label}</div>
      <ul className="stat__item-list">
        {field.stats.map((item, index) => <StatItem item={item} key={index} />)}
      </ul>
    </section>
  );
}
