import React, { useState } from "react";
import './SignupForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignupForm = () => {
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        // Only sending name and password
        const signupData = {
            name: fullName,
            password
        };

        console.log("Signup data being sent: ", signupData);

        try {
            const response = await axios.post("https://localhost:3000/register", signupData);
            setMessage("Admin registration successful! Redirecting to admin dashboard ...");
            setTimeout(() => {
                navigate("/adminhome");
            }, 2000);
        } catch (error) {
            console.error("Signup error: ", error);
            setMessage("Registration failed. Please try again.");
        }
    };

    return (
        <div className='wrapper'>
            <div className="left-section">
                <p>Admin Panel: Register a new admin account.</p>
            </div>
            <div className="right-section">
                <form onSubmit={handleSignup}>
                    <h1>Employee Registration</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Admin Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <FaLock className='icon' />
                    </div>
                    <button type="submit">Register Admin</button>
                    {message && <p className="login-message">{message}</p>}
                    <div className="register-link">
                        <p>Go back to <Link to="/adminhome">Admin Dashboard</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupForm;
