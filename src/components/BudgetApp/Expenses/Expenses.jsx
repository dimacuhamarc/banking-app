import React, { useState } from "react";
import "./Expenses.scss";

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseCost, setExpenseCost] = useState("");
  const [expenseDueDate, setExpenseDueDate] = useState("");
  const [openExpModal, setOpenExpModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const openModalExp = (index) => {
    if (index !== undefined) {
      const editedExpense = expenses[index];
      setExpenseName(editedExpense.name);
      setExpenseCost(editedExpense.amount);
      setExpenseDueDate(editedExpense.dueDate || "");
      setEditingIndex(index);
    } else {
      setExpenseName("");
      setExpenseCost("");
      setExpenseDueDate("");
      setEditingIndex(null);
    }
    setOpenExpModal(true);
  };

  const closeModalExp = () => {
    setOpenExpModal(false);
  };

  const saveExpense = () => {
    if (editingIndex !== null) {
      const updatedExpenses = [...expenses];
      updatedExpenses[editingIndex] = {
        name: expenseName,
        amount: parseFloat(expenseCost),
        dueDate: expenseDueDate,
      };
      setExpenses(updatedExpenses);
    } else {
      // Add new expense
      const newExpense = {
        name: expenseName,
        amount: parseFloat(expenseCost),
        dueDate: expenseDueDate,
      };
      setExpenses([...expenses, newExpense]);
    }

    closeModalExp();
  };

  const deleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="expense-table">
      <h2>Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Expense Name</th>
            <th>Cost</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.name}</td>
              <td>Php {expense.amount}</td>
              <td>{expense.dueDate}</td>
              <td>
                <button onClick={() => openModalExp(index)}>
                  <i
                    class="fa-solid fa-pen-to-square"
                    style={{ color: "#ffff" }}
                  ></i>
                </button>
                <button onClick={() => deleteExpense(index)}>
                  <i
                    class="fa-solid fa-delete-left"
                    style={{ color: "#ffff" }}
                  ></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-exp-button" onClick={() => openModalExp()}>
        Add Expense
      </button>

      {/*triggered by the Add Expense Button*/}
      {openExpModal && (
        <div className="modal-expense-form">
          <div className="modal-expense">
            <h3>{editingIndex !== null ? "Edit Expense" : "Add Expense"}</h3>
            <label>Expense Name: </label>
            <br />
            <input
              name="expense-input"
              type="text"
              placeholder="Expense Name"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              required
            />
            <br />
            <label>Cost: </label> <br />
            <input
              name="expense-input"
              type="number"
              placeholder="Expense Cost"
              value={expenseCost}
              onChange={(e) => setExpenseCost(e.target.value)}
              required
            />
            <br />
            <label>Due Date: </label>
            <br />
            <input
              type="date"
              name="due-date"
              value={expenseDueDate}
              onChange={(e) => setExpenseDueDate(e.target.value)}
            />{" "}
            <br />
            <button className="save-cancel-button" onClick={saveExpense}>
              Save
            </button>
            <button className="save-cancel-button" onClick={closeModalExp}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expense;
