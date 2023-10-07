import AccountList from "../components/Accounts/AccountList";
import EnrollAccount from "../components/Accounts/AccountActions/EnrollAccount";
import EditAccount from "../components/Accounts/AccountActions/EditAccount";
import "../styles/ManageAccounts.scss";
import data from "../assets/user-data.json";
import { useState } from "react";

const ManageAccounts = () => {
  const [accounts, setAccounts] = useState(data);
  const [editingAccount, setEditingAccount] = useState(null);
  const [showEditAccModal, setShowEditAccModal] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(null);
  const [showDelAccModal, setShowDelAccModal] = useState(false);

  const addUserAccount = (newAccount) => {
    const updatedAccounts = [...accounts, newAccount];
    setAccounts(updatedAccounts);
    localStorage.setItem("nonAdminAccount", JSON.stringify(updatedAccounts));
  };

  const handleAccounts = (newAccount) => {
    if (editingAccount) {
      setAccounts((prevAccount) =>
        prevAccount.map((account) =>
          account.id === editingAccount.id ? newAccount : account
        )
      );
      const updatedAccounts = accounts.map((account) =>
        account.id === editingAccount.id ? newAccount : account
      );
      localStorage.setItem("nonAdminAccount", JSON.stringify(updatedAccounts));

      setEditingAccount(null);
      setShowEditAccModal(false);
    } else {
      setAccounts((prevAccount) => {
        const updatedAccounts = [...prevAccount, newAccount];
        localStorage.setItem(
          "nonAdminAccount",
          JSON.stringify(updatedAccounts)
        );
        return updatedAccounts;
      });
    }
  };

  const handleEditAccount = (account) => {
    setEditingAccount(account);
    setShowEditAccModal(true);
  };

  const handleDeleteAccount = (account) => {
    setDeleteAccount(account);
    setShowDelAccModal(true);
  };

  const handleConfirmDelAccount = () => {
    if (deletingAccount) {
      const deleteIndex = accounts.findIndex(
        (account) => account.id === deletingAccount.id
      );

      if (deleteIndex !== -1) {
        accounts.splice(deleteAccount, 1);

        const updatedAccounts = accounts.map((account, index) => ({
          ...account,
          id: index,
        }));
        setAccounts(updatedAccounts);
        localStorage.setItem(
          "nonAdminAccount",
          JSON.stringify(updatedAccounts)
        );
      }
    }
    setDeleteAccount(null);
    setShowDelAccModal(false);
  };

  return (
    <div className="main">
      <div className="titlebar">
        <h1>Manage Accounts</h1>
        <EnrollAccount onEnroll={addUserAccount} />
      </div>
      <div className="accounts">
        <AccountList onEdit={handleEditAccount} onDelete={handleDeleteAccount}/>
      </div>

      {showEditAccModal && (
        <EditAccount
          account={editingAccount}
          onSave={(editedAccount) => {
            handleAccounts(editedAccount);
            setEditingAccount(null);
            setShowEditAccModal(false);
          }}
          onCancel={() => {
            setEditingAccount(null);
            setShowEditAccModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ManageAccounts;
