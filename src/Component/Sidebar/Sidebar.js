/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChartLine } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa';
import { FaExchangeAlt } from 'react-icons/fa';
import { FaAddressBook } from 'react-icons/fa';

const Sidebar = () => {
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const [mainMargin, setMainMargin] = useState(0);

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
          paddingTop: "60px"
        }}
      >
        <a
          href="javascript:void(0)"
          className="closebtn"
          style={{
            position: "absolute",
            top: 0,
            right: "25px",
            fontSize: "36px",
            marginLeft: "50px",
            color: "#818181",
            textDecoration: "none"
          }}
          onClick={closeNav}
        >
          &times;
        </a>
        <Link to="/admindash">
          {" "}
          
          <a
            href="#"
            style={{
              padding: "8px 60px 8px 32px",
              textDecoration: "none",
              fontSize: "25px",
              color: "#818181",
              display: "block",
              transition: "0.3s"
            }}
          >
            <FaChartLine />
           <small> DashBoard </small>
          </a>
        </Link>
        <Link to="/services">
          <a
            href="#"
            style={{
              padding: "8px 54px 8px 32px",
              textDecoration: "none",
              fontSize: "25px",
              color: "#818181",
              display: "block",
              transition: "0.3s"
            }}
          >
             <FaUserPlus />
           <small> Create User </small>
          </a>
        </Link>
        <Link to="/dashboard">
          <a
            href="#"
            style={{
              padding: "8px -2px 8px 32px",
              textDecoration: "none",
              fontSize: "25px",
              color: "#818181",
              display: "block",
              transition: "0.3s"
            }}
          >
             <FaExchangeAlt />
           <small> Create Transaction</small>
          </a>
        </Link>
        <Link to="/contact">
          <a
            href="#"
            style={{
              padding: "8px 59px 8px 32px",
              textDecoration: "none",
              fontSize: "25px",
              color: "#818181",
              display: "block",
              transition: "0.3s"
            }}
          >
             <FaAddressBook />
            <small>Contact</small>
          </a>
        </Link>
      </div>

      <div
        id="main"
        style={{
          transition: "margin-left .5s",
          
          marginLeft: `${mainMargin}px`
        }}
      >
        <button
          className="openbtn"
          style={{
            cursor: "pointer",
            backgroundColor: "#111",
            color: "white",
            width:"3rem",
            border: "none",
            height:'2rem'
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
