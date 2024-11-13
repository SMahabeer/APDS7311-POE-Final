import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UnverifiedPayments.css';  // Import the CSS file for styling

const UnverifiedPayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');  // State for search query

    // Function to fetch unverified payments
    const fetchUnverifiedPayments = async () => {
        try {
            const response = await axios.get('http://localhost:3000/getPayments');
            setPayments(response.data);  // Assuming response contains an array of payments
            setLoading(false);
        } catch (error) {
            setError('Failed to load payments');
            setLoading(false);
        }
    };

    // Function to verify payment by id
    const verifyPayment = async (id) => {
        try {
            const response = await axios.patch('http://localhost:3000/dummyEndpoint', { id });
            
            // Check for a successful response (200 OK)
            if (response.status === 200) {
                // If successful, remove the verified payment from the list
                setPayments(payments.filter(payment => payment._id !== id));
                alert('Payment verified successfully');
            } else {
                alert('Payment verification failed');
            }
        } catch (error) {
            console.error('Error verifying payment:', error);
            alert('Error verifying payment');
        }
    };

    // Load unverified payments when the component mounts
    useEffect(() => {
        fetchUnverifiedPayments();
    }, []);

    // Filter payments based on the search query
    const filteredPayments = payments.filter(payment => 
        payment.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.senderAccNum.toString().includes(searchQuery) ||
        payment.recipientAccNum.toString().includes(searchQuery)
    );

    // Render the component
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="payment-container">
            <div className="payment-wrapper">
                {/* Search bar */}
                <input
                    type="text"
                    placeholder="Search by sender, sender account number, or recipient account number"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar"
                />

                {/* Unverified Payments title */}
                <h1 className="payment-title">Unverified Payments</h1>

                {/* The grid of payment boxes inside the border */}
                {filteredPayments.length === 0 ? (
                    <p>No unverified payments available.</p>
                ) : (
                    <div className="payment-grid">
                        {filteredPayments.map((payment) => (
                            <div key={payment._id} className="payment-box">
                                <p><strong>Sender:</strong> {payment.sender}</p>
                                <p><strong>Sender Account Number:</strong> {payment.senderAccNum}</p>
                                <p><strong>Recipient Account Number:</strong> {payment.recipientAccNum}</p>
                                <p><strong>Amount:</strong> {payment.amount} {payment.currency}</p>
                                <button onClick={() => verifyPayment(payment._id)} className="verify-button">
                                    Verify Payment
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UnverifiedPayments;
