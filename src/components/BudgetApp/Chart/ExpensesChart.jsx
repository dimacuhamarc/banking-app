import React, { useEffect } from "react";
import Chart from 'chart.js';


const ExpenseChart = ( { labels, data }) => {
  useEffect(() => {
    const ctx = document.getElementById('expenseChart').getContext('2d');

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: data, 
            backgroundColor: ['#FF5733', '#FFC300', '#36A2EB', '#4BC0C0', '#9966FF'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
    });
  }, [data]);

  return (
    <div>
      <h2>Expense Chart</h2>
      <canvas id="expenseChart" width="100%" height="100%"></canvas>
    </div>
  );
};

export default ExpenseChart;






