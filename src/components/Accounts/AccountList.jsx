import React, { useState, useEffect } from 'react';
import AccountModal from './AccountModal';
import AccountCard from './AccountCard';
import data from '../../assets/user-data.json';

import './AccountCardModal.scss';

export default function AccountList() {
  const [users, setUsers] = useState(data);
  const [editConfirmModal, setEditConfirmModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState();

  const [userToEdit, setUserToEdit] = useState();

  const [userNumber, setUserNumber] = useState();
  const [userHolder, setUserHolder] = useState();
  const [userEmail, setUserEmail] = useState();

  const handleEditDetails = (user) => {
    setUserNumber(user.number);
    setUserHolder(user.holder);
    setUserEmail(user.email);
  };

  useEffect(() => {
    const localStorageData = localStorage.getItem('userData');

    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      setUsers(parsedData);
    } else {
      setUsers(data);
    }
  }, []);

  const updateLocalStorage = (updatedUsers) => {
    localStorage.setItem('userData', JSON.stringify(updatedUsers));
  };

  useEffect(() => {
    console.log(userToEdit);
  }, [userToEdit]);

  const handleEdit = (accountNumber) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchUser = users.find((user) => user.number === userToEdit);
    const updatedUsers = users.filter((user) => user.number !== userToEdit);

  }
  const handleContinue = () => {
    setEditConfirmModal(false);
    setDeleteConfirmModal(false);
  };

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
              onEdit={() => {
                setEditConfirmModal(true);
                setUserToEdit(user.number);
                setUserNumber(user.number);
                setUserHolder(user.holder);
                setUserEmail(user.email);
              }}
              onDelete={() => handleDelete(user.number)}
            />
          );
        })}
      </div>
      {/* this part is WIP  */}
      {editConfirmModal && (
        <>
          <div className="modal">
            <div className="modal-box">
              <div className="modal-message">
                <h1>Editing {userHolder}'s Account</h1>
                <h2>{userToEdit}</h2>
              </div>
              <form className="edit-section">
                <label>Account Holder</label>
                <input
                  autoFocus
                  type="text"
                  placeholder="Change Holder Name"
                  name="name"
                  id="name"
                  defaultValue={userHolder}
                  required
                />
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Change Email"
                  name="email"
                  id="email"
                  defaultValue={userEmail}
                  required
                />
                <label>Account Number</label>
                <input
                  type="text"
                  value={userToEdit}
                  placeholder="Change Account Number"
                  name="accountNumber"
                  id="accountNumber"
                  disabled
                />
              </form>
              <div className="modal-controls">
                <button onClick={() => {
                  handleContinue();
                  // handleSubmit();
                }}>Continue</button>
              </div>
            </div>
          </div>
        </>
      )}
      {deleteConfirmModal && (
        <AccountModal
          isOpen={deleteConfirmModal}
          operation="Deleted"
          accountSelected={userToDelete.holder}
          onContinue={handleContinue}
        />
      )}
    </>
  );
}
