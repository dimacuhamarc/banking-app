import UserBalance from "../components/Dashboard/UserBalance";
import '../styles/Dashboard.scss';

const MyAccount = () => {
  return (
    <div className='main'>
      <h1>My Account</h1>
      <UserBalance />
    </div>
  );
};

export default MyAccount;