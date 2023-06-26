import React, { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
// import image from "./Img/imge.jpg";

export default function Dashboard() {
  const [transactionType, setTransactionType] = useState(''); 
  const [transactionId, setTransactionId] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [transactions, setTransactions] = useState([]);

  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      transactionId,
      transactionType,
      amount,
      status
    };

    setTransactions([...transactions, newTransaction]);

    setTransactionId('');
    setAmount('');
    setStatus('');
  };

  // const handleLoginDeposit = () => {
  //   setTransactionType('deposit');
  // };

  // const handleLoginWithdraw = () => {
  //   setTransactionType('withdraw');
  // };

  const handleLogout = () => {
    
    console.log('Logged out');
  };
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  };
  const cardStyle = {
    margin: 'auto',
    marginTop: '5rem',
    padding: '1.5rem',
    width: '80%',
    maxWidth: '40rem',
    borderRadius: '2.5rem',
    boxShadow: '0px 0px 20px 10px rgba(0, 0, 0, 0.5)',
    visibility: 'visible',
  };
 
 
  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '2rem',
    border: '1px solid #ccc',
    marginBottom: '1rem',
    
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '2rem',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
    
  };
 

  const backgroundImageStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.6,
    backgroundImage: `url("https://images.pexels.com/photos/217316/pexels-photo-217316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    zIndex: -1,
  };

  const logoutButtonStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.3s ease',
  };

  const logoutIconStyle = {
    // marginRight: '0.5rem',
  };

  // const hoverInputStyle = {
  //   ...inputStyle,
  //   boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.2)', // Add hover box-shadow
  // };

  return (
    <div style={containerStyle}>
    <div style={backgroundImageStyle} />

    <button className="btn btn-danger" onClick={handleLogout} style={logoutButtonStyle}>
      <FaSignOutAlt style={logoutIconStyle} />
      Logout
    </button>


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
              <h5>Transaction ID</h5>
            </label>
            <input
              type="text"
              className="form-control"
              id="transactionId"
              name="transactionId"
              value={transactionId}
              onChange={handleTransactionIdChange}
              placeholder="Transaction ID"
              style={inputStyle}
              />
          </div>
          <div className="form-group">
            <label htmlFor="amount">
              <h5>{transactionType === 'deposit' ? 'Deposit Amount' : 'Withdraw Amount'}</h5>
            </label>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              value={amount}
              onChange={handleAmountChange}
              placeholder={transactionType === 'deposit' ? 'Deposit Amount' : 'Withdraw Amount'}
              style={inputStyle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status"><h5>Status</h5></label>
            <input
              type="text"
              className="form-control"
              id="status"
              name="status"
              value={status}
              onChange={handleStatusChange}
              placeholder="Status"
              style={inputStyle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="transactionType"><h5>Transaction Type</h5></label>
            <input
              type="text"
              className="form-control"
              id="transactionType"
              name="transactionType"
              value={transactionType}
              onChange={handleTransactionTypeChange}
              placeholder="Transaction Type"
              style={inputStyle}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary" style={buttonStyle} >
              {transactionType === 'deposit' ? 'Submit Deposit' : 'Submit Withdraw'}
              
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
  );
}

