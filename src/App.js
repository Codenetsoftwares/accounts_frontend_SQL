
// import './App.css';
import LoginWth from '../src/Component/Login/LoginWth';
import AdminDash from '../src/Component/DashBoard/AdminDash';
import Dashboard from './Component/DashBoard/Dashboard';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import React from 'react';
import { AuthProvider } from './Utils/Auth';
function App() {
  return (
    
       <React.Fragment>
        <AuthProvider>
        <BrowserRouter>
     <Routes>
      <Route index element={<LoginWth/>}/>
      <Route path='admindash' element={<AdminDash/>}/>
      <Route path='dashboard' element={<Dashboard/>}/>
     </Routes>
      </BrowserRouter>
      </AuthProvider>
      {/* <AdminDash/>
      <Dashboard/> */}
      </React.Fragment>   
  );
}

export default App;
