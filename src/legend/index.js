import './style.scss';

const levels = [0, 1, 2, 3, 4, 5]; // eslint-disable-line no-magic-numbers

export default function Legend(){
  return (
    <section className="legend">
      <header className="legend__header t-header">Ranking</header>
      <ul className="legend__list">
        {levels.map((level, index) => <li className={`legend__item t-hint t-rank__bg--${level}`}></li>)}
      </ul>
    </section>
  );
};
