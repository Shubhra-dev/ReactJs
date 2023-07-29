import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import ListItem from "./ListItem";
import Stat from "./Stat";
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
  function handleReset() {
    const confirm = window.confirm(
      "Are you sure?? All the list will be deleted. ❌"
    );
    if (confirm) setItem([]);
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
        resetAll={handleReset}
      />
      <Stat items={items} />
    </div>
  );
}
