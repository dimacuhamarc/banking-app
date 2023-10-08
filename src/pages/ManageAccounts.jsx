import React, { useState, useEffect } from "react";
import AccountList from "../components/Accounts/AccountList";
import EnrollAccount from "../components/Accounts/AccountActions/EnrollAccount";
import Budget from "./Budget";
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

  // --deleting neww 10:02AM
  const handleDeleteAccount = (accountToDelete) => {
    const deleteIndex = accounts.findIndex((account) => account.id === accountToDelete.id);

    if (deleteIndex !== -1) {
      accounts.splice(deleteIndex, 1);
      const updatedAccounts = accounts.map((account, index) => ({...account, id: index}));
      setAccounts(updatedAccounts);
      localStorage.setItem("userData", JSON.stringify(updatedAccounts));
    }
  };

  useEffect(() => {
    const totalSavingsBalance = accounts
      .filter((account) => account.type === "Savings")
      .reduce((total, account) => total + account.balance, 0);
    const adminAccountIndex = accounts.findIndex(
      (account) => account.type === "Admin"
    );
    if (adminAccountIndex !== -1) {
      const updatedAccounts = [...accounts];
      updatedAccounts[adminAccountIndex].balance = totalSavingsBalance;

      setAccounts(updatedAccounts);
      localStorage.setItem("userData", JSON.stringify(updatedAccounts));
    }
  }, [accounts]);

  return (
    <div className="main">
      <div className="titlebar">
        <h1>Manage Accounts</h1>
        <EnrollAccount onEnroll={handleAddAccount} />
      </div>
      <div className="accounts">
        <AccountList accounts={accounts} onDeleteAccount={handleDeleteAccount}/>
      </div>
    </div>
  );
};

export default ManageAccounts;
