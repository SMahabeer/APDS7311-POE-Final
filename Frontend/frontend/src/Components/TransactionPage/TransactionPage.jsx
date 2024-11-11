import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './TransactionForm.css';

const TransactionPage = ({ onLogout, transaction }) => {
  console.log("Transaction Page Rendered");
  
  const navigate = useNavigate();
  const [currency, setCurrency] = useState('USD');

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    onLogout();
    navigate('/');
  };

  const currencyRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.75,
    JPY: 110,
    AUD: 1.35,
  };

  const convertedAmount = transaction?.amount ? (transaction.amount * currencyRates[currency]).toFixed(2) : "N/A";

  if (!transaction) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading...</p>
        </div>
      ); 
  }

  return (
    <div className="transaction-container">
      <form>
        <h1 className="title">Transactions</h1>

        <div className="transaction-details">
          <div className="detail-box">
            <span>Transaction ID:</span>
            <p>#{transaction.id}</p>
          </div>

          <div className="detail-box">
            <span>Date:</span>
            <p>{transaction.date}</p>
          </div>

          <div className="detail-box">
            <span>Amount:</span>
            <p>{currency} {convertedAmount}</p>
          </div>

          <div className="detail-box">
            <span>Status:</span>
            <p>{transaction.status}</p>
          </div>
        </div>

        <h2 className="subtitle">Currency</h2>
        <label htmlFor="currency-select">Select Currency</label>
        <select id="currency-select" value={currency} onChange={handleCurrencyChange} className="currency-dropdown">
          {Object.keys(currencyRates).map((curr) => (
            <option key={curr} value={curr}>{curr}</option>
          ))}
        </select>

        {}
        <button type="button" className="btn" onClick={() => navigate('/paymentportal')}>Add Payment</button>
        {}
        <button type="button" className="btn" onClick={handleLogout}>Logout</button>
      </form>
    </div>
  );
};

TransactionPage.propTypes = {
  onLogout: PropTypes.func.isRequired,
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default TransactionPage;