import "./App.css";
import LoginWth from "../src/Component/Login/LoginWth";
import AdminDash from "../src/Component/DashBoard/AdminDash";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./Utils/Auth";
import { RequireAuth } from "./Utils/RequireAuth";
import { ToastContainer } from "react-toastify";
import EditTransaction from "./Component/DashBoard/EditTransaction";
// import TopNavbar from "./Component/Sidebar/TopNavbar";
import CreateUser from "./Component/DashBoard/CreateUser";
import Alert from "./Component/DashBoard/Alert";
import ForPas from "./Component/Login/ForPas";
import Welcome from "./Component/DashBoard/Welcome";
// import BankDetails from "./Component/DashBoard/BankDetails";
import WebsiteDetails from "./Component/DashBoard/WebsiteDetails";

import AdminLayout from "./Component/Sidebar/AdminLayout";
// import GetBank from "./Component/DashBoard/GetBank";
import AdminBank from "./Component/DashBoard/AdminBank";
import UserProfile from "./Component/DashBoard/UserProfile";
import InnerUserProfile from "./Component/DashBoard/InnerUserProfile";
import TransactionDetails from "./Component/DashBoard/TransactionDetails";
import EditBank from "./Component/EditBank";
import CreateTransaction from "./Component/DashBoard/CreateTransaction";
import WebsiteStatement from "./Component/DashBoard/WebsiteStatement";
import BankStatement from "./Component/DashBoard/BankStatement";
import CreateActualUser from "./Component/DashBoard/CreateActualUser";
import CreateIntroducer from "./Component/DashBoard/CreateIntroducer";
import IntroducerProfile from "./Component/DashBoard/IntroducerProfile";
import InnerIntroducer from "./Component/DashBoard/InnerIntroducer";
import ButtonDemo from "./Component/DashBoard/ButtonDemo";
import Withdraw from "./Component/DashBoard/Withdraw";
import Deposit from "./Component/DashBoard/Deposit";
import EditWebTransaction from "./Component/DashBoard/EditWebTransaction";
import EditBnkTransaction from "./Component/DashBoard/EditBnkTransaction ";
import AdminList from "./Component/SuperAdmin/AdminList";
import AdminEditrole from "./Component/SuperAdmin/AdminEditrole";
import DuplicateDashboard from "./Component/DashBoard/DuplicateDashboard";
import SingleIntroducer from "./Component/DashBoard/SingleIntroducer";
import IntroShowPr from "./Component/DashBoard/IntroShowPr";
import EditProfileSubadmin from "./Component/SuperAdmin/EditProfileSubadmin";
import BankDelete from "./Component/DashBoard/Request/Bank/BankDelete";
import BankEdit from "./Component/DashBoard/Request/Bank/BankEdit";
import WebsiteDelete from "./Component/DashBoard/Request/Website/WebsiteDelete";
import WebsiteEdit from "./Component/DashBoard/Request/Website/WebsiteEdit";
import ErrorPage from "./pages/ErrorPage";
import Login from "./Component/Login/Login";
import MainTransactionPage from "./pages/TransactionPage/MainTransactionPage";
import IntroducerStatement from "./Component/DashBoard/IntroducerStatement";
import IntroducerAlert from "./Component/IntroducerAlert";
import ResetPassword from "./Component/DashBoard/ResetPassword";
import WebsiteTransactionPage from "./pages/TransactionPage/WebsiteTransactionPage";
import BankTransactionPage from "./pages/TransactionPage/BankTransactionPage";
import MyTxn from "./Component/DashBoard/MyTxn";
import NewBank from "./NewBank&Website/NewBank";
import NewWebsite from "./NewBank&Website/NewWebsite";
import TrashAllTransaction from "./Component/TrashAllTransaction";
import TrashIntroducerTransaction from "./Component/TrashIntroducerTransaction";
import AppRoutes from "./Routes/AppRoutes";

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
        {/* <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<AdminLayout />}> 
           
             
            
            

            
            
          
          
          
        </Routes>
      </BrowserRouter> */}
        <AppRoutes />
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
