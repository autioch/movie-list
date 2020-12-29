export default function ResetButton({ label, onClick }) {
  return (
    <span
      className="field__filter-reset t-btn"
      title={`Reset ${label} filter`}
      onClick={onClick}
    >
    </span>
  );
}
