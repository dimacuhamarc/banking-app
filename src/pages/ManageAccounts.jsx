import AccountList from '../components/Accounts/AccountList';
import '../styles/ManageAccounts.scss';

const ManageAccounts = () => {
  return (
    <div className='main'>
      <div className="titlebar">
        <h1>Manage Accounts</h1>
        <button>
          <i className="fas fa-user-plus"></i><h3>Enroll an Account</h3>
        </button>
      </div>
      <div className='accounts'>
        <AccountList />
      </div>
    </div>
  );
};

export default ManageAccounts;