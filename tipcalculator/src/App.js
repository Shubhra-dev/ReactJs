import { useState } from "react";
import Bill from "./Bill";
import "./styles.css";
import Tip from "./Tip";
import Total from "./Total";

export default function App() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);
  function handleRes() {
    setPercentage1(0);
    setPercentage2(0);
    setBill("");
  }

  const average = (percentage1 + percentage2) / 2 / 100;
  return (
    <div className="App">
      <Bill bill={bill} handleChange={setBill} />
      <Tip percentage={percentage1} onSelect={setPercentage1}>
        {" "}
        What Do you think about the service?
      </Tip>
      <Tip percentage={percentage2} onSelect={setPercentage2}>
        {" "}
        What Do your Friend think about the service?
      </Tip>
      <Total handleReset={handleRes}>
        {bill
          ? `Your total bill is ${bill} + ${bill * average} = ${
              bill + bill * average
            }`
          : ""}
      </Total>
    </div>
  );
}
