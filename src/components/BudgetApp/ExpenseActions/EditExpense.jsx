import React, { useState, useEffect } from "react";
import "./ExpenseActions.scss";

function EditExpense(props) {
  const [expenseName, setExpenseName] = useState("");
  const [expenseCost, setExpenseCost] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (props.expense) {
      setExpenseName(props.expense.expense_name);
      setExpenseCost(props.expense.expense_cost);
      setDueDate(props.expense.due_date);
    }
  }, [props.expense]);

  const handleSaveEdit = () => {
    const editedExpense = {
      expense_name: expenseName,
      expense_cost: expenseCost,
      due_date: dueDate,
      id: props.expense.id,
    };

    props.onSave(editedExpense);
  };

  return (
    <div className="modal-expense-form">
      <div className="modal-expense">
        <h3>Edit Expense</h3>
        <br />
        <form onSubmit={handleSaveEdit}>
          <label>Expense Name:</label>
          <input
            required
            name="expense-input"
            id="expenseNameModal"
            value={expenseName}
            placeholder="Expense Name"
            onChange={(event) => setExpenseName(event.target.value)}
          />
          <br />
          <label>Cost:</label>
          <br />
          <input
            required
            name="expense-input"
            id="expenseCostModal"
            type="number"
            value={expenseCost}
            placeholder="Expense Cost"
            onChange={(event) => setExpenseCost(event.target.value)}
          />
          <br />
          <label>Due Date:</label>
          <br />
          <input
            required
            id="dueDateModal"
            type="date"
            value={dueDate}
            name="due-date"
            onChange={(event) => setDueDate(event.target.value)}
          />
          <button className="save-cancel-button">Save</button>
          <button
            className="save-cancel-button"
            type="button"
            onClick={props.onCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditExpense;
