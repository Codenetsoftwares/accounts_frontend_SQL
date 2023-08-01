// import './App.css';
import LoginWth from "../src/Component/Login/LoginWth";
import AdminDash from "../src/Component/DashBoard/AdminDash";
import Dashboard from "./Component/DashBoard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { AuthProvider } from "./Utils/Auth";
import { RequireAuth } from "./Utils/RequireAuth";
import { ToastContainer } from "react-toastify";
import EditTransaction from "./Component/DashBoard/EditTransaction";
import TopNavbar from "./Component/Sidebar/TopNavbar";
import CreateUser from "./Component/DashBoard/CreateUser";
import Alert from "./Component/DashBoard/Alert";
import ForPas from "./Component/Login/ForPas";
import Welcome from "./Component/DashBoard/Welcome";
import BankDetails from "./Component/DashBoard/BankDetails";
import WebsiteDetails from "./Component/DashBoard/WebsiteDetails";
import UserDetails from "./Component/DashBoard/UserDetails";
import AdminLayout from "./Component/Sidebar/AdminLayout";

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

            <Route path="/" element={<AdminLayout/>}>
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
                    <BankDetails/>
                  </RequireAuth>
                }
              />

              <Route
                path="website"
                element={
                  <RequireAuth>
                    <WebsiteDetails/>
                  </RequireAuth>
                }
              />

                <Route
                path="user"
                element={
                  <RequireAuth>
                    <UserDetails/>
                  </RequireAuth>
                }
              />


              <Route
                path="dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
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
