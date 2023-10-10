import React, { useState, useEffect } from "react";
import AccountList from "../components/Accounts/AccountList";
import EnrollAccount from "../components/Accounts/AccountActions/EnrollAccount";
import "../styles/ManageAccounts.scss";

const ManageAccounts = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const storedAccounts = localStorage.getItem("userData");
    if (storedAccounts) {
      setAccounts(JSON.parse(storedAccounts));
    }
  }, []);

  // --adding
  const handleAddAccount = (newAccount) => {
    const maxId = Math.max(...accounts.map((account) => account.id), 0);
    const newId = maxId + 1;
    newAccount.id = newId;
    const updatedAccounts = [...accounts, newAccount];
    setAccounts(updatedAccounts);
    localStorage.setItem("userData", JSON.stringify(updatedAccounts));
  };

  return (
    <div className="main">
      <div className="titlebar">
        <h1>Manage Accounts</h1>
        <EnrollAccount onEnroll={handleAddAccount} />
      </div>
      <div className="accounts">
        <AccountList />
      </div>
    </div>
  );
};

export default ManageAccounts;
