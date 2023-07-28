import React from "react";
import { useAuth } from "../../Utils/Auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const DashboardNavbar = () => {
  const nav = useNavigate();
  const auth = useAuth();
  console.log(auth)
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
    // alert("Logged out");
  };


  return (

   

    <div>
     <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
        <span className="navbar-brand" href="#">
            <b>
              Welcome
            </b>
          </span>
          <form className="d-flex">
          <span
      className="input-group-text"
      style={{
        backgroundColor: "transparent",
        border: "0",
        animationName: "spin",
        animationDuration: "1s",
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
      }}
    >
      <FontAwesomeIcon icon={faUser} />
    </span>
            <span
              className="input-group-text mr-1"
              style={{ backgroundColor: "transparent", border: "0" }}
            >
              {auth.user.role === "deposit"
                ? "Hi Depositor"
                : "Hi Withdrawer"}
            </span>
            <button
              className="btn btn-outline-danger"
              type="submit"
              onClick={handleLogout}
            >
              Logout
            </button>
          </form>
        </div>
      </nav>











    </div>
   
    
  );
};
