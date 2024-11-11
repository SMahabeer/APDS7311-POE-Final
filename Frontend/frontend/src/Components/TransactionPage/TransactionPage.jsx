import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './TransactionPage.css'; // Ensure this file contains all styles

const TransactionPage = ({ onLogout, transaction }) => {
  console.log("Transaction Page Rendered");

  const navigate = useNavigate();
  const [currency, setCurrency] = useState('USD');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/transactions', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setTransactions(data.transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

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

  // Use optional chaining and fallback for amount
  const convertedAmount = transaction?.amount ? (transaction.amount * currencyRates[currency]).toFixed(2) : "N/A";

  // Conditional rendering for transaction details
  if (!transaction) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    ); // Show loading state
  }

  return (
    <div className="transaction-container">
      <form>
        <h1 className="title">Transactions</h1>

        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-details">
              <div className="detail-box">
                <span>Transaction ID:</span>
                <p>#{transaction.id}</p>
              </div>

              <div className="detail-box">
                <span>Date:</span>
                <p>{transaction.createdAt}</p>
              </div>

              <div className="detail-box">
                <span>Amount:</span>
                <p>{transaction.currency} {(transaction.amount * currencyRates[transaction.currency]).toFixed(2)}</p>
              </div>

              <div className="detail-box">
                <span>Status:</span>
                <p>{transaction.status}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading...</p>
          </div>
        )}

        <h2 className="subtitle">Currency</h2>
        <label htmlFor="currency-select">Select Currency</label>
        <select id="currency-select" value={currency} onChange={handleCurrencyChange} className="currency-dropdown">
          {Object.keys(currencyRates).map((curr) => (
            <option key={curr} value={curr}>{curr}</option>
          ))}
        </select>

        {/* Ensure button types are correct */}
        <button type="button" className="btn" onClick={() => navigate('/paymentportal')}>Add Payment</button>
        {/* Ensure this button is of type button */}
        <button type="button" className="btn" onClick={handleLogout}>Logout</button>
      </form>
    </div>
  );
};

// Add prop types validation
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
