import './App.css';
import './index.css';
import LoginPage from './Components/LoginPage/LoginPage';
import { useState } from 'react';
import HomePage from './Components/HomePage/PaymentPortal';
import TransactionPage from './Components/TransactionPage/TransactionPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [transaction, setTransaction] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setTransaction({
      id: '123456',
      date: '2024-11-07',
      amount: 100,
      status: 'Completed',
      items: [{ name: 'Item 1' }, { name: 'Item 2' }],
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setTransaction(null);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={isLoggedIn ? <HomePage /> : <LoginPage onLogin={handleLogin} />} />
          <Route 
            path="/transaction" 
            element={isLoggedIn ? <TransactionPage onLogout={handleLogout} transaction={transaction} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/paymentportal" 
            element={isLoggedIn ? <HomePage /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;