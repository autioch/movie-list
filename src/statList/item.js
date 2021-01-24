function StatItem({ item: { rounded, value, key } }) {
  return (
    <div>
      <div className={rounded ? 'is-rounded' : ''}>{value}</div>
      <div>{key}</div>
    </div>
  );
}

export default function FieldStat({ field }) {
  return (
    <div>
      <div>{field.label}</div>
      <div>
        {field.stats.map((item, index) => <StatItem item={item} key={index} />)}
      </div>
    </div>
  );
}
