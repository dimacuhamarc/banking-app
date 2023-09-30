import React from "react";
import DashboardNav from "../components/Dashboard/DashboardNav/DashboardNav";
import { Card, CardStyles } from "../components/Dashboard/DashboardCards/Card";
import Expense from "../components/BudgetApp/Expenses/Expenses";
import "../styles/Dashboard.scss";
import Calendar from "react-calendar";
import "../styles/Budget.scss";

const Budget = () => {
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
                <Expense></Expense>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
