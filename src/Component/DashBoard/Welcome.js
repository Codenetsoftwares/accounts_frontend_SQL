
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import useLocalStorage from "use-local-storage";

const Welcome = () => {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  // const [theme, setTheme] = useLocalStorage(
  //   "theme",
  //   defaultDark ? "dark" : "light"
  // );

 


  return (
    <div
      className="container-fluid  mb-3 "
    >
      <nav className="navbar navbar-dark bg-dark py-2 ">
        <div className="container">
          <a className="navbar-brand" href="/">
            CRM Software
          </a>
        </div>
      </nav>
      <div className="d-flex flex-column ">
        <div
          className="flex-grow-1 d-flex justify-content-center align-items-center"
          style={{
            minHeight: "calc(100vh - 120px)",
            background:
              "linear-gradient(90deg, rgba(23,183,184,1) 0%, rgba(23,184,155,0.9668242296918768) 100%)",
          }}
        >
          <div className="container text-center">
            <h1 className="display-5">Welcome to Our CRM Software</h1>

            <p className="lead">
              This is our central hub for managing accounts.
            </p>
            <div className="Guidance p-4 border rounded">
              <h2>Getting Started</h2>
              <p>Follow these steps to start using the CRM:</p>

              <ol
                className="mt-4 p-5 bg-primary text-white rounded list-group list-group-numbered"
                style={{ textAlign: "left" }}
              >
                <li className="list-group-item">
                  Create an account or log in.
                </li>
                <li className="list-group-item">
                  Add transactions to the database.
                </li>
                <li className="list-group-item">
                  Utilize essential menu items in the sidebar.
                </li>
                <li className="list-group-item">
                  Access the dashboard page for insights.
                </li>
                <li className="list-group-item">
                  Transactions created are automatically updated in the
                  dashboard.
                </li>
                <li className="list-group-item">
                  The user can see the bank account details in the bank view
                  menu as well the bank details can be edited in this particular
                  page.
                </li>
                <li className="list-group-item">
                  In the create user menu one can can give access to the
                  provided selections as per the options provided in this
                  particular menu item.
                </li>
                <li className="list-group-item">
                  Utilize analytics to gain insights.
                </li>
              </ol>
            </div>
          </div>
          <footer
            className="bg-dark text-white text-center py-1"
            style={{
              position: "fixed",
              bottom: "0",
              width: "100%",
              zIndex: "10",
            }}
          >
            &copy; 2023 CODENET Software. All rights reserved.
          </footer>
        </div>
      </div>

    </div>
  );
};

export default Welcome;
