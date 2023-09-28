import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Budget from './pages/Budget';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="budget" element={<Budget/>} />
      </Routes>
    </div>
  );
}

export default App;
