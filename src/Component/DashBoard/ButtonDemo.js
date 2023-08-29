import React from 'react';
import { Link } from 'react-router-dom';

function ButtonDemo() {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6 text-center">
          <div className="row">
            <div className="col-md-6">
            <Link to="/withdraw" style={{ cursor: "pointer" }}>
              <button className="btn btn-primary  rounded-circle " style={{width:'20rem' , height:'20rem'}}>
                Withdraw
                {/* <img src="withdraw-logo.png" alt="Withdraw" className="button-logo" /> */}
              </button>
              </Link>
            </div>
            <div className="col-md-6">
            <Link to="/deposit" style={{ cursor: "pointer" }}>
              <button className="btn btn-success  rounded-circle" style={{width:'20rem' , height:'20rem'}}>
                Deposit
                {/* <img src="deposit-logo.png" alt="Deposit" className="button-logo" /> */}
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ButtonDemo;
