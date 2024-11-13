// src/Buttons.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Buttons/Buttons.css'; // Import the CSS file for buttons

const Buttons = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleButtonAddAdminClick = () => {
    navigate('/AdminSignup'); // Redirect to SignupAdminForm
  };

  const handleButtonAddEmployeeClick = () => {
    navigate('/EmployeeSignup'); // Redirect to SignupEmployeeForm
  };


  return (
    <div className="wrapper"> {/* Add wrapper class for styling */}
      <h1>Welcome to PayMan Portal</h1>
      <div className="left-section">
        <p>Select an option below:</p>
      </div>
      <div className="right-section">
        <button onClick={handleButtonAddAdminClick} className="styled-button">Add Admin</button>
        <button onClick={handleButtonAddEmployeeClick} className="styled-button">Add Employee</button>
      </div>
    </div>
  );
};

export default Buttons;
