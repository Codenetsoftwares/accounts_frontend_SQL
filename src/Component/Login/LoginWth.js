/* eslint-disable default-case */
import React, { useState } from "react";
import "./LoginWth.css";
import BodyBG from "../../Assets/bg.jpg";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import {   ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginWth = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  // const location = useLocation();
  // const redirPath = location.state?.path || "/dashboard";
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  // const[persist,setPersist]=useState('')
  const [activeTab, setActiveTab] = useState(1);

  const handleClick = (tabNumber) => {
    setActiveTab(tabNumber);
    console.log(tabNumber);
  };

  const handleClickUser = (e) => {
    setUserId(e.target.value);
  };
  const handleClickPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (activeTab) {
      case 1:
        AccountService.depositlogin({
          email: userId,
          password: password,
          // persist: persist,
        })
          .then((res) => {
            console.log(res);
            if (res.data.status === 200) {
              localStorage.setItem("user", res.data.result.accessToken);
              console.log(auth);
              console.log("deposit");
              // toast.success('Login Successfully')
              toast.success("Login successfull");
              auth.login();
              navigate("/dashboard");
            }
            else{
              toast.error(res.data.message);
              navigate("/");
            }
          })

          .catch((err) => {
            // console.log(err.data);
            if (!err.response) {
              toast.error(err.data.message);
              return;
            }
            if (err.response.status === 403) {
              navigate("/dashboard", {
                state: { user: userId },
                replace: false,
              });
              return;
            }
          });
        break;

      case 2:
        AccountService.withdrawlogin({
          email: userId,
          password: password,
          // persist: persist,
        })
          .then((res) => {
            console.log(res);
            if (res.data.status === 200) {
              toast.success("Login successfull");
              localStorage.setItem("user", res.data.result.accessToken);
              auth.login();
              navigate("/dashboard");
            }
            else{
              toast.error(res.data.message);
              navigate("/");
            }
          })
          .catch((err) => {
            if (!err.response) {
              toast.error(err.message);
              return;
            }
            if (err.response.status === 403) {
              navigate("/dashboard", {
                state: { user: userId },
                replace: false,
              });
              return;
            }
          });
        break;

      case 3:
        AccountService.adminlogin({
          email: userId,
          password: password,
          // persist: persist,
        })
          .then((res) => {
            console.log(res);
            if (res.data.status === 200) {
              localStorage.setItem("user", res.data.result.accessToken);
              console.log(auth);
              console.log("withdraw");
              toast.success('Login Successfully')
              // alert("login successfull");
              auth.login();
              navigate("/admindash");
            }
            else{
              toast.error(res.data.message);
              navigate("/");
            }
          })
          .catch((err) => {
            if (!err.response) {
             alert(err.message);
              return;
            }
            if (err.response.status === 403) {
              navigate("/admindash", {
                state: { user: userId },
                replace: false,
              });
              return;
            }
          });
        break;
    }
  };
  return (
    // {Main Div}
    <div
      className="bg-info d-flex justify-content-center  align-items-center vh-100"
      style={{ backgroundImage: `url(${BodyBG})`, backgroundSize: "cover" }}
    >

      <div
        className=" card bg-transparent   p-5 rounded-3 justify-content-center kaushik"
        style={{
          width: " 25 rem",
          opacity: "100%",
          height: "30rem",
          display: "grid",
          placeItems: "center",
          boxShadow: "16px 15px 41px 3px rgba(0,0,0,0.62)",
        }}
      >
        {/* Tab List*/}
        <div className="nav">
          <ul
            className="nav nav-pills nav-justified nav-tabs custom-nav-tabs"
            role="tablist"
            style={{ width: "23rem", marginLeft: "-0.3rem", cursor: "pointer" }}
          >
            <li className="nav-item text-center" style={{ width: "33%" }}>
              <a
                className={`nav-link ${
                  activeTab === 1 ? "active" : ""
                } text-black fw-bold `}
                data-toggle="tab"
                aria-selected={activeTab === 1}
                onClick={() => handleClick(1)}
              >
                <b className="text-white" style={{ fontWeight: "800" }}>
                  Deposit
                </b>
              </a>
            </li>
            <li className="nav-item text-center" style={{ width: "33%" }}>
              <a
                className={`nav-link ${
                  activeTab === 2 ? "active" : ""
                } text-black fw-bold`}
                data-toggle="tab"
                aria-selected={activeTab === 2}
                onClick={() => handleClick(2)}
              >
                <b className="text-white">Withdraw</b>
              </a>
            </li>
            <li className="nav-item text-center" style={{ width: "33%" }}>
              <a
                className={`nav-link ${
                  activeTab === 3 ? "active" : ""
                } text-black fw-bold`}
                data-toggle="tab"
                aria-selected={activeTab === 3}
                onClick={() => handleClick(3)}
              >
                <b className="text-white">Admin</b>
              </a>
            </li>
          </ul>
        </div>

        <span
          className="input-group-text px-2"
          style={{
            background:
              "linear-gradient(90deg, rgba(238,200,174,1) 0%, rgba(221,34,34,0.8379726890756303) 72%)",
          }}
        >
          {activeTab === 1 && (
            <i
              className="fas fa-coins"
              style={{
                fontSize: "24px",
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            ></i>
          )}
          {activeTab === 2 && (
            <i
              className="fas fa-money-check"
              style={{
                fontSize: "24px",
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            ></i>
          )}
          {activeTab === 3 && (
            <i
              className="fas fa-user-shield"
              style={{
                fontSize: "24px",
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            ></i>
          )}
        </span>

        <form style={{ width: "18rem" }}>
          {/* UID input group */}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span
                className="input-group-text px-2"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(238,200,174,1) 0%, rgba(221,34,34,0.8379726890756303) 72%)",
                }}
              >
                <i
                  className="fas fa-user"
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                ></i>
              </span>
            </div>
            <input
              type="email"
              placeholder="User id"
              className="form-control"
              id="userId"
              onChange={handleClickUser}
            />
          </div>

          {/* Password input group */}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span
                className="input-group-text px-2"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(238,200,174,1) 0%, rgba(221,34,34,0.8379726890756303) 72%)",
                }}
              >
                <i
                  className="fas fa-lock"
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                ></i>
              </span>
            </div>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              id="password"
              onChange={handleClickPassword}
            />
          </div>

          {/* Submit button */}
          <div style={{ marginBottom: "2rem" }}>
            <input
              type="submit"
              className="btn form-control fw-bolder text-white"
              value={"Log In"}
              style={{
                background:
                  "linear-gradient(90deg, rgba(238,200,174,1) 0%, rgba(221,34,34,0.8379726890756303) 72%)",
              }}
              onMouseOver={(e) => {
                e.target.style.background =
                  "linear-gradient(90deg, rgba(218,8,8,1) 0%, rgba(245,244,218,1) 97%)";
              }}
              onMouseOut={(e) => {
                e.target.style.background =
                  "linear-gradient(90deg, rgba(238,200,174,1) 0%, rgba(221,34,34,0.8379726890756303) 72%)";
              }}
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginWth;
