import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Budget from './pages/Budget';
import MyAccount from './pages/MyAccount';
import { Route, Routes } from "react-router-dom";
import DashboardNav from './components/Dashboard/DashboardNav/DashboardNav';

function App() {
  return (
    <div className="App">
      <DashboardNav />
      <Routes>
        <Route path="/" />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/budget" element={<Budget/>} />
        <Route path="/account" element={<MyAccount/>} />
        <Route path="/transactions" element={<h1>hi</h1>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
