import { useState, useEffect } from "react";
import warningGIF from "../../assets/warning.gif";
import "./AccountCardModal.scss";
import { formatAccountNumber, formatData } from "../../utils/formatData";

export default function AccountCard(props) {
  const [balance, setBalance] = useState(0);
  const [holder, setHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [type, setType] = useState("");
  const [admin, setAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleUserDetails = () => {
    setBalance(props.balance);
    setHolder(props.holder);
    setAccountNumber(props.number);
    setType(props.type);
    setAdmin(props.isAdmin);
  };

  useEffect(() => {
    handleUserDetails();
  }, [props]);

  const handleAdmin = () => {
    if (!admin) {
      return (
        <div className="controls">
          <div>
            <button onClick={handleEdit}>
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          </div>

          <div>
            <button onClick={handleDelete}>
              <i className="fa-solid fa-delete-left"></i>
            </button>
          </div>
        </div>
      );
    }
  };

  const formattedBalance = formatData(balance);
  const formattedAccountNumber = formatAccountNumber(accountNumber);

  const handleDelete = () => {
    setShowModal(true);
    setModalType("Delete");
  };

  const handleEdit = () => {
    setShowModal(true);
    setModalType("Edit");
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setModalType("");
  };



  return (
    <>
    <div className="account-card">
      <div className="details">
        <h2>{formattedBalance}</h2>
        <h1>{holder}</h1>
        <h3>{formattedAccountNumber}</h3>
        <p>{type} Account</p>
      </div>
      {handleAdmin()}
    </div>
    {showModal && <AccountModal modalType={modalType} closeModalHandler={closeModalHandler} user={props}/>}
    </>
  );
}

const AccountModal = ({ modalType, closeModalHandler, user }) => {
  const [balance, setBalance] = useState(0);
  const [holder, setHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountID, setAccountID] = useState("");

  const handleUserDetails = () => {
    setBalance(formatData(user.balance));
    setHolder(user.holder);
    setAccountNumber(formatAccountNumber(user.number));
    setAccountID(user.id);
  };

  useEffect(() => {
    handleUserDetails();
  },[]);

  return (
    <div className="modal">
      <div className="modal-box">
        <img src={warningGIF} alt="warning" />
        <div className="modal-message">
          <h1> Are you sure you want to {modalType} this user? </h1>
          <h2>{holder}</h2>
          <p>{accountNumber}</p>
          <span>{balance}</span>
        </div>
        <div className="modal-controls">
          <button>Confirm</button>
          <button onClick={closeModalHandler}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

