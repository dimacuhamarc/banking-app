import React, { useState } from "react";
import AddExpense from "../components/BudgetApp/AddExpenses/AddExpenses";
import UserBalance from "../components/Dashboard/UserBalance";
import Calendar from "react-calendar";
import "../styles/Dashboard.scss";
import "../styles/Budget.scss";
import data from "../assets/input-expenses.json";

function Budget() {
  const [expenses, setExpenses] = useState(data);

  const handleExpenses = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

  return (
    <div className="main">
      <h1>Budget Tracker</h1>
      <div className="main-budget-container">
        <div className="dashboard-cards">
          <UserBalance />
        </div>

        <div className="budget-content">
          <div className="first-container">
            <div className="graph">*Graph Here*</div>

            <div className="calendar">
              <Calendar/>
            </div>
          </div>

          <div className="second-container">
            <div className="expense">
              Expenses
              <table>
                <thead>
                  <tr>
                    <th>Expense Name</th>
                    <th>Expense Cost</th>
                    <th>Due Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense, index) => (
                    <tr key={expense.id}>
                      <td>{expense.expense_name}</td>
                      <td>PHP {expense.expense_cost}</td>
                      <td>{expense.due_date}</td>
                      <td>
                        <button>
                          <i class="fa-solid fa-pen-to-square" style={{ color: "#ffff" }}></i>
                        </button>
                        <button onClick={() => handleDeleteExpense(expense.id)}>
                          <i class="fa-solid fa-delete-left" style={{ color: "#ffff" }}></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <AddExpense handleOnChange={handleExpenses} newId={expenses.length + 1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budget;
