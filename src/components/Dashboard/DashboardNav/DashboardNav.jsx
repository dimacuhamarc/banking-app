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
            <h1>PennyWise</h1>
          </div>
          <div className='nav-links'>
            <NavLink to='/dashboard' activeClassName='active'>Dashboard</NavLink>
            <NavLink to='/budget'>My Budget</NavLink>
            <NavLink to='account'>Account</NavLink>
            <NavLink to='transactions'>Transactions</NavLink>
            <h2>Admin Controls</h2>
            <NavLink to='manage-accounts'>Manage Accounts</NavLink>
          </div>
        </div>
      </div>
    );
  } 
};

export default DashboardNav;