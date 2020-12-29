export default function TestInput({ className, onKeyUp, value, title, placeholder }) {
  return (
    <input
      className={`t-input${className}`}
      onChange={onKeyUp}
      type="text"
      value={value}
      title={title}
      placeholder={placeholder}
    />
  );
}
