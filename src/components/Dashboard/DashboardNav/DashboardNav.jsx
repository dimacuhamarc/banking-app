import React from 'react'
import './DashboardNav.scss'
import { useLocation, NavLink } from 'react-router-dom';

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
            <NavLink to='/dashboard' activeClassName='active'>
              <i class="fa-solid fa-table-columns"></i>Dashboard
            </NavLink>
            <NavLink to='/budget'>
            <i class="fa-solid fa-receipt"></i>My Budget
            </NavLink>
            <NavLink to='/account'>
              <i class="fa-solid fa-user"></i>My Account
            </NavLink>
            <NavLink to='/transactions'>
              <i class="fa-solid fa-right-left"></i>Transactions
            </NavLink>
            <h2>Admin Controls</h2>
            <NavLink to='/manage-accounts'>
              <i class="fa-solid fa-users"></i>Accounts
            </NavLink>
          </div>
          <div className='user-controls'>
            <NavLink to='/login'>
              <i class="fa-solid fa-sign-out"></i>Logout
            </NavLink>
          </div>
        </div>
      </div>
    );
  } 
};

export default DashboardNav;