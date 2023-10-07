
export default function TransactionHistory() {
  return (
    <div>
      <h1>Transaction History</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Transaction</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12/12/2020</td>
            <td>Deposit</td>
            <td>$500</td>
          </tr>
          <tr>
            <td>12/12/2020</td>
            <td>Withdraw</td>
            <td>$200</td>
          </tr>
          <tr>
            <td>12/12/2020</td>
            <td>Transfer</td>
            <td>$100</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}