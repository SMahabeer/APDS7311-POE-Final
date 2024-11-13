// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./HomePage"; // Import the Home component
import SignupCustomerForm from "./Components/SignupForm/SignupCustomerForm";
import LoginCustomerForm from "./Components/LoginForm/LoginCustomerForm";
import SignupEmployeeForm from "./Components/SignupForm/SignupEmployeeForm";
import LoginEmployeeForm from "./Components/LoginForm/LoginEmployeeForm";
import PaymentForm from "./Components/PaymentForm/PaymentForm"; 
import UnverifiedPayments from "./Components/PaymentForm/UnverifiedPayments"; 
import LoginAdminForm from "./Components/LoginForm/LoginAdminForm"; 
import AdminHomeForm from "./Components/Admin/AdminHomeForm";
import SignupAdminForm from "./Components/SignupForm/SignupAdminForm";

// The updated frontend was built by adapting code from ChatGPT (2024)
// and the APDS7311 lab guide's frontend section

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Set the Home component for the root path */}
                <Route path="/CustomerSignup" element={<SignupCustomerForm />} />
                <Route path="/CustomerLogin" element={<LoginCustomerForm />} />
                <Route path="/paymentform" element={<PaymentForm />} />
                <Route path="/EmployeeLogin" element={<LoginEmployeeForm />} />
                <Route path="/AdminLogin" element={<LoginAdminForm/>} />
                <Route path="/EmployeeSignup" element={<SignupEmployeeForm />} />
                <Route path="/AdminSignup" element={<SignupAdminForm />} />
                <Route path="/verifypayment" element={<UnverifiedPayments />} />
                <Route path="/AdminHome" element={<AdminHomeForm />} />
                {}
            </Routes>
        </Router>
    );
};

export default App;
