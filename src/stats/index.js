import StatItem from './item';
import './style.scss';

export default function Stats({ appModel }) {
  return (
    <section className="stat-list">
      { appModel
        .query()
        .fields
        .filter((field) => field.stat)
        .map((field, index) => <StatItem field={field} key={index}/>)}
    </section>
  );
}
