import React, { useState } from "react";
// import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from "../../Utils/Auth";
// import { computeHeadingLevel } from '@testing-library/react';
// import image from "./Img/imge.jpg";
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router';
import { DashboardNavbar } from "./DashboardNavbar";
import DashService from "../../Services/DashService";
import Backgroundimage from "../../Assets/backgroundImage.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePay } from '@fortawesome/free-brands-svg-icons';


export default function Dashboard() {
  const auth = useAuth();
  const [transactionType, setTransactionType] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const resetForm = () => {
    // Reset the form fields after submission
   
    setTransactionType("");
    setTransactionId("");
    setAmount("");
    setPaymentMethod("");
    
    
  }
  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };
  console.log(transactionType);

  const handleSubmit = (e) => {
    e.preventDefault();
 // Prevent the default form submission behavior
    if (auth.user.role === "deposit") {
      // Prepare the data object to be sent to the backend
      const data = {
        transactionType: "deposit",
        transactionID: transactionId,
        depositAmount: amount,
        paymentMethod: paymentMethod,
      };

      // Call the API service method to send the data to the backend
      DashService.depositTransaction(data, auth.user)
        .then((response) => {
          // Handle successful response from the backend
          console.log(response.data);
        toast.success("Transaction Created Successfully!!");
       
          
        })
        .catch((error) => {
          // Handle error from the backend
          console.error(error);
          toast.error("Failed! Transaction ID Does Not Exists");
        });
        
    } else {
      // Prepare the data object to be sent to the backend
      const data = {
        transactionType: "withdraw",
        transactionID: transactionId,
        withdrawAmount: amount,
        paymentMethod: paymentMethod,
      };

      // Call the API service method to send the data to the backend
      DashService.withdrawTransaction(data, auth.user)
        .then((response) => {
          // Handle successful response from the backend
          console.log(response.data);
          alert("Transaction Created Successfully!!");
          resetForm();
          
         
        })
        .catch((error) => {
          // Handle error from the backend
          console.error(error);
          toast.error(" Failed !! Transaction Id Already Exist");
          
        });
        

    }

    // Reset the form fields after submission if needed
    resetForm();
  };

  
  //Checking The role of the User
  console.log(auth.user.role);

  // const handleLoginDeposit = () => {
  //   setTransactionType('deposit');
  // };

  // const handleLoginWithdraw = () => {
  //   setTransactionType('withdraw');
  // };

  // const handleLogout = () => {
  //       const response = window.confirm(
  //       'You are about to be logged out of this site'
  //     );
  //     if (response) {
  //       toast.success('Logout successfully');
  //       auth.logout();
  //       nav('/');
  //     }

  //   console.log('Logged out');
  // };
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // minHeight: '100vh',
    // border:'2px solid red'
  };
  const cardStyle = {
    margin: "auto",
    marginTop: "5rem",
    padding: "1.5rem",
    width: "80%",
    maxWidth: "50rem",
    borderRadius: "1rem",
    boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.5)",
    visibility: "visible",
    // border:'2px solid blue'
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "2rem",
    border: "1px solid #ccc",
    marginBottom: "1rem",
    // border:'2px solid green'
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "2rem",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
    // border:'2px solid black'
  };

  const backgroundImageStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0.6,
    backgroundImage: `url(${Backgroundimage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    zIndex: -1,
    // border:
  };

  // const logoutButtonStyle = {

  //   position: 'absolute',
  //   top: '1rem',
  //   right: '1rem',
  //   backgroundColor: '#f44336',
  //   color: '#fff',
  //   border: 'none',
  //   padding: '0.5rem',
  //   borderRadius: '0.5rem',
  //   cursor: 'pointer',
  //   display: 'flex',
  //   alignItems: 'center',
  //   transition: 'background-color 0.3s ease',
  // };

  // const logoutIconStyle = {
  //   // marginRight: '0.5rem',
  // };

  // const hoverInputStyle = {
  //   ...inputStyle,
  //   boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.2)', // Add hover box-shadow
  // };

  return (
    <>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      /> */}

      <DashboardNavbar />
      <div style={containerStyle}>
        <div style={backgroundImageStyle} />

        {/* <button className="btn btn-danger" onClick={handleLogout} style={logoutButtonStyle}>
      <FaSignOutAlt style={logoutIconStyle} />
      Logout
    </button> */}

        <div style={cardStyle}>
          {/* <h2>{transactionType === 'deposit' ? 'Deposit' : 'Withdraw'}</h2>
        {transactionType === 'deposit' ? (
          <button className="btn btn-primary" onClick={handleLoginWithdraw} style={transactionType === 'withdraw' ? hoverButtonStyle : buttonStyle}>
            Switch to Withdraw
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleLoginDeposit} style={transactionType === 'deposit' ? hoverButtonStyle : buttonStyle}>
            Switch to Deposit
          </button>
        )} */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="transactionId">
                <h5>Transaction ID </h5>
              </label>
              <input
                type="text"
                className="form-control"
                onChange={handleTransactionIdChange}
                placeholder="Transaction ID"
                value={transactionId}
                style={inputStyle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">
                <h5>Amount</h5>
              </label>
              <input
                type="number"
                className="form-control"
              value={amount}
                onChange={handleAmountChange}
                placeholder="Amount"
                style={inputStyle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="PaymentMethod">
                <h5>paymentMethod</h5>
              </label>
              <select
                class="form-select"
                style={inputStyle}
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <option selected>Open this select menu</option>
                <option value="GPAy">GPAy</option>
                <option value="PhonePe">PhonePe</option>
                <option value="Paytm">Paytm</option>
                <option value="Bank">Bank</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="transactionType">
                <h5>Transaction Type</h5>
              </label>
              <input
                type="text"
                className="form-control"
                id="transactionType"
                name="transactionType"
                value={auth.user.role === "deposit" ? "Deposit" : "Withdraw"}
                onChange={handleTransactionTypeChange}
                placeholder="Transaction Type"
                style={inputStyle}
                disabled
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary"
                style={buttonStyle}
              >
                Submit Transaction
              </button>
            </div>
          </form>

          {/*        
        {transactions.map((transaction, index) => (
          <div key={index}>
            <h5>Transaction ID: {transaction.transactionId}</h5>
            <p>Transaction Type: {transaction.transactionType}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Status: {transaction.status}</p>
          </div> */}
          {/* ))} */}
        </div>
      </div>
    </>
  );
}
