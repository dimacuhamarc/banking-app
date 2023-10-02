import React, { useState } from "react";
import { Card, CardStyles } from "../components/Dashboard/DashboardCards/Card";
import DashboardNav from "../components/Dashboard/DashboardNav/DashboardNav";
import AddExpense from "../components/BudgetApp/AddExpenses/AddExpenses";
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
    <div>
      <DashboardNav />
      <div className="dashboard">
        <h1>Budget Tracker</h1>
        <div className="main-budget-container">
          <div className="dashboard-cards">
            <Card
              data={`PHP ${Intl.NumberFormat("en-PH", 2).format(10000.43)}`}
              title={"Total Bank Balance"}
              style={CardStyles.cash}
              icon={<i class="fa-solid fa-money-bill"></i>}
            />
          </div>

          <div className="budget-content">
            <div className="first-container">
              <div className="graph">*Graph Here*</div>

              <div className="calendar">
                Calendar
                <Calendar></Calendar>
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
    </div>
  );
}

export default Budget;
