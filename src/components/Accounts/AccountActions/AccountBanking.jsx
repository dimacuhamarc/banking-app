import { useState, useEffect } from 'react';
import { formatAccountNumber, formatData } from '../../../utils/formatData';
import './AccountBanking.scss';

export const AccountBanking = () => {
  const [bankingModal, setBankingModal] = useState(false);
  const [bankingSelector, setBankingSelector] = useState('');
  const [modalType, setModalType] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataStr = localStorage.getItem('userData');
      const response = JSON.parse(userDataStr);
      setUsers(response);
    };
    fetchUserData();

    const interval = setInterval(() => {
      fetchUserData();
    }, 5000);

    return () => clearInterval(interval);
  });

  const isModalOpen = () => {
    setBankingModal(true);
    console.log('Banking modal is open');
  };

  const depositHandler = () => {
    setBankingSelector('Deposit');
    setBankingModal(false);
    setModalType('Deposit');
    console.log('Deposit button clicked');
  };

  const withdrawHandler = () => {
    setBankingSelector('Withdraw');
    setBankingModal(false);
    setModalType('Withdraw');
    console.log('Withdraw button clicked');
  };

  const transferHandler = () => {
    setBankingSelector('Transfer');
    setBankingModal(false);
    setModalType('Transfer');
    console.log('Transfer button clicked');
  };

  const closeModalHandler = () => {
    setBankingSelector('');
    setModalType('');
    setBankingModal(false);
  };

  return (
    <>
      <button className="enroll-account-button" onClick={isModalOpen}>
        <i className="fa-solid fa-money-check"></i>
        <h3> Handle Banking </h3>
      </button>

      {bankingModal && (
        <div className="banking-modal">
          <div className="banking">
            <div>
              <button onClick={depositHandler}>
                <i className="fa-solid fa-money-bill"></i>Deposit
              </button>
            </div>
            <div>
              <button onClick={withdrawHandler}>
                <i className="fa-solid fa-wallet"></i>Withdraw
              </button>
            </div>
            <div>
              <button onClick={transferHandler}>
                <i className="fa-solid fa-money-bill-transfer"></i>Transfer
              </button>
            </div>
            <div>
              <button onClick={closeModalHandler}>Close</button>
            </div>
          </div>
        </div>
      )}

      {bankingSelector && (
        <BankingModal
          ModalType={modalType}
          closeModalHandler={closeModalHandler}
        />
      )}
    </>
  );
};



const BankingModal = ({ ModalType, closeModalHandler }) => {
  const [firstAccount, setFirstAccount] = useState('');
  const [secondAccount, setSecondAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [users, setUsers] = useState([{}]);
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const [selectError, setSelectError] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataStr = localStorage.getItem('userData');
      const response = JSON.parse(userDataStr);
      setUsers(response);
    };
    fetchUserData();

    const interval = setInterval(() => {
      fetchUserData();
    }, 5000);

    return () => clearInterval(interval);
  });

  const errorHandler = (amount, type, balance) => {
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

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (ModalType === 'Deposit') {
      const userDataStr = localStorage.getItem('userData');
      const userData = JSON.parse(userDataStr);
      const newBalance = Number(userData[firstAccount].balance) + Number(amount);
      userData[firstAccount].balance = newBalance;
      localStorage.setItem('userData', JSON.stringify(userData));
      closeModalHandler();
      window.location.reload();
    } else if (ModalType === 'Withdraw') {
      const userDataStr = localStorage.getItem('userData');
      const userData = JSON.parse(userDataStr);
      const newBalance = Number(userData[firstAccount].balance) - Number(amount);
      userData[firstAccount].balance = newBalance;
      localStorage.setItem('userData', JSON.stringify(userData));
      closeModalHandler();
      window.location.reload();
    } else if (ModalType === 'Transfer') {
      const userDataStr = localStorage.getItem('userData');
      const userData = JSON.parse(userDataStr);
      const newBalance = Number(userData[firstAccount].balance) - Number(amount);
      userData[firstAccount].balance = newBalance;
      const newBalance2 = Number(userData[secondAccount].balance) + Number(amount);
      userData[secondAccount].balance = newBalance2;
      localStorage.setItem('userData', JSON.stringify(userData));
      closeModalHandler();
      window.location.reload();
    }
  };

  return (
    <div className="control-modal">
      <div className="control-modal-content">
        <div className="control-modal-header">
          <h3>{ModalType}</h3>
        </div>
          <form onSubmit={onSubmitHandler}>
            <input
              className='amount-input'
              type="number"
              placeholder="Amount"
              required
              value={amount}
              onChange={(e) => {setAmount(e.target.value); errorHandler(e.target.value, ModalType, users[firstAccount].balance)}}
              min={0}
              max={1000000}
              
            />
            <label htmlFor="">{formatData(amount)}</label>
            
            <select value={firstAccount} onChange={(e) => {setFirstAccount(e.target.value)}}>
              <option selected value="">
                Select Account
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.holder} | {user.number}
                </option>
              ))}
            </select>
            {/* <label>{firstAccount}</label> */}
            
            {ModalType === 'Transfer' && (
              <>
                <select value={secondAccount} onChange={(e) => setSecondAccount(e.target.value)}>
                  <option selected value="">
                    Select Account
                  </option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.holder} | {user.number}
                    </option>
                  ))}
                </select>
                {/* <label htmlFor="">{secondAccount}</label> */}
              </>
            )}
            <button type="submit">{ModalType}</button>
          </form>
        {isError && <div className="error">{error}</div>}
        <div className="control-modal-close">
          <button onClick={closeModalHandler} disabled={isError}>X</button>
        </div>
      </div>
    </div>
  );
};
