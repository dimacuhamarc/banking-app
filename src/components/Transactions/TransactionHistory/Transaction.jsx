import { useState, useEffect } from "react";
import { formatData } from "../../../utils/formatData";

export default function Transaction(props) {
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [type, setType] = useState("");

  const handleTransactionDetails = () => {
    setAmount(formatData(props.amount));
    setDate(props.date);
    setFrom(props.from);
    setTo(props.to);
    setType(props.type);
  };

  useEffect(() => {
    handleTransactionDetails();
  });

  return (
    <div className="transaction-card">
      <div className="details">
        <h2 id="amount">{amount}</h2>
        <p id="type">{type}</p>
        <p id="from">from {from}</p>
        <p id="to">to {to}</p>
        <p id="date">{date}</p>
      </div>
    </div>
  );
}
