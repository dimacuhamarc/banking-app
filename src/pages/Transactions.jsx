import UserBalance from "../components/Dashboard/UserBalance";
import '../styles/Dashboard.scss';

const Transactions = () => {
  return (
    <div className='main'>
      <h1>Budget App</h1>
      <UserBalance />
    </div>
  );
};

export default Transactions;