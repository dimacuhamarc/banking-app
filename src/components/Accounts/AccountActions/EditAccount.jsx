import React, { useState } from "react";
import "./AccountActions.scss";

function EditAccount({ account, onSave, onCancel }) {
  const [editedAccount, setEditedAccount] = useState({ ...account });

//   const handleInputChange = (event) => {
        // [wip]
//   };

  const handleSave = () => {
    onSave(editedAccount);
  };

  return (
    <div className="edit-account">
      <div className="modal-enrollment-form">
        <div className="modal-enrollment">
          <h3>Edit Account</h3>
          <br />
          <form onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend>Account Name</legend>
              <input
                required
                name="holder"
                value={editedAccount.holder}
                placeholder="Enter Account Name Here"
                onChange={handleInputChange}
              />
            </fieldset>
            <br />

            <fieldset>
              <legend>Email</legend>
              <input
                required
                name="email"
                type="email"
                value={editedAccount.email}
                placeholder="Enter Email Here"
                onChange={handleInputChange}
              />
            </fieldset>
            <br />

            <fieldset>
              <legend>Password</legend>
              <input
                required
                name="password"
                type="password"
                value={editedAccount.password}
                placeholder="Enter Password Here"
                onChange={handleInputChange}
              />
            </fieldset>
            <br />

            <div className="edit-btn">
              <button className="save-enroll-button" onClick={handleSave}>
                Save
              </button>
              <button
                className="save-enroll-button"
                onClick={() => onCancel(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAccount;
