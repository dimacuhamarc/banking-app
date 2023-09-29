import DashboardNav from "../components/Dashboard/DashboardNav/DashboardNav";
import '../styles/Dashboard.scss';

const Dashboard = () => {
  return (
    <div>
      <DashboardNav />
      <div className='dashboard'>
        <div className='dashboard-content'>
          <h1>Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;