import './style.scss';

export default function Count({ count = 0, totalCount = 0 }) {
  return (
    <section className="count">
      <header className="count__visible t-value">
        {`${count} items`}
      </header>
      <footer className="count__filtered t-hint">
        {`${totalCount - count} filtered out`}
      </footer>
    </section>
  );
}
