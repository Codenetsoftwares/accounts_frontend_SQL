// Deposit.js
import React from 'react';
import { BsArrowLeftRight } from "react-icons/bs";
import { GiCash } from "react-icons/gi";

function Deposit() {
  return (
    <div className="container-fluid" style={{ background: "linear-gradient(to left, green, white)", padding: "12px", boxSizing: "border-box", color: "white", overflow: "hidden" }}>
      <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="col-lg-4" style={{ backgroundColor: "black", padding: "20px", borderRadius: "2%" }}>
          <div className="header-form mb-4">
            <h4 className="text-primary text-center">
              <i className="fa fa-user-circle" style={{ fontSize: "110px" }}></i>
            </h4>
          </div>
          <div className="body-form">
            <form>
              {/* Your form input elements go here */}
              {/* Example input group */}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user id"></i>
                  </span>
                </div>
                <input type="text" className="form-control" placeholder="User Id" />
              </div>
              {/* End of input group example */}
              <button type="button" className="btn btn-secondary btn-block mt-4">
                SUBMIT
              </button>
              <div className="message"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deposit;

