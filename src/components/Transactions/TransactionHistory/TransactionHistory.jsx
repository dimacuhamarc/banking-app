import Transaction from './Transaction';
import './TransactionHistory.scss';
import { useState, useEffect } from 'react';

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchUserTransactions = async () => {
      const userDataStr = localStorage.getItem('userData');
      const userData = JSON.parse(userDataStr);

      setTransactions(userData[0].transactions);
    }
    fetchUserTransactions();

    const interval = setInterval(() => {
      fetchUserTransactions();
    }, 5000);
    
    return () => clearInterval(interval);
  },[]);

  return (
    <div className='transaction-container'>
      <div className='transaction-history'>
        {
          transactions.map((transaction) => {
            return (
              <Transaction 
                key={transaction.id}
                amount={transaction.amount}
                date={transaction.date}
                from={transaction.from}
                to={transaction.to}
                type={transaction.type}
              />
            );
          })
        }
      </div>
    </div>
  );
}