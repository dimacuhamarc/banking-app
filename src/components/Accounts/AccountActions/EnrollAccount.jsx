import React, { useState, useEffect } from "react";
import successImage from "../../../assets/successful.gif";
import "./AccountActions.scss";
import data from "../../../assets/user-data.json";

function EnrollAccount({ onEnroll }) {
  const [accountName, setAccountName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [accountType, setAccountType] = useState("Savings");
  const [showModal, setShowModal] = useState(false);
  const [generatedAccountNumber, setGeneratedAccountNumber] = useState("");
  const [showGeneratedNumber, setShowGeneratedNumber] = useState(false);
  const [newId, setNewId] = useState(0);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [refreshPage, setrefreshPage] = useState(false);

  useEffect(() => {
    setGeneratedAccountNumber("");
    calculateNewId();
  }, []);

  useEffect(() => {
    if (!showModal) {
      setGeneratedAccountNumber("");
      setShowGeneratedNumber(false);
    }
  }, [showModal]);

  useEffect(() => {
    if (refreshPage) {
      window.location.reload();
    }
  }, [refreshPage]);

  const calculateNewId = () => {
    const localStorageData = localStorage.getItem("userData");
    const userData = localStorageData ? JSON.parse(localStorageData) : [];
    const maxId = Math.max(...userData.map((item) => item.id), 0);
    return maxId + 1;
  };
  

  const generateAccountNumber = () => {
    let accountNumber;
    const usedAccountNumbers = new Set(data.map((item) => item.number));

    do {
      const radAccountNumber = Math.floor(Math.random() * 10000000)
        .toString()
        .padStart(8, "0");
      accountNumber = `29${radAccountNumber}`;
    } while (usedAccountNumbers.has(accountNumber));

    const formattedAccountNumber = accountNumber
      .toString()
      .replace(/\d{4}(?=.)/g, "$& ");

    return formattedAccountNumber;
  };

  const handleGenerateAccountNumber = () => {
    const generatedNumber = generateAccountNumber();
    setGeneratedAccountNumber(generatedNumber);
    setShowGeneratedNumber(true);
  };

  const enrollAccountHandler = (event) => {
    event.preventDefault();

    const newAccount = {
      holder: accountName,
      email: email,
      password: password,
      number: generatedAccountNumber,
      balance: Number(initialDeposit),
      type: accountType,
      id: newId,
    };

    onEnroll(newAccount);

    setNewId((prevId) => prevId + 1);
    setAccountName("");
    setEmail("");
    setPassword("");
    setInitialDeposit("");
    setAccountType("Savings");
    setShowModal(false);
    setSuccessModalVisible(true);
    setTimeout(() => {
      setSuccessModalVisible(false);
      setrefreshPage(true);
    }, 3000);
  };

  return (
    <div className="enroll-account">
      <button
        type="button"
        className="enroll-account-button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <i className="fas fa-user-plus"></i>
        <h3>Enroll an Account</h3>
      </button>

      {showModal && (
        <div className="modal-enrollment-form">
          <div className="modal-enrollment">
            <h3>Enroll New Account</h3>
            <br />
            <form onSubmit={enrollAccountHandler}>
              <fieldset>
                <legend>Account Name</legend>
                <input
                  required
                  name="account-name-input"
                  id="accountNameModal"
                  value={accountName}
                  placeholder="Enter Account Name Here"
                  onChange={(event) => setAccountName(event.target.value)}
                />{" "}
              </fieldset>
              <br />

              <fieldset>
                <legend>Email</legend>
                {/* <label>Email</label> */}
                <input
                  required
                  name="email-input"
                  id="emailModal"
                  type="email"
                  value={email}
                  placeholder="Enter Email Here"
                  onChange={(event) => setEmail(event.target.value)}
                />{" "}
              </fieldset>
              <br />

              <fieldset>
                <legend>Password</legend>
                {/* <label>Password</label> */}
                <input
                  required
                  name="password-input"
                  id="passwordModal"
                  type="password"
                  value={password}
                  placeholder="Enter Password Here"
                  onChange={(event) => setPassword(event.target.value)}
                />{" "}
              </fieldset>
              <br />

              <fieldset>
                <legend>Initial Deposit</legend>
                {/* <label>Initial Deposit</label> */}
                <input
                  required
                  name="initial-deposit-input"
                  id="initialDepositModal"
                  type="number"
                  value={initialDeposit}
                  placeholder="Enter Deposit Amount"
                  onChange={(event) => setInitialDeposit(event.target.value)}
                />{" "}
              </fieldset>

              <br />
              <fieldset>
                <legend>Account Type</legend>
                {/* <label>Account Type</label> */}
                <select
                  required
                  id="accountTypeModal"
                  value={accountType}
                  onChange={(event) => setAccountType(event.target.value)}
                >
                  <option value="select" disabled selected>
                    Select Account Type
                  </option>
                  <option value="Savings">Savings</option>
                  <option value="Admin">Admin</option>
                </select>{" "}
              </fieldset>
              <br />

              <fieldset className="gen-account-field">
                <legend>Account Number</legend>
                <input
                  required
                  name="gen-account-num"
                  type="text"
                  id="generatedAccountNumber"
                  value={showGeneratedNumber ? generatedAccountNumber : ""}
                  readOnly
                />

                <button
                  className="gen-acc-btn"
                  type="button"
                  onClick={handleGenerateAccountNumber}
                >
                  Assign an Account Number
                </button>
              </fieldset>

              <div className="enroll-btn">
                <button className="save-enroll-button">
                  Enroll New Account
                </button>
                <button
                  className="save-enroll-button"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {successModalVisible && (
        <div className="success-modal">
          <div className="success-modal-box">
          <img src={successImage} alt="Success" />
          <p>Successfully enrolled!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EnrollAccount;
