// src/Buttons.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Buttons.css'; // Import the CSS file for buttons

const Buttons = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleButton1Click = () => {
    navigate('/CustomerSignup'); // Redirect to SignupCustomerForm
  };

  const handleButton2Click = () => {
    navigate('/EmployeeLogin'); // Redirect to SignupEmployeeForm
  };

  const handleButton3Click = () => {
    navigate('/AdminLogin'); // Redirect to SignupEmployeeForm
  };

  return (
    <div className="wrapper"> {/* Add wrapper class for styling */}
      <h1>Welcome to GlobalPay</h1>
      <div className="left-section">
        <p>Select an option below:</p>
      </div>
      <div className="right-section">
        <button onClick={handleButton1Click} className="styled-button">Customer</button>
        <button onClick={handleButton2Click} className="styled-button">Employee</button>
        <button onClick={handleButton3Click} className="styled-button">Admin</button>
      </div>
    </div>
  );
};

export default Buttons;
