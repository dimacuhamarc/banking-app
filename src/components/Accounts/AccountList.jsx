import React, { useState, useEffect } from "react";
import AccountModal from "./AccountModal";
import AccountCard from "./AccountCard";
import data from "../../assets/user-data.json";

export default function AccountList() {
  const [users, setUsers] = useState(data);
  const [editConfirmModal, setEditConfirmModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    const localStorageData = localStorage.getItem("userData");

    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      setUsers(parsedData);
    } else {
      setUsers(data);
    }
  }, []);

  const updateLocalStorage = (updatedUsers) => {
    localStorage.setItem("userData", JSON.stringify(updatedUsers));
  };

  const handleEdit = (accountNumber) => {
    // WIP
    setUserToEdit(users.find((user) => user.number === accountNumber));
  };

  const handleDelete = (accountNumber) => {
    const updatedUsers = users.filter((user) => user.number !== accountNumber);
    const updateIDs = updatedUsers.map((user, index) => ({
      ...user,
      id: index,
    })); // should update the ids sequentially
    setUsers(updateIDs);
    updateLocalStorage(updateIDs);
    setDeleteConfirmModal(true);
    setUserToDelete(users.find((user) => user.number === accountNumber));
  };

  // PAU NOTES: THIS IS WIP
  // const handleCancel = () => {
  //   setEditConfirmModal(false);
  //   setDeleteConfirmModal(false);
  // };

  // const handleEditConfirm = () => {
  //   setEditConfirmModal(false);
  // };

  // const handleDeleteConfirm = () => {
  //   setDeleteConfirmModal(false);
  // };

  return (
    <>
      <div className="accounts-list">
        {users.map((user) => {
          return (
            <AccountCard
              key={user.id}
              balance={user.balance}
              holder={user.holder}
              number={user.number}
              type={user.type}
              isAdmin={user.isAdmin}
              onEdit={() => handleEdit(user.number)}
              onDelete={() => handleDelete(user.number)}
            />
          );
        })}
      </div>
      {/* this part is WIP  */}
      {/* <AccountModal
        isOpen={editConfirmModal}
        onCancel={handleCancel}
        onConfirm={handleEditConfirm}
        confirmationType="edit"
      />
      {deleteConfirmModal && (
        <AccountModal
          isOpen={deleteConfirmModal}
          onCancel={handleCancel}
          onConfirm={handleDeleteConfirm}
          confirmationType="delete"
        />
      )} */}
    </>
  );
}
