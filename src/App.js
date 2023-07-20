
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
import Sidebar from './Component/Sidebar/Sidebar';
import TopNavbar from './Component/Sidebar/TopNavbar';
import CreateUser from './Component/DashBoard/CreateUser';
import Alert from './Component/DashBoard/Alert';
import ForPas from './Component/Login/ForPas';


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
      
          <Route path='/' element={<TopNavbar />}>
            <Route path='admindash'  element={<RequireAuth><AdminDash/></RequireAuth>} />
            <Route path='dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}/>
            <Route path='createuser' element={<RequireAuth><CreateUser/></RequireAuth>}/>
            <Route path='alert' element={<RequireAuth><Alert/></RequireAuth>}/>
          </Route>
        
      {/* <Route path='admindash' element={<RequireAuth><AdminDash/></RequireAuth>}/> */}
      {/* <Route path='dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}/> */}
      <Route path='admindash/:id' element={<RequireAuth><EditTransaction/></RequireAuth>} />
      <Route path='sidebar' element={<RequireAuth><Sidebar/></RequireAuth>} />
      <Route path='forpas' element={<ForPas/>} />

     </Routes>
      </BrowserRouter>
      </AuthProvider>
      {/* <AdminDash/>
      <Dashboard/> */}
      </React.Fragment>   
  );
}

export default App;
