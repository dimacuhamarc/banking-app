import React from "react";
import UserBalance from "../components/Dashboard/UserBalance";
import Expense from "../components/BudgetApp/Expenses/Expenses";
import Calendar from "react-calendar";
import "../styles/Budget.scss";
import Graph from "../components/Dashboard/Graph";

const Budget = () => {
  return (
    <div className="main">
      <h1>Budget Tracker</h1>
      <div className="dashboard-cards">
        <UserBalance />
        <Graph/>
      </div>
      <div className="budget-content">
        <div className="first-container">
          {/* <div className="graph">*Graph Here*</div> */}
          
          <div className="calendar">
            <h1>Calendar</h1>
            <Calendar view="month" />
          </div>
        </div>
        <div className="second-container">
          <div className="expense">
            <Expense />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
