import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../../Utils/Auth";

const TopNavbar = () => {
    const nav = useNavigate();
    const auth = useAuth();
    const handleLogout = () => {
        const response = true;
        if (response) {
          toast.success("Logout successfully");
          auth.logout();
          nav("/");
        }
    }
  return (
    <div>
      <nav class="navbar navbar-light fixed-top bg-dark justify-content-between">
        <button
          style={{
            
            border: "2px solid black",
            background: "black"
          }}
        >
          <Sidebar />
        </button>
        <form class="form">
          {/* <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          /> */}
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit"  onClick={handleLogout} style={{marginRight:'1rem'}}>
            Logout
          </button>
        </form>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default TopNavbar;
