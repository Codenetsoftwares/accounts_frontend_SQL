import React from "react";
import { useAuth } from "../../Utils/Auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DashboardNavbar = () => {
  const nav = useNavigate();
  const auth = useAuth();
  // const handleLogout = () => {
  //     const response = window.confirm(
  //     'You are about to be logged out of this site'
  //   );
  //   if (response) {
  //     toast.success('Logout successfully');
  //     auth.logout();
  //     nav('/');
  //   }
  const handleLogout = () => {
    auth.logout();
    nav("/");
    toast.success("Logged out successfully");
    alert("Logged out");
  };


  return (

   

    <div>
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="wellcome ml-2">
          <a className="navbar-brand" href="#">
            <b>
              {" "}
              {auth.user.role === "deposit"
                ? "Welcome Depositor"
                : "Welcome Withdrawer"}
            </b>
          </a>
        </div>
        <div
          className="collapse navbar-collapse"
          id="navbarTogglerDemo03"
          style={{ marginLeft: "130rem" }}
        >
          <button
            className="btn btn-outline-success"
            type="submit"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
     
    </div>
   
    
  );
};
