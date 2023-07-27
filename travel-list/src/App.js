import { useState } from "react";

export default function App() {
  function handleItem(newItem) {
    setItem((item) => [...items, newItem]);
  }
  function handleDelete(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }
  function handleToggle(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  const [items, setItem] = useState([]);
  return (
    <div className="app">
      <Logo />
      <Form handleI={handleItem} items={items} />
      <ListItem
        items={items}
        handleRemove={handleDelete}
        handleCheckBox={handleToggle}
      />
      <Stat items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌏 Travel List ✈</h1>;
}
function Form({ handleI, items }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = {
      description,
      quantity,
      packed: false,
      id: items.length + 1,
    };
    console.log(newItem);
    handleI(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for packing?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function ListItem({ items, handleRemove, handleCheckBox }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            handleRemove={handleRemove}
            handleCheckBox={handleCheckBox}
          />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, handleRemove, handleCheckBox }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => handleCheckBox(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleRemove(item.id)}>❌</button>
    </li>
  );
}
function Stat({ items }) {
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
