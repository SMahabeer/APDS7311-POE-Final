import './App.css';
import './index.css';
import LoginPage from './Components/LoginPage/LoginPage';
import { useState } from 'react';
import HomePage from './Components/HomePage/PaymentPortal';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const handleLogin = () => {
        setIsLoggedIn(true);
};
const handleLogout = () => {
  setIsLoggedIn(false); // Set logged-out state
 };
  return (
<Router>
<div>
  <Routes>
    <Route path="/" element={isLoggedIn ? <HomePage /> : <LoginPage onLogin={handleLogin} />} />
    <Route 
      path="/homepage" 
      element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <Navigate to="/" />} 
    />
    {/*<Route 
      path="/paymentportal" 
      element={isLoggedIn ? <PaymentPortal /> : <Navigate to="/transaction" />} 
    />*/}
  </Routes>
</div>
</Router>
  );
}

export default App;