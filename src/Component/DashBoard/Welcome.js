import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const Welcome = () => {
  // const birdsContainerStyle = {
  //   position: "absolute",
  //   top: "15vw",
  //   animationName: "birdsFlying",
  //   animationDelay: "0s",
  //   animationDuration: "30s",
  //   animationIterationCount: "infinite",
  //   animationTimingFunction: "linear",
  //   zIndex: "-1"
  // };

  // const welcomeStyle = {
  //   color: "#3f5efb",
  //   textShadow: "2px 2px 5px black",
  //   position: "fixed",
  //   textAlign: "center",
  //   height: "100vh",
  //   lineHeight: "100vh",
  //   fontSize: "40px",
  //   fontFamily: '"Courier New", Courier, monospace',
  //   width: "100%",
  //   top: "0",
  //   left: "0",
  //   zIndex: "0"
  // };

  return (
    
    <div className='container d-flex justify-content-center'>
        <div className="d-flex flex-column min-vh-100">
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="/">
              CRM Software
            </a>
          </div>
        </nav>
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <div className="container text-center">
            <h1 className="display-4">Welcome to Our CRM Software</h1>
            <p className="lead">
              This is our central hub for managing accounts.
            </p>
            <div className="Guidance p-4 border rounded">
              <h2>Getting Started</h2>
              <p>Follow these steps to start using the CRM:</p>
              <ol className='list-group list-group-numbered'>
                  <li className='list-group-item'>
                    Create an account or log in.
                  </li>
                  <li className='list-group-item'>
                    Add transactions to the database.
                  </li>
                  <li className='list-group-item'>
                    Utilize essential menu items in the sidebar.
                  </li>
                  <li className='list-group-item'>
                    Access the dashboard page for insights.
                  </li>
                  <li className='list-group-item'>
                    Transactions created are automatically updated in the
                    dashboard.
                  </li>
                  <li className='list-group-item'>
                   The user can see the bank account details in the bank view menu as well the bank details can be edited in this particular page. 
                  </li>
                  <li className='list-group-item'>
                 In the create user menu one can can give access to the provided selections as per the options provided in this particular menu item. 
                  </li>
                  <li className='list-group-item'>
                    Utilize analytics to gain insights.
                  </li>
                
                </ol>
             
            </div>
          </div>
        </div>
        <footer className="bg-dark text-white text-center py-3" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
          &copy; 2023 CRM Software. All rights reserved.
        </footer>
      </div>

 
    </div>
  )
}

export default Welcome
