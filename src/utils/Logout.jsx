import React from 'react';
// import { useAuth } from './Auth';
import { NavLink } from 'react-router-dom';

const Logout = () => {
  // const { logout } = useAuth();

  // const handleLogout = () => {
  //   logout();
  // }

  return (
    <NavLink to='/login' >
      <i className="fas fa-sign-out"></i>Logout
    </NavLink>
  );
};

export default Logout;

