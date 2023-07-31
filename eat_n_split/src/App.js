import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App() {
  const [showFormFriend, setShowFormFriend] = useState(false);
  const [friendList, setFriendList] = useState(initialFriends);
  const [selectFriend, setSelectFriend] = useState(null);
  function addFriends(friend) {
    setFriendList([...friendList, friend]);
    setShowFormFriend(false);
  }
  function selectedFriend(id) {
    const [selected] = friendList.filter((friend) => friend.id === id);
    const isOpen = selectFriend?.id === selected.id;
    setSelectFriend(isOpen ? null : selected);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friendList}
          selectFriend={selectedFriend}
          selected={selectFriend}
        />
        {showFormFriend && <FormAddFriend handleFriendSubmit={addFriends} />}
        <Button onClick={() => setShowFormFriend(!showFormFriend)}>
          {showFormFriend ? "Close" : "Add New Friend"}
        </Button>
      </div>
      {selectFriend && <FormSplitBill friend={selectFriend} />}
    </div>
  );
}

function FriendsList({ friends, selectFriend, selected }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectFriend={selectFriend}
          selected={selected}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, selectFriend, selected }) {
  const isSelected = selected?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} $ {Math.abs(friend.balance)}{" "}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you $ {friend.balance}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}
      <Button onClick={() => selectFriend(friend.id)}>
        {!isSelected ? "Select" : "Close"}
      </Button>
    </li>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
function FormAddFriend({ handleFriendSubmit }) {
  const [fName, setFName] = useState("");
  const [fImage, setFImage] = useState("https://i.pravatar.cc/48?u=499476");
  const newFriend = {
    name: fName,
    image: fImage,
    balance: 0,
    id: crypto.randomUUID(),
  };
  function handleSubmit(e) {
    e.preventDefault();
    handleFriendSubmit(newFriend);
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👨🏽‍🤝‍👨🏻 Name</label>
      <input
        type="text"
        placeholder="Name.."
        value={fName}
        onChange={(e) => setFName(e.target.value)}
      />
      <label>📸 Image URL</label>
      <input
        type="text"
        placeholder="Image URL.."
        value={fImage}
        onChange={(e) => setFImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}
function FormSplitBill({ friend }) {
  console.log(friend);
  return (
    <form className="form-split-bill">
      <label>💲 Bill Value</label>
      <input type="text" placeholder="Bill.." />
      <label>🤑 Your Expence</label>
      <input type="text" placeholder="Your Expence.." />
      <label>🤑 {friend.name}'s Expence</label>
      <input type="text" disabled />
      <label>❓ Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
