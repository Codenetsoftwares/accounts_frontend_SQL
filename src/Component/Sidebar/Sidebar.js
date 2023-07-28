/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import { useAuth } from "../../Utils/Auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
const Sidebar = () => {
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const [mainMargin, setMainMargin] = useState(0);
  const auth = useAuth();
  const [userrole, setUserRole] = useState([]);
  console.log("Auth===>", auth);
 
  // const UserRole=[auth.user.role];
  // console.log("is Role??", UserRole);
  useEffect(() => {
   setUserRole(auth.user.role);
  }, [auth])
  console.log(userrole);

  // const isrole=UserRole.flat().includes('Dashboard');
  // console.log(isrole);
  // console.log("is Role??",role);
// setUserRole(auth.user.role);
// console.log("This is Role by Usestate",userrole);


  const openNav = () => {
    setSidebarWidth(250);
    setMainMargin(250);
  };

  const closeNav = () => {
    setSidebarWidth(0);
    setMainMargin(0);
  };

  return (
    <div>
      <div
        className="mySidebar"
        style={{
          height: "100%",
          width: `${sidebarWidth}px`,
          position: "fixed",
          zIndex: 1,
          top: 0,
          left: 0,
          backgroundColor: "#111",
          overflowX: "hidden",
          transition: "0.5s",
          paddingTop: "60px",
        }}
      >
        <center>
          <a
            href="#"
            className="closebtn"
            style={{
              position: "absolute",
              top: 0,
              right: "25px",
              fontSize: "36px",
              marginLeft: "50px",
              color: "#818181",
              textDecoration: "none",
            }}
            onClick={closeNav}
          >
            &times;
          </a>

          {userrole.includes("Dashboard") === true ||
          userrole.includes("superAdmin") === true ? (
            <Link to="/admindash">
              <a
                href="#"
                style={{
                  padding: "8px 60px 30px 32px",
                  textDecoration: "none",
                  fontSize: "25px",
                  color: "#818181",
                  display: "block",
                  transition: "0.3s",
                }}
              >
                <i class="nav-icon fas fa-tachometer-alt"></i>

                <small> DashBoard </small>
              </a>
            </Link>
          ) : null}

{userrole.includes("bank") === true ||
        userrole.includes("superAdmin") === true ? (
            <Link to="/bank">
              <a
                href="#"
                style={{
                  padding: "8px 54px 30px 32px",
                  textDecoration: "none",
                  fontSize: "25px",
                  color: "#818181",
                  display: "block",
                  transition: "0.3s",
                }}
              >
               <FontAwesomeIcon icon={faBuildingColumns} className="nav-icon" />
                <small> BankDetails </small>
              </a>
            </Link>
          ) : null}

{userrole.includes("website") === true ||
        userrole.includes("superAdmin") === true ? (
            <Link to="/website">
              <a
                href="#"
                style={{
                  padding: "8px 54px 30px 32px",
                  textDecoration: "none",
                  fontSize: "25px",
                  color: "#818181",
                  display: "block",
                  transition: "0.3s",
                }}
              >
                <FontAwesomeIcon icon={faGlobe} className="globe-icon" />
                <small> WebsiteDetails </small>
              </a>
            </Link>
          ) : null}


          {userrole.includes("create user") === true ||
        userrole.includes("superAdmin") === true ? (
            <Link to="/createuser">
              <a
                href="#"
                style={{
                  padding: "8px 54px 30px 32px",
                  textDecoration: "none",
                  fontSize: "25px",
                  color: "#818181",
                  display: "block",
                  transition: "0.3s",
                }}
              >
                <FaUserPlus />
                <small> Create SubAdmin </small>
              </a>
            </Link>
          ) : null}

          {userrole.includes("Create Transaction") === true ||
          userrole.includes("superAdmin") === true ? (
            <Link to="/dashboard">
              <a
                href="#"
                style={{
                  padding: "8px -2px 30px 32px",
                  textDecoration: "none",
                  fontSize: "25px",
                  color: "#818181",
                  display: "block",
                  transition: "0.3s",
                }}
              >
                <FaExchangeAlt />
                <small> Create Transaction</small>
              </a>
            </Link>
          ) : null}

          {userrole.includes("Alert") === true ||
         userrole.includes("superAdmin") === true ? (
            <Link to="/alert">
              <a
                href="#"
                style={{
                  padding: "30px 59px 8px 32px",
                  textDecoration: "none",
                  fontSize: "25px",
                  color: "#818181",
                  display: "block",
                  transition: "0.3s",
                }}
              >
                <FaExclamationTriangle />
                <small>Alert</small>
              </a>
            </Link>
          ) : null}
        </center>
      </div>

      <div
        id="main"
        style={{
          transition: "margin-left .5s",

          marginLeft: `${mainMargin}px`,
        }}
      >
        <button
          className="openbtn"
          style={{
            cursor: "pointer",
            backgroundColor: "#111",
            color: "white",
            width: "3rem",
            border: "none",
            height: "2rem",
          }}
          onClick={openNav}
        >
          &#9776;
        </button>
      </div>
    </div>
   
  );
};

export default Sidebar;
