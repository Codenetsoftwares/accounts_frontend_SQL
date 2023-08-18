/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAuth } from "../../Utils/Auth";
import { toast } from "react-toastify";
const TopNavbar = () => {
  const nav = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    const response = true;
    if (response) {
      auth.logout();
      alert("You are going to Logout from this site");
      toast.success("Logout successfully");
      nav("/");
    }
  };
  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light ">
        <ul className="navbar-nav" >
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              role="button"
              data-widget="pushmenu"
            >    
              <i className="fas fa-bars"></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="welcome" className="nav-link">
              Home
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="fullscreen"
              href="#"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt"></i>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="control-sidebar"
              data-controlsidebar-slide="true"
              href="#"
              role="button"
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt" style={{ color: "red" }}></i>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default TopNavbar;
