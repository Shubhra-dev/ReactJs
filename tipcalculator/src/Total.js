export default function Total({ children, handleReset }) {
  return (
    <div>
      <p>{children}</p>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
