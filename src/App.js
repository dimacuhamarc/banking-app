import './App.scss';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Budget from './pages/Budget';
import MyAccount from './pages/MyAccount';
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./utils/Auth";
import DashboardNav from './components/Dashboard/DashboardNav/DashboardNav';
import Transactions from './pages/Transactions';
import ManageAccounts from './pages/ManageAccounts';
import { useEffect } from 'react';
import userData from '../src/assets/user-data.json';

function App() {
  const { Authenticated } = useAuth();

  useEffect(() => {
    if (localStorage.getItem('userData') === null) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  
  });

  return (
    <div className="App">
      {Authenticated && <DashboardNav />}
      <Routes>
        <Route exact path='/' element={Authenticated ? <Dashboard /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login/>} />

        <Route exact path='/dashboard' element={Authenticated ? <Dashboard /> : <Navigate to="/login" />} />

        <Route exact path='/budget' element={Authenticated ? <Budget /> : <Navigate to="/login" />} />

        <Route exact path='/account' element={Authenticated ? <MyAccount /> : <Navigate to="/login" />} />
        
        <Route exact path='/transactions' element={Authenticated ? <Transactions /> : <Navigate to="/login" />} />

        <Route exact path='/manage-accounts' element={Authenticated ? <ManageAccounts /> : <Navigate to="/login" />} />

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;