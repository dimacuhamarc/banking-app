import React, { useState, useEffect } from "react";
import AddExpense from "../components/BudgetApp/ExpenseActions/AddExpenses";
import EditExpense from "../components/BudgetApp/ExpenseActions/EditExpense";
import DeleteExpense from "../components/BudgetApp/ExpenseActions/DeleteExpense";
import ExpenseChart from "../components/BudgetApp/Chart/ExpensesChart";
import UserBalance from "../components/Dashboard/UserBalance";
import { Card, CardStyles } from "../components/Dashboard/DashboardCards/Card";
import Calendar from "react-calendar";
import BudgetPhoto from "../assets/budget.png";
import "../styles/Budget.scss";
import data from "../assets/input-expenses.json";

function Budget() {
  const [expenses, setExpenses] = useState(data);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deletingExpense, setDeletingExpense] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState("graph");
  const [totalSavingsBalance, setTotalSavingsBalance] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [remainingBalance, setRemainingBalance] = useState(0);

  // will initialize the data from input-expenses.json
  useEffect(() => {
    const initialTotalExpenses = data.reduce((total, expense) => total + expense.expense_cost, 0);
    setTotalExpenses(initialTotalExpenses);}, []);

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      const parsedExpenses = JSON.parse(storedExpenses);
      const newTotalExpenses = parsedExpenses.reduce((total, expense) => total + expense.expense_cost, 0);
      setTotalExpenses(newTotalExpenses);
      
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        const adminAccount = userData.find((account) => account.isAdmin === true );
        console.log("Admin account balance:", adminAccount.balance);
        if (adminAccount) {
          setTotalSavingsBalance(adminAccount.balance);
        }
      }
      const calculatedRemainingBalance = totalSavingsBalance - newTotalExpenses;
      setRemainingBalance(calculatedRemainingBalance);
      const updatedChartLabels = [...parsedExpenses.map((expense) => expense.expense_name), "Remaining Balance"];
      const updatedChartData = [...parsedExpenses.map((expense) => expense.expense_cost), remainingBalance];
      
      setChartLabels(updatedChartLabels);
      setChartData(updatedChartData);
    }
  }, [totalExpenses, totalSavingsBalance, remainingBalance]);
  
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

      const newTotalExpenses = updatedExpenses.reduce((total, expense) => total + expense.expense_cost, 0);
      setTotalExpenses(newTotalExpenses);
      const remainingBalance = totalSavingsBalance - newTotalExpenses;
      setChartLabels([...updatedExpenses.map((expense) => expense.expense_name), "Remaining Balance"]);
      setChartData([...updatedExpenses.map((expense) => expense.expense_cost), remainingBalance]);
    } else {
      setExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses, newExpense];
        localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  
        const newTotalExpenses = updatedExpenses.reduce((total, expense) => total + expense.expense_cost, 0);
        setTotalExpenses(newTotalExpenses);
        const remainingBalance = totalSavingsBalance - newTotalExpenses;
        setChartLabels([...updatedExpenses.map((expense) => expense.expense_name), "Remaining Balance"]);
        setChartData([...updatedExpenses.map((expense) => expense.expense_cost), remainingBalance]);
  
        return updatedExpenses;
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };


  return (
    <div className="main">
      <div className="titlebar">
        <h1>Budget Tracker</h1>
      </div>
      <div className="budget-container">
        <div className="dashboard-cards">
          <UserBalance />
          <Card
            data={remainingBalance.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 2,
            })}
            title={"Remaining Balance"}
            style={CardStyles.default}
          />
          <Card
            data={
              <div className="budget-photo">
                <img src={BudgetPhoto} alt="budgetPhoto" />
              </div>
            }
            title={""}
            style={CardStyles.default}
          />
        </div>
        <div className="budget-content">
          <div className="first-container">
            <div className="slide-controls">
              <div className="buttons">
                <button
                  onClick={() => setCurrentSlide("calendar")}
                  className={`prev-button ${
                    currentSlide === "calendar" ? "active" : ""
                  }`}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button
                  onClick={() => setCurrentSlide("graph")}
                  className={`next-button ${
                    currentSlide === "graph" ? "active" : ""
                  }`}
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>

              {currentSlide === "calendar" ? (
                <div className="calendar">
                  <Calendar />
                </div>
              ) : (
                <div className="graph">
                  <ExpenseChart labels={chartLabels} data={chartData} />
                </div>
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
