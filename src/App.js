
// import './App.css';
import LoginWth from '../src/Component/Login/LoginWth';
import AdminDash from '../src/Component/DashBoard/AdminDash';
import Dashboard from './Component/DashBoard/Dashboard';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import React from 'react';
import { AuthProvider } from './Utils/Auth';
import {RequireAuth} from './Utils/RequireAuth'
import { ToastContainer } from 'react-toastify';
import EditTransaction from './Component/DashBoard/EditTransaction';

function App() {
  return (
    
       <React.Fragment>
         <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
        <AuthProvider>
        <BrowserRouter>
     <Routes>
      <Route index element={<LoginWth/>}/>
      <Route path='admindash' element={<RequireAuth><AdminDash/></RequireAuth>}/>
      <Route path='dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}/>
      <Route path='admindash/:id' element={<RequireAuth><EditTransaction/></RequireAuth>} />
     </Routes>
      </BrowserRouter>
      </AuthProvider>
      {/* <AdminDash/>
      <Dashboard/> */}
      </React.Fragment>   
  );
}

export default App;
