import React, { useState } from 'react';
import './AddExpenses.scss';

function AddExpense(props) {
  const [expenseName, setExpenseName] = useState('');
  const [expenseCost, setExpenseCost] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showModal, setShowModal] = useState(false);

  const addNewExpenseHandler = (event) => {
    event.preventDefault();

    const newExpense = {
      expense_name: expenseName,
      expense_cost: expenseCost,
      due_date: dueDate,
      id: props.newId,
    };

    props.handleOnChange(newExpense);

    setExpenseName('');
    setExpenseCost('');
    setDueDate('');
    setShowModal(false);
  };

  return (
    <div className="addExpense">
      <button
        type="button"
        className="add-exp-button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Add Expense
      </button>

      {showModal && (
        <div className="modal-expense-form">
          <div className="modal-expense">
            <h3>Add Expense</h3><br />
            <form onSubmit={addNewExpenseHandler}>
              <label>Expense Name:</label>
              <input
                required
                name="expense-input"
                id="expenseNameModal"
                value={expenseName}
                placeholder="Expense Name"
                onChange={(event) => setExpenseName(event.target.value)}
              /> <br />
              <label>Cost: </label> <br />
              <input
                required
                name="expense-input"
                id="expenseCostModal"
                type="number"
                value={expenseCost}
                placeholder="Expense Cost"
                onChange={(event) => setExpenseCost(event.target.value)}
              /> <br />
              <label>Due Date: </label><br />
              <input
                required
                id="dueDateModal"
                type="date"
                value={dueDate}
                name="due-date"
                onChange={(event) => setDueDate(event.target.value)}
              />
              <button className="save-cancel-button">Save</button>
              <button className="save-cancel-button" type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddExpense;
