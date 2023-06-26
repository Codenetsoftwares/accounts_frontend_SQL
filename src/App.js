
// import './App.css';
import LoginWth from '../src/Component/Login/LoginWth';
import AdminDash from '../src/Component/DashBoard/AdminDash';
import Dashboard from './Component/DashBoard/Dashboard';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import React from 'react';
function App() {
  return (
    
       <React.Fragment>
        <BrowserRouter>
     <Routes>
      <Route index element={<LoginWth/>}/>
      <Route path='admindash' element={<AdminDash/>}/>
      <Route path='dashboard' element={<Dashboard/>}/>
     </Routes>
      </BrowserRouter>
      {/* <AdminDash/>
      <Dashboard/> */}
      </React.Fragment>
    
    
  );
}

export default App;
