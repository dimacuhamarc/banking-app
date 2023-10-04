import { useState, useEffect } from "react";

export default function AccountCard(props) {
  const [balance, setBalance] = useState(0);
  const [holder, setHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [type, setType] = useState("");
  const [admin, setAdmin] = useState(false);

  const handleUserDetails = () => {
    setBalance(props.balance);
    setHolder(props.holder);
    setAccountNumber(props.number);
    setType(props.type);
    setAdmin(props.isAdmin);
  };

  useEffect(() => {
    handleUserDetails();
  });

  const handleAdmin = () => {
    if (!admin) {
      return (
        <div className="controls">
          <button>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button>
            <i className="fa-solid fa-delete-left"></i>
          </button>
        </div>
      );
    }
  }

  const formattedBalance = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    currencyDisplay: "narrowSymbol",
  }).format(balance);

  const formattedAccountNumber = accountNumber
    .toString()
    .replace(/\d{4}(?=.)/g, "$& ");

  return (
    <div className="account-card">
      <div className="details">
        <h2>{formattedBalance}</h2>
        <h1>{holder}</h1>
        <h3>{formattedAccountNumber}</h3>
        <p>{type} Account</p>
      </div>
      {handleAdmin()}
    </div>
  );
}