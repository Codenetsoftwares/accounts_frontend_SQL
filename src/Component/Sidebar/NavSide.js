import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Utils/Auth";
import Topimg from "../../Assets/Topimgg.png";
import userIcon from "../../Assets/user-iconn.jpg";
const NavSide = () => {
  const auth = useAuth();
  const [isToggle, setIsToggle] = useState(true);
  const [isToggleCreate, setIsToggleCreate] = useState(true);
  const [isToggleDash, setIsToggleDash] = useState(true);
  const [useremail, setUserEmail] = useState([]);
  const [userrole, setUserRole] = useState([]);
  const [IsToggleTransaction, setIsToggleTransaction] = useState(true);
  useEffect(() => {
    setUserEmail(auth.user.userName);
    setUserRole(auth.user.role);
  }, [auth]);
  // console.log(useremail);
  console.log(userrole)
  const handleToggle = () => {
    setIsToggle(!isToggle);
  };
  const handleToggleDash = () => {
    setIsToggleDash(!isToggleDash);
  };
  const handleToggleCreate = () => {
    setIsToggleCreate(!isToggleCreate);
  };
  const handleToggleTransaction = () => {
    setIsToggleTransaction(!IsToggleTransaction);
  };
  return (
    <div>
      {/* {isTogglenav ? ( */}
      <aside
        className="main-sidebar elevation-4"
        style={{
          backgroundImage:
            "linear-gradient(270deg, rgba(255,213,213,1) 0%, rgba(241,98,245,1) 100%)",
        }}
      >
        <div className="d-flex flex-row">
          <p className="brand-link">
            <img
              src={Topimg}
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">
              &nbsp;obhisab.com
            </span>
            <span
              className="fs-4 ms-4  d-xl-none"
              style={{ width: "15%" }}
              data-widget="pushmenu"
            >
              &#10005;
            </span>
          </p>
          <div
            className="fs-4 ms-4 "
            style={{ width: "15%" }}
            data-widget="pushmenu"
          ></div>
        </div>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src={userIcon} className="img-circle" alt="User Image" />
            </div>
            <div className="info">
              <p href="#" className="text-white" style={{ fontSize: "10px" }}>
                {useremail}
              </p>
            </div>
          </div>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                {userrole.some(
                  (role) =>
                    role === "superAdmin" ||
                    role === "Dashboard-View" ||
                    role === "Transaction-View" ||
                    role === "Transaction-Edit-Request" ||
                    role === "Transaction-Delete-Request" ||
                    role === "Create-Deposit-Transaction" ||
                    role === "Create-Withdraw-Transaction" ||
                    role === "Create-Transaction"
                ) && (
                  <>
                    {isToggleDash ? (
                      <li className="nav-item ">
                        <a
                          href="#"
                          className="nav-link active"
                          onClick={handleToggleDash}
                        >
                          <i className="nav-icon fas fa-tachometer-alt"></i>
                          <p>
                            Dashboard
                            <i className="right fas fa-angle-down"></i>
                          </p>
                        </a>
                      </li>
                    ) : (
                      <li className="nav-item ">
                        <a
                          href="#"
                          className="nav-link active"
                          onClick={handleToggleDash}
                        >
                          <i className="nav-icon fas fa-tachometer-alt"></i>
                          <p>
                            Dashboard
                            <i className="right fas fa-angle-up"></i>
                          </p>
                        </a>
                        {userrole.some(
                          (role) =>
                            role === "superAdmin" ||
                            role === "Dashboard-View" ||
                            role === "Transaction-View" ||
                            role === "Transaction-Edit-Request" ||
                            role === "Transaction-Delete-Request"
                        ) && (
                          <Link to="/Testing" className="nav-link text-white">
                            <i className="far fa-circle nav-icon" />
                            <p>Transaction Details</p>
                          </Link>
                        )}
                        {userrole.some(
                          (role) =>
                            role === "superAdmin" ||
                            role === "Dashboard-View" ||
                            role === "Create-Deposit-Transaction" ||
                            role === "Create-Withdraw-Transaction" ||
                            role === "Create-Transaction"
                        ) && (
                          <Link to="/buttons" className="nav-link text-white">
                            <i className="far fa-circle nav-icon" />
                            <p>Create Transaction</p>
                          </Link>
                        )}
                      </li>
                    )}
                  </>
                )}
              </li>
              {userrole.some(
                (role) =>
                  role === "superAdmin" ||
                  role === "Bank-View" ||
                  role === "Website-View"
              ) && (
                <>
                  {IsToggleTransaction ? (
                    <li className="nav-item ">
                      <a
                        className="nav-link "
                        onClick={handleToggleTransaction}
                      >
                        &nbsp; <i className="fa-solid fas fa-user" />
                        <p>
                          &nbsp;Transaction
                          <i className="fas fa-angle-left right" />
                        </p>
                      </a>
                    </li>
                  ) : (
                    <li className="nav-item ">
                      <a
                        className="nav-link "
                        onClick={handleToggleTransaction}
                      >
                        &nbsp;
                        <i className="fa-solid fas fa-user" />
                        <p>
                          &nbsp; Transaction
                          <i className="fas fa-chevron-down right"></i>
                        </p>
                      </a>
                      {userrole.some(
                        (role) => role === "superAdmin" || role === "Bank-View"
                      ) && (
                        <>
                          <Link to="/bank" className="nav-link text-white">
                            <i className="far fa-circle nav-icon" />
                            <p>Bank</p>
                          </Link>
                        </>
                      )}
                      {userrole.some(
                        (role) =>
                          role === "superAdmin" || role === "Website-View"
                      ) && (
                        <>
                          <Link to="/website" className="nav-link text-white">
                            <i className="far fa-circle nav-icon" />
                            <p>Website</p>
                          </Link>
                        </>
                      )}
                    </li>
                  )}
                </>
              )}
              {userrole.some(
                (role) => role === "superAdmin" || role === ""
              ) && (
                <>
                  {isToggleCreate ? (
                    <li className="nav-item ">
                      <a className="nav-link " onClick={handleToggleCreate}>
                        &nbsp; <i className="fa-solid fas fa-user" />
                        <p>
                          &nbsp; Create
                          <i className="fas fa-angle-left right" />
                        </p>
                      </a>
                    </li>
                  ) : (
                    <li className="nav-item ">
                      <a className="nav-link " onClick={handleToggleCreate}>
                        &nbsp;
                        <i className="fa-solid fas fa-user" />
                        <p>
                          &nbsp; Create
                          <i className="fas fa-chevron-down right"></i>
                        </p>
                      </a>
                      <Link to="/createuser" className="nav-link text-white">
                        <i className="far fa-circle nav-icon" />
                        <p>Create SubAdmin</p>
                      </Link>
                      <Link
                        to="/createactualuser"
                        className="nav-link text-white"
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Create User</p>
                      </Link>
                      <Link
                        to="/createintroducer"
                        className="nav-link text-white"
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Create Introducer</p>
                      </Link>
                    </li>
                  )}
                </>
              )}
              {userrole.some(
                (role) =>
                  role === "superAdmin" ||
                  role === "Profile-View" ||
                  role === "Introducer-Profile-View" ||
                  role === "User-Profile-View"
              ) && (
                <>
                  {isToggle ? (
                    <li className="nav-item ">
                      <a className="nav-link text-white" onClick={handleToggle}>
                        &nbsp; <i className="fa-solid fas fa-user" />
                        <p>
                          &nbsp;Profile
                          <i className="fas fa-angle-left right" />
                        </p>
                      </a>
                    </li>
                  ) : (
                    <li className="nav-item ">
                      <a className="nav-link text-white" onClick={handleToggle}>
                        &nbsp;
                        <i className="fa-solid fas fa-user" />
                        <p>
                          &nbsp; Profile
                          <i className="fas fa-chevron-down right"></i>
                        </p>
                      </a>
                      {userrole.some(
                        (role) =>
                          role === "superAdmin" ||
                          role === "Profile-View" ||
                          role === "User-Profile-View"
                      ) && (
                        <Link to="userprofile" className="nav-link text-white">
                          <i className="far fa-circle nav-icon" />
                          <p>User Profile</p>
                        </Link>
                      )}
                      {userrole.some(
                        (role) =>
                          role === "superAdmin" ||
                          role === "Profile-View" ||
                          role === "Introducer-Profile-View"
                      ) && (
                        <Link
                          to="/introducerprofile"
                          className="nav-link text-white"
                        >
                          <i className="far fa-circle nav-icon" />
                          <p>Introducer</p>
                        </Link>
                      )}
                      {userrole.some(
                        (role) => role === "superAdmin" || role === ""
                      ) && (
                        <Link to="/adminlist" className="nav-link text-white">
                          <i className="far fa-circle nav-icon" />
                          <p>SubAdmin</p>
                        </Link>
                      )}
                    </li>
                  )}
                </>
              )}
              {userrole.includes("superAdmin") && (
                <li className="nav-item">
                  <Link
                    to="alert"
                    href="pages/widgets.html"
                    className="nav-link"
                  >
                    &nbsp;<i className="alert-icon fas fa-bell"></i>
                    <p className="text-dark">
                      &nbsp; Edit Request
                      {/* <span className="right badge badge-danger">New</span> */}
                    </p>
                  </Link>
                  {/*
                <Link to="/buttons" className="nav-link text-white">
                  <i className="far fa-circle nav-icon" />
                  <p> media</p>
                </Link> */}
                </li>
              )}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};
export default NavSide;