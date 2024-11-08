import React from "react";
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaCreditCard } from "react-icons/fa6";

const LoginPage = ({ onLogin }) => {
    //const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(); // Call onLogin to set the logged-in state and navigate
        //navigate('/transaction'); // Navigate to TransactionPage
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                
                <div className="input-box">
                    <input type="text" placeholder="Username" formNoValidate />
                    <FaUser className='icon' />
                </div>

                <div className="input-box">
                    <input type="number" placeholder="Account Number" formNoValidate />
                    <FaCreditCard className='icon' /> 
                </div>

                <div className="input-box">
                    <input type="password" placeholder="Password" formNoValidate />
                    <MdLock className='icon' />
                </div>                  

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;