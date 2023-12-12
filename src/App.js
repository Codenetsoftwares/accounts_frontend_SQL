import "./App.css";
import React from "react";
import { AuthProvider } from "./Utils/Auth";
import { ToastContainer } from "react-toastify"
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
        <AppRoutes />
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
