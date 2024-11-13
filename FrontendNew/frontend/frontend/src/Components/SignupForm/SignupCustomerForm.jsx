import React, { useState, useRef } from "react"; 
import './SignupForm.css';
import { FaUser, FaIdCard, FaLock } from "react-icons/fa"; 
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignupForm = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const idNumberRef = useRef(null);
    const usernameRef = useRef(null);

    const handleSignup = async (e) => {
        e.preventDefault();

        setMessage("");

        if (!/^\d{13}$/.test(idNumber)) {
            setIdNumber("");
            if (idNumberRef.current) {
                idNumberRef.current.setCustomValidity("ID number must be exactly 13 digits.");
                idNumberRef.current.reportValidity();
                idNumberRef.current.focus();
            }
            return;
        }

        const signupData = {
            name: username,
            password,
            username: fullName,
            idNumber,
        };

        console.log("Signup data being sent: ", signupData);

        try {
            const response = await axios.post(
                "https://localhost:3000/register", 
                signupData,
                { headers: { 'Content-Type': 'application/json' } } 
            );
            
            // Get accountNumber from the response
            const { accountNumber } = response.data;

            setMessage("Signup successful! Redirecting to payment form...");
            setTimeout(() => {
                navigate("/paymentform", {
                    state: { fullName, accountNumber }
                });
            }, 2000);
        } catch (error) {
            console.error("Signup error: ", error);

            if (error.response && error.response.data.message === "User already exists") {
                setUsername("");
                if (usernameRef.current) {
                    usernameRef.current.setCustomValidity("User already exists. Please try a different username.");
                    usernameRef.current.reportValidity();
                    usernameRef.current.focus();
                }
            } else {
                setMessage("Signup failed. Please try again.");
            }
        }
    };

    const handleIdNumberInput = () => {
        if (idNumberRef.current) {
            idNumberRef.current.setCustomValidity("");
        }
    };

    const handleUsernameInput = () => {
        if (usernameRef.current) {
            usernameRef.current.setCustomValidity("");
        }
    };

    return (
        <div className='wrapper'>
            <div className="left-section">
                <p>Welcome to PayMan Portal! Please create an account to get started.</p>
            </div>
            <div className="right-section">
                <form onSubmit={handleSignup}>
                    <h1>Signup</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            autoComplete="nope"
                        />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onInput={handleUsernameInput}
                            ref={usernameRef}
                            required
                            autoComplete="nope"
                        />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="ID Number"
                            value={idNumber}
                            onChange={(e) => setIdNumber(e.target.value)}
                            onInput={handleIdNumberInput}
                            ref={idNumberRef}
                            required
                        />
                        <FaIdCard className='icon' />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                        <FaLock className='icon' />
                    </div>
                    <button type="submit">Sign Up</button>
                    {message && <p className="login-message">{message}</p>}
                    <div className="register-link">
                        <p>Already have an account? <Link to="/CustomerLogin">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupForm;
