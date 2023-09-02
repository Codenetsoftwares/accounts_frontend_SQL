
import React, { useState, useEffect } from "react";
import { BsArrowLeftRight, } from "react-icons/bs";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";

function Deposit() {
  const auth = useAuth();
  const [Bank , setBank] = useState([]);
  const [Website, setWebsite] = useState([]);
  const [UId, setUId] = useState([]);


  useEffect(() => {
   AccountService.getbank(auth.user).then((res) => setBank(res.data));
  }, [auth]);
  console.log("bank names", Bank)

  useEffect(() => {
   AccountService.website(auth.user).then((res) => setWebsite(res.data));
   }, [auth]);
   console.log("Website Names",Website)
 
   useEffect(() => {
    AccountService.userId(auth.user).then((res) => setUId(res.data));
    }, [auth]);
    console.log("user Id",UId)

  

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
              <select
                type="text"
                className="form-select"
              > 
              <option selected>userId</option>
              {UId.map((data, index) => (
                  <option key={index} value={data.userId}>
                    {data.userId}
                  </option>
                   ))}
              </select>
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
           
              <select
                type="text"
                className="form-select"
              > 
              <option selected>Select Bank</option>
              {Bank.map((data, index) => (
                  <option key={index} value={data.bankName}>
                    {data.bankName}
                  </option>
                   ))}
              </select>
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <select
                type="text"
               className="form-select"
              > 
              <option selected>Select Website</option>
              {Website.map((data, index) => (
                  <option key={index} value={data.websiteName}>
                    {data.websiteName}
                  </option>
                   ))}
              </select>
             
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-block"
              style={{
                marginTop: "40px",
                marginBottom: "10px",
              }}
            >
             ok
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

export default Deposit;
