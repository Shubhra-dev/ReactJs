export default function Stat({ items }) {
  const numOflist = items.length;
  const packed = items.filter((item) => item.packed).length;
  const percent = Math.round((packed / numOflist) * 100);
  return (
    <footer className="stats">
      <em>
        {percent === 100
          ? "All packed !! Ready to go ✈"
          : `
          💼 You have listed ${numOflist} item(s) and already packed ${packed}
          item(s) - (${percent ? percent : 0})%`}
      </em>
    </footer>
  );
}
