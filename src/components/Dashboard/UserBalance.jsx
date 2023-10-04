import { CardBalance, CardStyles } from "./DashboardCards/Card";
import { useState, useEffect } from "react";
import user from "../../assets/user-data.json";

export default function UserBalance() {
  const [balance, setBalance] = useState(0);
  const [holder, setHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleUserDetails = () => {
    setBalance(user[0].balance);
    setHolder(user[0].holder);
    setAccountNumber(user[0].number);
  };

  useEffect(() => {
    handleUserDetails();
  });
  
  const formattedBalance = new Intl.NumberFormat("en-PH", 2).format(balance);

  return (
    <CardBalance 
      data={formattedBalance}
      style={CardStyles.cash}
      icon={<i className="fa-solid fa-money-bill"></i>}
      accountHolder={holder}
      accountNumber={accountNumber}
    />
  );
}
