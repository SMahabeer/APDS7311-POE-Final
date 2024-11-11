import React, { useState } from "react";
import './LoginForm.css';
import { FaUser, FaCreditCard } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrfToken=')).split('=')[1];
            
            const response = await axios.post('/login', {
                email,
                accountNumber,
                password
            }, {
                headers: { 'csrf-token': csrfToken }
            });

            if (response.status === 200) {
                onLogin();
                navigate('/transaction');
            }
        } catch (err) {
            setError(err.response?.data?.msg || "Login failed. Please try again.");
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>

                {error && <div className="error-message">{error}</div>}

                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FaUser className='icon' />
                </div>

                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Account Number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                    />
                    <FaCreditCard className='icon' />
                </div>

                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <MdLock className='icon' />
                </div>                  

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
