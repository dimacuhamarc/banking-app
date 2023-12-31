import '../styles/Dashboard.scss';
import '../App.scss';
import {Card, CardStyles} from '../components/Dashboard/DashboardCards/Card';
import { Link } from "react-router-dom";
import UserBalance from '../components/Dashboard/UserBalance';
import dashBG from "../assets/dasb.png";

const Dashboard = () => {
  return (
    <div className="main">
      <div className="titlebar">
        <h1>Dashboard</h1>
      </div>
      <div>
        <div className='dashboard-cards'>
          <div>
            <UserBalance />
          </div>
          <Link to='/budget'>
            <Card 
              data={'View My Budget'}
              title={'Manage Budget'}
              style={CardStyles.default}
            />
          </Link>
          <Link to='/transactions'>
            <Card 
              data={'View Transactions'}
              title={'Recent Transactions'}
              style={CardStyles.default}
            />
          </Link>
        </div>
      </div>
      {/* <div>
        <img src={dashBG} id='gif' alt="Success" />
      </div> */}
    </div>
  );
};

export default Dashboard;