import React, { useEffect, useState } from 'react';
import './ControlCard.scss';
import './ControlModal.scss';
import { formatAccountNumber, formatData } from '../../../utils/formatData';

export default function ControlCard() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const depositHandler = () => {
    setShowModal(true);
    setModalType('Deposit');
    console.log("Deposit button clicked");
  }

  const withdrawHandler = () => {
    setShowModal(true);
    setModalType('Withdraw');
    console.log("Withdraw button clicked");
  }

  const transferHandler = () => {
    setShowModal(true);
    setModalType('Transfer');
    console.log("Transfer button clicked");
  }

  const closeModalHandler = () => {
    setShowModal(false);
  }


  return (
    <>
      <div className="control-card card">
        <div>
          <button onClick={depositHandler}><i className="fa-solid fa-money-bill"></i>Deposit</button>
        </div>
        <div>
          <button onClick={withdrawHandler}><i className="fa-solid fa-wallet"></i>Withdraw</button>
        </div>
        <div>
          <button onClick={transferHandler}><i className="fa-solid fa-money-bill-transfer"></i>Transfer</button>
        </div>
      </div>
      {showModal && (
        <ControlModal ModalType={modalType} closeModalHandler={closeModalHandler} />
      )}
    </>
  );
}

const addTransaction = (transaction) => {
  const userDataStr = localStorage.getItem("userData");
  const userData = JSON.parse(userDataStr);
  userData[0].transactions.unshift(transaction);
  localStorage.setItem("userData", JSON.stringify(userData));
};

const ControlModal = ({ModalType, closeModalHandler}) => {
  const [balance, setBalance] = useState(0);
  const [holder, setHolder] = useState('');
  const [acHolder, setAcHolder] = useState('');
  const [acReciever, setAcReciever] = useState('');
  const [amount, setAmount] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const [selectError, setSelectError] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataStr = localStorage.getItem("userData");
      const response = JSON.parse(userDataStr);
      setUsers(response);
      setBalance(response[0].balance);
      setAcHolder(response[0].number);
      setHolder(response[0].holder);
    };
    fetchUserData();

    const interval = setInterval(() => {
      fetchUserData();
    }, 5000);
    
    return () => clearInterval(interval);
  });

  const formattedBalance = formatData(balance);
  const formattedAccountNumber = formatAccountNumber(acHolder);
  const formattedAmount = formatData(amount);

  const errorHandler = (amount, type) => {
    if (type === 'Withdraw') {
      if (amount > balance) {
        setError('Insufficient Funds');
        setIsError(true);
      } else if(amount < 100 && amount > 0){
        setError('Minimum withdraw amount is 100');
        setIsError(true);
      }
      else if (amount <= 0) {
        setError('Cannot process zero or negative amount ');
        setIsError(true);
      }
      else {
        setError('');
        setIsError(false);
      }
    } else if (type === 'Deposit') {
      if (amount <= 0) {
        setError('Cannot process zero or negative amount ');
        setIsError(true);
      }
      else if(amount < 100 && amount > 0){
        setError('Minimum deposit amount is 100');
        setIsError(true);
      }
      else {
        setError('');
        setIsError(false);
      }
    } else if (type === 'Transfer') {
      if (!selectError) {
        if (amount > balance) {
          setError('Insufficient Funds');
          setIsError(true);
        }
        else if(amount < 100 && amount > 0){
          setError('Minimum transfer amount is 100');
          setIsError(true);
        }
        else if (amount <= 0) {
          setError('Cannot process zero or negative amount ');
          setIsError(true);
        }
        else {
          setError('');
          setIsError(false);
        }
      } else {
        setError('Please select an account');
        setIsError(true);
      }
    }
  }

  const transferErrorHandler = (value) => {
    if (value === '') {
      setSelectError(true);
      setIsError(true);
    } else {
      setSelectError(false);
      setIsError(false);
    }
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (ModalType === 'Deposit') {
      const newBalance = parseFloat(balance) + parseFloat(amount);
      const userData = JSON.parse(localStorage.getItem('userData'));
      userData[0].balance = newBalance;
      localStorage.setItem('userData', JSON.stringify(userData));
      setBalance(newBalance);

      const transaction = { 
        amount: parseFloat(amount),
        date: new Date().toLocaleString(),
        from: 'User',
        to: 'Bank Account',
        type: 'Deposit'
      };

      addTransaction(transaction);


    } else if (ModalType === 'Withdraw') {
      const newBalance = parseFloat(balance) - parseFloat(amount);
      const userData = JSON.parse(localStorage.getItem('userData'));
      userData[0].balance = newBalance;
      localStorage.setItem('userData', JSON.stringify(userData));
      setBalance(newBalance);

      const transaction = { 
        id: userData[0].transactions.length,
        amount: parseFloat(amount),
        date: new Date().toLocaleString(),
        from: 'Bank Account',
        to: 'User',
        type: 'Withdraw'
      };

      addTransaction(transaction);

    } else if (ModalType === 'Transfer') {
      const newBalance = parseFloat(balance) - parseFloat(amount);
      const userData = JSON.parse(localStorage.getItem('userData'));
      userData[0].balance = newBalance;
      
      const recieverData = userData.filter((users) => users.number === acReciever);

      const recieverID = recieverData[0].id;

      const newRecieverBal = parseFloat(recieverData[0].balance) + parseFloat(amount);

      userData[recieverID].balance = newRecieverBal;

      console.log(recieverData);
            
      localStorage.setItem('userData', JSON.stringify(userData));
      setBalance(newBalance);

      const transaction = { 
        id: userData[0].transactions.length,
        amount: parseFloat(amount),
        date: new Date().toLocaleString(),
        from: 'Bank Account',
        to: recieverData[0].holder.toString(),
        type: 'Transfer'
      };

      console.log(transaction);

      addTransaction(transaction);

      
    }
    closeModalHandler();
  }

  return (
    <div className="control-modal">
      <div className="control-modal-content">
        <div className="control-modal-header">
          <h2>{ModalType.toUpperCase()}</h2>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className='account-number'>
            <label>{holder} </label>
            <label>Account Number : <span>{formattedAccountNumber}</span> </label>
          </div>
          <label id='current-balance'>Your Current Balance : {formattedBalance}</label>
          <input
            required
            name="amount-input"
            id="amount"
            type="number"
            pattern="^[^0-9].*"
            value={amount}
            placeholder="Enter Amount Here"
            onChange={(event) => {setAmount(event.target.value); errorHandler(event.target.value,ModalType);}}/>

            {ModalType === 'Transfer' && (
              <select value={acReciever} onChange={(event) => {setAcReciever(event.target.value); transferErrorHandler(event.target.value)}}>
                <option selected value=''>Select Account</option>
                {users.splice(1,users.length).map((user) => (
                  <option key={user.id} value={user.number}>
                    {user.holder} | {formatAccountNumber(user.number)}
                  </option>
                ))}
              </select>
            )}
          <label>{ModalType} Amount: {formattedAmount}</label>
          <button id='btn-submit' disabled={isError}>
            {ModalType}
          </button>
          {isError && <div className="error">{error}</div>}
        </form>
        <div className="control-modal-close">
          <button onClick={closeModalHandler}>X</button>
        </div>
      </div>
    </div>
  );
}