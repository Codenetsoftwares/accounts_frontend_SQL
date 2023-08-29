import React from "react";
import { BsArrowLeftRight } from "react-icons/bs";

function Withdraw() {
  return (
    <div
      className="Container fluid='lg'"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to left, green, white)",
        margin: 0,
        padding: 12,
        boxSizing: "border-box",
        color: "white",
      }}
    >
      <div
        className="form-box"
        style={{
          width: "380px",
          // height: '450px',
          backgroundColor: "black",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          opacity: 0.5,
          borderRadius: "2%",
        }}
      >
        <div
          className="header-form"
          style={{
            marginBottom: "15px",
          }}
        >
          <h4 className="text-primary text-center">
            <i className="fa fa-user-circle" style={{ fontSize: "110px" }}></i>
          </h4>
          <div className="image"></div>
        </div>
        <div className="body-form">
          <form>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i class="fa fa-user id"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="User Id"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" >
                  <BsArrowLeftRight/>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Transaction Id"
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i>
                    <b>&#8377;</b>
                  </i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Amount"
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i class="fa fa-credit-card"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Payment Method"
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i class="fa fa-gift"></i>
                </span>
              </div>
              <input type="text" className="form-control" placeholder="Bonus" />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i class="fa fa-university"></i>
                </span>
              </div>
              <input type="text" className="form-control" placeholder="Bank" />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Website"
              />
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-block"
              style={{
                marginTop: "40px",
                marginBottom: "10px",
              }}
            >
              SUBMIT
            </button>
            <div
              className="message"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            ></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Withdraw;
