import { useState, useEffect } from "react";
import warningGIF from "../../assets/warning.gif";
import "./AccountCardModal.scss";

export default function AccountCard(props) {
  const [balance, setBalance] = useState(0);
  const [holder, setHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [type, setType] = useState("");
  const [admin, setAdmin] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);

  const handleUserDetails = () => {
    setBalance(props.balance);
    setHolder(props.holder);
    setAccountNumber(props.number);
    setType(props.type);
    setAdmin(props.isAdmin);
  };

  const handleDeleteAccount = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // props.onConfirmDelete(props.id);
    setDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };

  useEffect(() => {
    handleUserDetails();
  }, [props]);

  const handleAdmin = () => {
    if (!admin) {
      return (
        <div className="controls">
          <div>
            <button>
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          </div>

          <div>
            <button onClick={handleDeleteAccount}>
              <i className="fa-solid fa-delete-left"></i>
            </button>
          </div>
        </div>
      );
    }
  };

  const formattedBalance = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    currencyDisplay: "narrowSymbol",
  }).format(balance);

  const formattedAccountNumber = accountNumber
    .toString()
    .replace(/\d{4}(?=.)/g, "$& ");

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
    
    {deleteModalOpen && (
        <div className="delete-modal">
          <div className="delete-modal-box">
            <img src={warningGIF} alt="warning" />
            <p>Are you sure you want to delete this user?</p>
            <button onClick={handleConfirmDelete}>Confirm</button>
            <button onClick={handleCancelDelete}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}
