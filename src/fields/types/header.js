export default function Header({ label, order, setSort }) {
  return (
    <div className="field__sort t-label" onClick={setSort} title={`Sort by ${label}`}>
      <span className="field__sort-text">{label}</span>
      <span className={`field__sort-icon t-btn is-${order}`}></span>
    </div>
  );
}
