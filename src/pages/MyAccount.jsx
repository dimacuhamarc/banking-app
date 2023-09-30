import { Card, CardStyles } from "../components/Dashboard/DashboardCards/Card";
import DashboardNav from "../components/Dashboard/DashboardNav/DashboardNav";
import '../styles/Dashboard.scss';

const MyAccount = () => {
  return (
    <div>
      <DashboardNav />
      <div className='dashboard'>
      <h1>My Account</h1>
        <div className='dashboard-content'>
          <div className='dashboard-cards'>
            <Card
              data={`PHP ${Intl.NumberFormat("en-PH",2).format(10000.43)}`}
              title={'Bank Balance'}
              style={CardStyles.cash}
              icon={<i class="fa-solid fa-money-bill"></i>}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;