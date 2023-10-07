import React, { useState, useEffect } from "react";
import AddExpense from "../components/BudgetApp/ExpenseActions/AddExpenses";
import EditExpense from "../components/BudgetApp/ExpenseActions/EditExpense";
import DeleteExpense from "../components/BudgetApp/ExpenseActions/DeleteExpense";
import UserBalance from "../components/Dashboard/UserBalance";
import { Card, CardStyles } from "../components/Dashboard/DashboardCards/Card";
import Calendar from "react-calendar";
import "../styles/Dashboard.scss";
import "../styles/Budget.scss";
import data from "../assets/input-expenses.json";

function Budget() {
  const [expenses, setExpenses] = useState(data);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deletingExpense, setDeletingExpense] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState("calendar");

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");

    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  const handleExpenses = (newExpense) => {
    if (editingExpense) {
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === editingExpense.id ? newExpense : expense
        )
      );
      const updatedExpenses = expenses.map((expense) =>
        expense.id === editingExpense.id ? newExpense : expense
      );
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

      setEditingExpense(null);
      setShowEditModal(false);
    } else {
      setExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses, newExpense];
        localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
        return updatedExpenses;
      });
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowEditModal(true);
  };

  const handleDeleteExpense = (expense) => {
    setDeletingExpense(expense);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingExpense) {
      const deletedIndex = expenses.findIndex((expense) => expense.id === deletingExpense.id);
  
      if (deletedIndex !== -1) {
        expenses.splice(deletedIndex, 1);
  
        const updatedExpenses = expenses.map((expense, index) => ({...expense, id: index,}));
        setExpenses(updatedExpenses);
        localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      }
    }
    setDeletingExpense(null);
    setShowDeleteModal(false);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  return (
    <div className="main">
      <h1>Budget Tracker</h1>
      <div className="main-budget-container">
        <div className="dashboard-cards">
          <UserBalance />

          <Card
            data={"PHP 40,000.43"}
            title={"Remaining Balance"}
            style={CardStyles.default}
          />
          <Card data={"Yow"} title={"Quotes"} style={CardStyles.default} />
        </div>

        <div className="budget-content">
          <div className="first-container">
            <div className="slide-controls">
              <button
                onClick={() => setCurrentSlide("calendar")}
                className={`prev-button ${
                  currentSlide === "calendar" ? "active" : ""
                }`}
              >
                <i class="fa-solid fa-chevron-left"></i>
              </button>
              <button
                onClick={() => setCurrentSlide("graph")}
                className={`next-button ${
                  currentSlide === "graph" ? "active" : ""
                }`}
              >
                <i class="fa-solid fa-chevron-right"></i>
              </button>

              {currentSlide === "calendar" ? (
                <div className="calendar">
                  <Calendar />
                </div>
              ) : (
                <div className="graph">*Graph Here*</div>
              )}
            </div>
          </div>

          <div className="second-container">
            <div className="expense">
              <h2>Expenses</h2>
              <table>
                <thead>
                  <tr>
                    <th>Expense Name</th>
                    <th>Expense Cost</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense.id} className="data-row">
                      <td>{expense.expense_name}</td>
                      <td>
                        PHP{" "}
                        {Intl.NumberFormat("en-PH", {
                          style: "decimal",
                          minimumFractionDigits: 2,
                        }).format(expense.expense_cost)}
                      </td>
                      <td>{expense.due_date}</td>
                      <td>
                        <button onClick={() => handleEditExpense(expense)}>
                          <i
                            className="fa-solid fa-pen-to-square"
                            style={{ color: "#ffff" }}
                          ></i>
                        </button>
                        <button onClick={() => handleDeleteExpense(expense)}>
                          <i
                            className="fa-solid fa-delete-left"
                            style={{ color: "#ffff" }}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <AddExpense
                handleOnChange={handleExpenses}
                newId={expenses.length}
              />
              {showEditModal && (
                <EditExpense
                  expense={editingExpense}
                  onSave={handleExpenses}
                  onCancel={handleModalClose}
                />
              )}
              {showDeleteModal && (
                <DeleteExpense
                  expense={deletingExpense}
                  onConfirmDelete={handleDeleteConfirm}
                  onCancel={handleModalClose}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budget;
