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
          <button onClick={depositHandler}>Deposit</button>
        </div>
        <div>
          <button onClick={withdrawHandler}>Withdraw</button>
        </div>
        <div>
          <button onClick={transferHandler}>Transfer</button>
        </div>
      </div>
      {showModal && (
        <ControlModal ModalType={modalType} closeModalHandler={closeModalHandler} />
      )}
    </>
  );
}

const ControlModal = ({ModalType, closeModalHandler}) => {
  const [balance, setBalance] = useState(0);
  const [holder, setHolder] = useState('');
  const [acHolder, setAcHolder] = useState('');
  // const [acReciever, setAcReciever] = useState('');
  const [amount, setAmount] = useState(null);


  
  useEffect(() => {
    const fetchUserData = async () => {
      const userDataStr = localStorage.getItem("userData");
      const response = JSON.parse(userDataStr);
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

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (ModalType === 'Deposit') {
      const newBalance = parseFloat(balance) + parseFloat(amount);
      const userData = JSON.parse(localStorage.getItem('userData'));
      userData[0].balance = newBalance;
      localStorage.setItem('userData', JSON.stringify(userData));
      setBalance(newBalance);
    } else if (ModalType === 'Withdraw') {
      const newBalance = parseFloat(balance) - parseFloat(amount);
      const userData = JSON.parse(localStorage.getItem('userData'));
      userData[0].balance = newBalance;
      localStorage.setItem('userData', JSON.stringify(userData));
      setBalance(newBalance);
    } else if (ModalType === 'Transfer') {
      const newBalance = balance - amount;
      const userData = JSON.parse(localStorage.getItem('userData'));
      userData[0].balance = newBalance;
      localStorage.setItem('userData', JSON.stringify(userData));
      setBalance(newBalance);
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
            value={amount}
            placeholder="Enter Amount Here"
            onChange={(event) => setAmount(event.target.value)}/>
          <label>{ModalType} Amount: {formattedAmount}</label>
          <button id='btn-submit'>
            {ModalType}
          </button>
        </form>
        <div className="control-modal-close">
          <button onClick={closeModalHandler}>X</button>
        </div>
      </div>
    </div>
  );
}