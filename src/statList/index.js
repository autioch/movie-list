import Item from './item';
import Count from './count';
import Legend from './legend';
import './style.scss';

export default function StatList({ count, totalCount, stats }) {
  return (
    <aside className="stat-list">
      <Count count={count} totalCount={totalCount}/>
      <section className="stat-list">
        {stats.map((field, index) => <Item field={field} key={index}/>)}
      </section>
      <Legend />
    </aside>
  );
}
