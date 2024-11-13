// src/Components/LoginForm/LoginCustomerForm.jsx
import React, { useState } from "react";
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import Link and useNavigate

const LoginForm = () => {
    // State to store name, password, and login message
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("http://localhost:3000/admin/login", {
                name,
                password,
            });
            const { token } = response.data;
            localStorage.setItem("token", token);  // Store the token in localStorage
            setMessage("Login successful!");

            // Navigate to PaymentForm after successful login
            navigate("/adminhome");
            
        } catch (error) {
            console.error("Login error: ", error);
            setMessage("Login failed. Try again.");
        }
    };

    return (
        <div className='wrapper'>
            <div className="left-section">
                <p>Welcome to GlobalPay!Please log in to continue.</p>
            </div>

            <div className="right-section">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>

                    {/* Username Input */}
                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}  // Handle name change
                            required 
                        />
                        <FaUser className='icon' />
                    </div>

                    {/* Password Input */}
                    <div className="input-box">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}  // Handle password change
                            required 
                        />
                        <FaLock className='icon' />
                    </div>

                    {/* Remember me and Forgot password */}
                    <div className="remember-forgot">
                        <label><input type="checkbox" /> Remember me</label>
                        <a href="http://localhost:3000/login">Forgot Password?</a>
                    </div>

                    {/* Login Button */}
                    <button type="submit">Login</button>

                    {/* Message display */}
                    {message && <p className="login-message">{message}</p>}
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
