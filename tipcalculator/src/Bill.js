export default function Bill({ bill, handleChange }) {
  return (
    <div>
      <span>Actual Bill :</span>
      <input
        type="text"
        value={bill}
        onChange={(e) => handleChange(Number(e.target.value))}
      />
    </div>
  );
}
