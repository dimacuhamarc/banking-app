import React from 'react'
import './DashboardNav.scss'
import { useLocation, NavLink } from 'react-router-dom';
import Logout from '../../../utils/Logout';
const DashboardNav = () => {

  const location = useLocation();

  if (location.pathname === '/login') {
    return null;
  }
  else {
    return (
      <div>
        <div className='nav'>
          <div className='brand'>
            <h1>CoinPal</h1>
          </div>
          <div className='nav-links'>
            <NavLink to='/dashboard'>
              <i className="fa-solid fa-table-columns"></i>Dashboard
            </NavLink>
            <NavLink to='/budget'>
            <i className="fa-solid fa-receipt"></i>My Budget
            </NavLink>
            <NavLink to='/account'>
              <i className="fa-solid fa-user"></i>My Account
            </NavLink>
            <NavLink to='/transactions'>
              <i className="fa-solid fa-right-left"></i>Transactions
            </NavLink>
            <h2>Admin Controls</h2>
            <NavLink to='/manage-accounts'>
              <i className="fa-solid fa-users"></i>Accounts
            </NavLink>
          </div>
          {/* <div className='user-controls'>
            <Logout/>
          </div> */}
        </div>
      </div>
    );
  } 
};

export default DashboardNav;