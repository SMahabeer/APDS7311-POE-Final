import React, { useState, useEffect } from 'react';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        accountNumber: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        // Fetch CSRF token when component mounts
        const fetchCsrfToken = async () => {
            try {
                const response = await fetch('https://localhost:3000/csrf-token');
                const data = await response.json();
                setCsrfToken(data.csrfToken);
            } catch (err) {
                console.error('Error fetching CSRF token:', err);
                setError('Unable to initialize secure connection');
            }
        };

        fetchCsrfToken();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('https://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'CSRF-Token': csrfToken
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Store the token securely
                localStorage.setItem('token', data.token);
                onLogin(); // Update auth state
                navigate('/transaction');
            } else {
                setError(data.msg || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred during login. Please try again.');
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                
                {error && <div className="error-message text-red-500 mb-4">{error}</div>}
                
                <div className="input-box">
                    <input 
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required 
                    />
                    <FaUser className="icon" />
                </div>

                <div className="input-box">
                    <input 
                        type="text"
                        name="accountNumber"
                        placeholder="Account Number"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        required 
                    />
                    <FaCreditCard className="icon" />
                </div>

                <div className="input-box">
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required 
                    />
                    <MdLock className="icon" />
                </div>

                <button 
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;