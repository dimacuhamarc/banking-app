import DashboardNav from "../components/Dashboard/DashboardNav/DashboardNav";
import '../styles/Dashboard.scss';
import {Card, CardStyles} from '../components/Dashboard/DashboardCards/Card';
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <DashboardNav />
      <div className='dashboard'>
      <h1>Dashboard</h1>
        <div className='dashboard-content'>
          <div className='dashboard-cards'>
            <Card 
              data={`PHP ${Intl.NumberFormat("en-PH",2).format(10000.43)}`}
              title={'Bank Balance'}
              style={CardStyles.cash}
              icon={<i class="fa-solid fa-money-bill"></i>}
            />
            <Link to='/transactions'>
              <Card 
                data={'View My Budget'}
                title={'Manage Budget'}
                style={CardStyles.default}
              />
            </Link>
            <Link to='/budget'>
              <Card 
                data={'View Transactions'}
                title={'Recent Transactions'}
                style={CardStyles.default}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;