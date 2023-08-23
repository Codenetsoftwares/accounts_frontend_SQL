// import './App.css';
import LoginWth from "../src/Component/Login/LoginWth";
import AdminDash from "../src/Component/DashBoard/AdminDash";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { AuthProvider } from "./Utils/Auth";
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
            <Route index element={<LoginWth />} />

            <Route path="/" element={<AdminLayout />}>
              <Route
                path="welcome"
                element={
                  <RequireAuth>
                    <Welcome />
                  </RequireAuth>
                }
              />
              <Route
                path="admindash"
                element={
                  <RequireAuth>
                    <AdminDash />
                  </RequireAuth>
                }
              />
              <Route
                path="bank"
                element={
                  <RequireAuth>
                    <AdminBank />
                  </RequireAuth>
                }
              />

              <Route
                path="website"
                element={
                  <RequireAuth>
                    <WebsiteDetails />
                  </RequireAuth>
                }
              />

              <Route
                path="websitestatement/:id"
                element={
                  <RequireAuth>
                    <WebsiteStatement />
                  </RequireAuth>
                }
              />

              <Route
                path="bankstatement/:id"
                element={
                  <RequireAuth>
                    <BankStatement />
                  </RequireAuth>
                }
              />

              <Route
                path="userprofile"
                element={
                  <RequireAuth>
                    <UserProfile />
                  </RequireAuth>
                }
              />

              <Route
                path="dashboard"
                element={
                  <RequireAuth>
                    <CreateTransaction />
                  </RequireAuth>
                }
              />
              <Route
                path="createuser"
                element={
                  <RequireAuth>
                    <CreateUser />
                  </RequireAuth>
                }
              />
              <Route
                path="createactualuser"
                element={
                  <RequireAuth>
                    <CreateActualUser />
                  </RequireAuth>
                }
              />
              <Route
                path="innerprofile/:id"
                element={
                  <RequireAuth>
                    <InnerUserProfile />
                  </RequireAuth>
                }
              />

              <Route
                path="transactiondetails/:id"
                element={
                  <RequireAuth>
                    <TransactionDetails />
                  </RequireAuth>
                }
              />
              <Route
                path="alert"
                element={
                  <RequireAuth>
                    <Alert />
                  </RequireAuth>
                }
              />
            </Route>

            {/* <Route path='admindash' element={<RequireAuth><AdminDash/></RequireAuth>}/> */}
            {/* <Route path='dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}/> */}
            <Route
              path="admindash/:id"
              element={
                <RequireAuth>
                  <EditTransaction />
                </RequireAuth>
              }
            />
            <Route
              path="editbank/:id"
              element={
                <RequireAuth>
                  <EditBank />
                </RequireAuth>
              }
            />
            <Route path="forpas" element={<ForPas />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      {/* <AdminDash/>
      <Dashboard/> */}
    </React.Fragment>
  );
}

export default App;
