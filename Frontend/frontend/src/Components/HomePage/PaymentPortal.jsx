import React, { useState, useEffect } from "react";
import './PaymentForm.css';
import img1 from '../Assets/paymentOptions.png';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:3000'; 
const CURRENCY = 'ZAR';

const PaymentForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [displayCardNumber, setDisplayCardNumber] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    expiryYear: "", 
    expiryMonth: "",
    cvv: "",
    amount: "", 
    currency: CURRENCY
  });

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(`${API_URL}/csrf-token`, {
          credentials: 'include' 
        });
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
        setError('Failed to initialize secure session. Please refresh the page.');
      }
    };

    fetchCsrfToken();
  }, []);

   const handleCardNumberChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      cardNumber: value
    }));
    setDisplayCardNumber(value.replace(/(\d{4})/g, '$1 ').trim());
  };

  const validateForm = () => {
    if (typeof formData.fullName !== 'string' || formData.fullName.trim() === '') {
      setError('Full name is required');
      return false;
    }

    if (typeof formData.email !== 'string' || !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Valid email is required');
      return false;
    }

    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount');
      return false;
    }

    if (!formData.cardNumber.match(/^\d{16}$/)) {
      setError('Card number must be 16 digits');
      return false;
    }
    
    if (!formData.cvv.match(/^\d{3,4}$/)) {
      setError('CVV must be 3 or 4 digits');
      return false;
    }

    const currentYear = new Date().getFullYear();
    if (parseInt(formData.expiryYear) < currentYear) {
      setError('Card has expired');
      return false;
    }

    const requiredFields = [
      'fullName', 'email', 'address', 'city', 'province', 
      'zipCode', 'cardName', 'cardNumber', 'expiryMonth', 'expiryYear'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
        return false;
      }
    }

    return true;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setError('');
    
    if (name === 'amount') {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setFormData(prev => ({
          ...prev,
          [name]: numValue.toFixed(2)
        }));
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const refreshCsrfToken = async () => {
    try {
      const response = await fetch(`${API_URL}/csrf-token`, {
        credentials: 'include'
      });
      const data = await response.json();
      setCsrfToken(data.csrfToken);
      return data.csrfToken;
    } catch (error) {
      throw new Error('Failed to refresh CSRF token');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_URL}/create-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'CSRF-Token': csrfToken
        },
        credentials: 'include', 
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          province: formData.province,
          zipCode: formData.zipCode,
          cardName: formData.cardName,
          cardNumber: formData.cardNumber,
          expiryMonth: formData.expiryMonth,
          expiryYear: formData.expiryYear,
          cvv: formData.cvv,
          amount: parseFloat(formData.amount)
        })
      });

      if (response.status === 401) {
        navigate('/login');
        return;
      }

      if (response.status === 403) {
        const newCsrfToken = await refreshCsrfToken();
        const retryResponse = await fetch(`${API_URL}/create-payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'CSRF-Token': newCsrfToken
          },
          credentials: 'include',
          body: JSON.stringify(formData)
        });
        
        if (!retryResponse.ok) {
          throw new Error('Payment failed after token refresh');
        }
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Payment failed');
      }

      alert('Payment successful!');
      navigate('/transaction', { 
        state: { 
          transactionId: data.transactionId,
          status: 'success' 
        }
      });
      
    } catch (error) {
      console.error('Payment Error:', error);
      setError(error.message || 'Failed to process payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="column">
            <h3 className="title">Billing Address</h3>
            {}
            <div className="input-box">
              <span>Full Name :</span>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            {}
          </div>

          <div className="column">
            <h3 className="title">Payment Details</h3>
            {}
            <div className="input-box">
              <span>Amount (ZAR) :</span>
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                step="0.01"
                min="0.01"
                required
                value={formData.amount}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <span>Cards Accepted :</span>
              <img src={img1} alt="Accepted Cards" />
            </div>
            {}
            <div className="input-box">
              <span>Name On Card :</span>
              <input
                type="text"
                name="cardName"
                placeholder="Mr. John Doe"
                required
                value={formData.cardName}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <span>Credit / Debit Card Number :</span>
              <input
                type="number"
                name="cardNumber"
                placeholder="1234 1234 1234 1234"
                required
                value={formData.cardNumber}
                onChange={handleChange}
              />
            </div>
            <div className="flex">
              <div className="input-box">
                <span>Exp. Year :</span>
                <input
                  type="number"
                  name="expiryYear"
                  placeholder="2026"
                  required
                  value={formData.expiryYear}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box">
                <span>Exp. Month :</span>
                <select
                  name="expiryMonth"
                  required
                  value={formData.expiryMonth}
                  onChange={handleChange}
                >
                  <option value="">Select Month</option>
                  {}
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <option key={month} value={month}>
                      {month.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-box">
                <span>CVV :</span>
                <input
                  type="number"
                  name="cvv"
                  placeholder="123"
                  required
                  value={formData.cvv}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <button 
          type="submit" 
          className="btn" 
          disabled={isSubmitting || !csrfToken}
        >
          {isSubmitting ? 'Processing...' : 'Submit Payment'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;