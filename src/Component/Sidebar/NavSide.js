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
  const [IsToggleTransaction, setIsToggleTransaction] = useState(true);

  useEffect(() => {
    setUserEmail(auth.user.email);
  }, [auth]);
  // console.log(useremail);

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
                {/* {auth.user.role.some((role) => role === "superAdmin" || role === "Dashboard") && <> */}
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

                    <Link to="/Testing" className="nav-link text-white">
                      <i className="far fa-circle nav-icon" />
                      <p>Transaction Details</p>
                    </Link>

                    <Link to="/buttons" className="nav-link text-white">
                      <i className="far fa-circle nav-icon" />
                      <p>Create Transaction</p>
                    </Link>
                  </li>
                  )}
                {/* </>} */}
              </li>
              {/* {auth.user.role.some((role) => role === "superAdmin" || role === "Create-Transaction" || role === "BankView" || role === "WebsiteView") && <> */}
                {IsToggleTransaction ? (
                <li className="nav-item ">
                  <a className="nav-link " onClick={handleToggleTransaction}>
                    &nbsp; <i className="fa-solid fas fa-user" />
                    <p>
                      &nbsp;Transaction
                      <i className="fas fa-angle-left right" />
                    </p>
                  </a>
                </li>
              ) : (
                <li className="nav-item ">
                  <a className="nav-link " onClick={handleToggleTransaction}>
                    &nbsp;
                    <i className="fa-solid fas fa-user" />
                    <p>
                      &nbsp; Transaction
                      <i className="fas fa-chevron-down right"></i>
                    </p>
                  </a>
                  {/* {auth.user.role.some((role) => role === "superAdmin" || role === "BankView") && <> */}
                    <Link to="/bank" className="nav-link text-white">
                      <i className="far fa-circle nav-icon" />
                      <p>Bank</p>
                    </Link>
                  {/* </>} */}
                  {/* {auth.user.role.some((role) => role === "superAdmin" || role === "WebsiteView") && <> */}
                    <Link to="/website" className="nav-link text-white">
                      <i className="far fa-circle nav-icon" />
                      <p>Website</p>
                    </Link>
                  {/* </>} */}
                </li>
              )}
            {/* </>} */}
              {/* {auth.user.role.some((role) => role === "superAdmin" || role === "") && <> */}
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

                  <Link to="/createactualuser" className="nav-link text-white">
                    <i className="far fa-circle nav-icon" />
                    <p>Create User</p>
                  </Link>
                  <Link to="/createintroducer" className="nav-link text-white">
                    <i className="far fa-circle nav-icon" />
                    <p>Create Introducer</p>
                  </Link>
                </li>
              )}
            {/* </>} */}

              {/* {auth.user.role.some((role) => role === "superAdmin" || role === "Profile") && <> */}
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

                  <Link to="userprofile" className="nav-link text-white">
                    <i className="far fa-circle nav-icon" />
                    <p>User Profile</p>
                  </Link>

                  <Link to="/introducerprofile" className="nav-link text-white">
                    <i className="far fa-circle nav-icon" />
                    <p>Introducer</p>
                  </Link>
                  <Link to="/adminlist" className="nav-link text-white">
                    <i className="far fa-circle nav-icon" />
                    <p>SubAdmin</p>
                  </Link>
                </li>
              )}
            {/* </>} */}
              {/* {auth.user.role.includes("superAdmin") && */}
                <li className="nav-item">
                <Link to="alert" href="pages/widgets.html" className="nav-link">
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
              

                  </p>
                </Link>
              </li>
              {/* } */}

            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default NavSide;
