import UserBalance from "../components/Dashboard/UserBalance";
import ControlCard from "../components/Transactions/ControlCard/ControlCard";
// import TransactionHistory from "../components/Transactions/TransactionHistory/TransactionHistory";
import '../styles/Dashboard.scss';

const Transactions = () => {
  return (
    <div className='main'>
      <div className="titlebar">
        <h1>My Transactions </h1>
      </div>
      <div className="transaction-card">
        <UserBalance />
        <ControlCard />
      </div>
      {/* <TransactionHistory /> */}
    </div>
  );
};

export default Transactions;