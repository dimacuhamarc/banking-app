import React, { useEffect } from "react";
import Chart from "chart.js";

function TransactionGraph() {
  const chartRef = React.createRef();

  const localTransactionData = () => {
    const transactions = JSON.parse(localStorage.getItem("transactions"));
    if (transactions) {
      return transactions;
    }
    return [];
  };

  const transactions = localTransactionData();
  const transactionLabels = transactions.map((transaction) => transaction.type);
  const transactionData = transactions.map((transaction) => transaction.amount);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: transactionLabels,
        datasets: [
          {
            label: "Transaction Amount",
            data: transactionData,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [transactionData]);

  return (
    <div>
      <h2>Transaction Graph</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default TransactionGraph;
