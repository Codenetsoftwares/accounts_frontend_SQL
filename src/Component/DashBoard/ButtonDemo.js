import React from "react";
import { Link } from "react-router-dom";

function ButtonDemo() {
  return (
    <div className="container-fluid">
      <div
        className="row justify-content-center align-items-center min-vh-100"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,114,53,1) 0%, rgba(250,255,53,1) 52%, rgba(255,114,53,1) 100%)",
        }}
      >
        <div className="col-md-6 text-center">
          <div className="row ">
            
            <div className="col-md-6">
              <Link to="/withdraw" style={{ cursor: "pointer" }}>
                <button
                  className="btn btn-success text-black"
                  style={{
                    width: "25rem",
                    height: "25rem",
                    backgroundImage:
                      "radial-gradient(circle, rgba(245,255,183,1) 0%, rgba(255,41,41,1) 100%)",
                  }}
                >
                  <b>Withdraw</b>
                  {/* <img src="withdraw-logo.png" alt="Withdraw" className="button-logo" /> */}
                </button>
              </Link>
            </div>
            <div className="col-md-6">
              <Link to="/deposit" style={{ cursor: "pointer" }}>
                <button
                  className="btn btn-success text-black "
                  style={{
                    width: "25rem",
                    height: "25rem",

                    backgroundImage:
                      " radial-gradient(circle, rgba(245,255,183,1) 0%, rgba(0,255,42,1) 100%)",
                  }}
                >
                  <b>Deposit</b>
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
