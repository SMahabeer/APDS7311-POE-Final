import React, { useState, useEffect } from 'react';
import './PaymentForm.css';
import img1 from '../Assets/paymentOptions.png';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    province: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    amount: '' // Added amount field
  });
  const [error, setError] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Fetch CSRF token when component mounts
    fetch('/csrf-token')
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
      .catch(err => console.error('Error fetching CSRF token:', err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.address || 
        !formData.city || !formData.province || !formData.zipCode || 
        !formData.cardName || !formData.cardNumber || !formData.expiryMonth || 
        !formData.expiryYear || !formData.cvv || !formData.amount) {
      setError('All fields are required');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Card number validation (basic)
    if (formData.cardNumber.length < 15 || formData.cardNumber.length > 16) {
      setError('Please enter a valid card number');
      return false;
    }

    // CVV validation
    if (formData.cvv.length < 3 || formData.cvv.length > 4) {
      setError('Please enter a valid CVV');
      return false;
    }

    // Amount validation
    if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Assuming you store the JWT token after login
      
      const response = await fetch('/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'CSRF-Token': csrfToken
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount)
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Store transaction details if needed
        localStorage.setItem('lastTransaction', JSON.stringify({
          transactionId: data.paymentDetails.transactionId,
          amount: data.paymentDetails.amount,
          currency: data.paymentDetails.currency
        }));
        
        navigate('/transaction');
      } else {
        setError(data.message || 'Payment failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while processing your payment. Please try again.');
      console.error('Payment error:', err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        
        <div className="row">
          <div className="column">
            <h3 className="title">Billing Address</h3>

            <div className="input-box">
              <span>Full Name :</span>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>

            <div className="input-box">
              <span>Email :</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@example.com"
              />
            </div>

            <div className="input-box">
              <span>Address :</span>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Room - Street - Locality"
              />
            </div>

            <div className="input-box">
              <span>City :</span>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="eg. Durban"
              />
            </div>

            <div className="flex">
              <div className="input-box">
                <span>Province :</span>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  placeholder="KwaZulu-Natal"
                />
              </div>

              <div className="input-box">
                <span>Zip-Code :</span>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="1234"
                />
              </div>
            </div>
          </div>

          <div className="column">
            <h3 className="title">Payment</h3>

            <div className="input-box">
              <span>Cards Accepted :</span>
              <img src={img1} alt="" />
            </div>

            <div className="input-box">
              <span>Amount (ZAR) :</span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
              />
            </div>

            <div className="input-box">
              <span>Name On Card :</span>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                placeholder="Mr. John Doe"
              />
            </div>

            <div className="input-box">
              <span>Credit / Debit Card Number :</span>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 1234 1234 1234"
                maxLength="16"
              />
            </div>

            <div className="input-box">
              <span>Exp. Month :</span>
              <input
                type="text"
                name="expiryMonth"
                value={formData.expiryMonth}
                onChange={handleInputChange}
                placeholder="January"
              />
            </div>

            <div className="flex">
              <div className="input-box">
                <span>Exp. Year :</span>
                <input
                  type="number"
                  name="expiryYear"
                  value={formData.expiryYear}
                  onChange={handleInputChange}
                  placeholder="2026"
                  min={new Date().getFullYear()}
                />
              </div>

              <div className="input-box">
                <span>CVV :</span>
                <input
                  type="password"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength="4"
                />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn">Process Payment</button>
      </form>
    </div>
  );
};

export default PaymentForm;
