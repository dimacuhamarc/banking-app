import React from "react";
import "./ExpenseActions.scss";

function DeleteExpense(props) {
  const handleConfirmDelete = () => {
    props.onConfirmDelete();
  };

  return (
    <div className="modal-expense-form">
      <div className="modal-expense">
        <p>Are you sure you want to remove this expense?</p>
        <div className="confirmation-buttons">
          <button
            className="confirm-cancel-button"
            onClick={handleConfirmDelete}
          >Confirm
          </button>
          <button className="confirm-cancel-button" onClick={props.onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteExpense;
