import React from "react";
import './PaymentForm.css';
import img1 from '../Assets/paymentOptions.png';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  //const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Here you can handle any form validation or processing if needed
    //navigate('/transaction'); // Navigate to TransactionPage
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>

        <div className="row">

          <div className="column">
            <h3 className="title">Billing Address</h3>

            <div className="input-box">
              <span>Full Name :</span>
              <input type="text" placeholder="John Doe" />
            </div>

            <div className="input-box">
              <span>Email :</span>
              <input type="email" placeholder="example@example.com" />
            </div>

            <div className="input-box">
              <span>Address :</span>
              <input type="text" placeholder="Room - Street - Locality" />
            </div>

            <div className="input-box">
              <span>City :</span>
              <input type="text" placeholder="eg. Durban" />
            </div>

            <div className="flex">
              <div className="input-box">
                <span>Province :</span>
                <input type="text" placeholder="KwaZulu-Natal" />
              </div>

              <div className="input-box">
                <span>Zip-Code :</span>
                <input type="number" placeholder="1234" />
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
              <span>Name On Card :</span>
              <input type="text" placeholder="Mr. John Doe" />
            </div>

            <div className="input-box">
              <span>Credit / Debit Card Number :</span>
              <input type="number" placeholder="1234 1234 1234 1234" />
            </div>

            <div className="input-box">
              <span>Exp. Month :</span>
              <input type="text" placeholder="January" />
            </div>

            <div className="flex">
              <div className="input-box">
                <span>Exp. Year :</span>
                <input type="number" placeholder="2026" />
              </div>

              <div className="input-box">
                <span>CVV :</span>
                <input type="number" placeholder="123" />
              </div>
            </div>
          </div>

        </div>

        <button type="submit" className="btn">Submit</button>
        
      </form>
    </div>
  );
};

export default PaymentForm;