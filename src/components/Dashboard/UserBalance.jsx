import { CardBalance, CardStyles } from "./DashboardCards/Card";
import { useState, useEffect } from "react";

export default function UserBalance() {
  var [balance, setBalance] = useState(0);
  const [holder, setHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataStr = localStorage.getItem("userData");
      const response = JSON.parse(userDataStr);
      setBalance(response[0].balance);
      setHolder(response[0].holder);
      setAccountNumber(response[0].number);
    };
    fetchUserData();

    const interval = setInterval(() => {
      fetchUserData();
      // console.log("User data fetched. balance is", balance);
    }, 5000);
    
    return () => clearInterval(interval);
  });

  const formattedBalance = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    currencyDisplay: "narrowSymbol",
  }).format(balance);

  const formattedAccountNumber = accountNumber
    .toString()
    .replace(/\d{4}(?=.)/g, "$& ");

  return (
    <CardBalance 
      data={formattedBalance}
      style={CardStyles.cash}
      icon={<i className="fa-solid fa-money-bill"></i>}
      accountHolder={holder}
      accountNumber={formattedAccountNumber}
    />
  );
}
