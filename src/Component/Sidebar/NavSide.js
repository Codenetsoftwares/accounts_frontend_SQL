import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Utils/Auth";
import Topimg from "../../Assets/Topimgg.png";
const NavSide = () => {
  const auth = useAuth();
  const [isToggle, setIsToggle] = useState(true);
  const [isTogglenav, setIsTogglenav] = useState(true);
  const [isToggleDash, setIsToggleDash] = useState(true);
  const [useremail, setUserEmail] = useState([]);

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
  const handleNavToggle = () => {
    setIsTogglenav(!isTogglenav);
  };
  return (
    <div>
      {/* {isTogglenav ? ( */}
      <aside
        className="main-sidebar elevation-4"
        style={{
          backgroundImage:

            "linear-gradient(270deg, rgba(254,216,216,1) 0%, rgba(255,135,98,1) 59%)",

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
              &nbsp;Happy Wave
            </span>
          </p>

            <div className="fs-4 ml-4" style={{width: '15%'}}   data-widget="pushmenu"  >x</div>
        </div>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
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

                    <Link to="admindash" className="nav-link text-white">
                      <i className="far fa-circle nav-icon" />
                      <p>DashBoard</p>
                    </Link>

                    <Link to="dashboard" className="nav-link text-white">
                      <i className="far fa-circle nav-icon" />
                      <p>Create Transaction</p>
                    </Link>
                  </li>
                )}
              </li>

              <li className="nav-item">
                <Link to="bank" href="pages/widgets.html" className="nav-link">
                  <i className="nav-icon fas fa-university"></i>
                  <p className="text-dark">
                    Bank View
                    {/* <span className="right badge badge-danger">New</span> */}
                  </p>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="createuser"
                  href="pages/widgets.html"
                  className="nav-link"
                >
                  &nbsp;<i className="nav-icon fas fa-user-plus"></i>
                  <p className="text-dark">
                    Create SubAdmin
                    {/* <span className="right badge badge-danger">New</span> */}
                  </p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="website" href="#" className="nav-link">
                  <i className="nav-icon fas fa-globe"></i>
                  <p className="text-dark">
                    Website View
                    {/* <i className="fas fa-angle-left right"></i>
                <span className="badge badge-info right">6</span> */}
                  </p>
                </Link>
                {/* <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="pages/layout/top-nav.html" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Top Navigation</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="pages/layout/top-nav-sidebar.html" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Top Navigation + Sidebar</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="pages/layout/boxed.html" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Boxed</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="pages/layout/fixed-sidebar.html" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Fixed Sidebar</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="pages/layout/fixed-sidebar-custom.html" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Fixed Sidebar <small>+ Custom Area</small></p>
                </a>
              </li>
              <li className="nav-item">
                <a href="pages/layout/fixed-topnav.html" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Fixed Navbar</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="pages/layout/fixed-footer.html" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Fixed Footer</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="pages/layout/collapsed-sidebar.html" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Collapsed Sidebar</p>
                </a>
              </li>
            </ul> */}
              </li>

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

                  <Link to="#" className="nav-link text-white">
                    <i className="far fa-circle nav-icon" />
                    <p>Introducer</p>
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link to="alert" href="pages/widgets.html" className="nav-link">
                  &nbsp;<i className="alert-icon fas fa-bell"></i>
                  <p className="text-dark">
                    &nbsp; Edit Request
                    {/* <span className="right badge badge-danger">New</span> */}
                  </p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      {/* // ) : null} */}
    </div>
  );
};

export default NavSide;
