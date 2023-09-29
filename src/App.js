import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Budget from './pages/Budget';
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
      </Routes>
    </div>
  );
}

export default App;
