import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { customErrorHandler } from "../../Utils/helper";

const ResetPassword = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  console.log("Auth--->>>", auth.user.userName);

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      toast.error("Please Fill In All Password Fields.");
      return;
    }
    if (newPassword === confirmNewPassword) {
      const data = {
        userName: auth.user.userName,
        oldPassword: oldPassword,
        password: confirmNewPassword,
      };
      AccountService.ResetPassword(data, auth.user)
        .then((res) => {
          console.log("res", res);
          toast.success(res.data.message);
          navigate("/");
          toast.success("Please Log In Again With New Password");

          //   window.location.reload();
        })
        .catch((err) => {
          // console.log('error',err.response.data.message)
          toast.error(customErrorHandler(err));
          return;
        });
    } else {
      toast.error("Password Should be Same");
    }
  };

  const handleBackButton = (e) => {
    navigate("/welcome");
  };

  return (
    // <div className="container mt-5 pt-5 d-flex justify-content-center">
    //   <form
    //     onSubmit={handleSubmit}
    //     style={{ width: "30rem", border: "2px solid black" }}
    //   >
    //     <div className="ml-2 mr-2">
    //       <div className="form-group ">
    //         <label htmlFor="exampleInputEmail1 ">
    //           {" "}
    //           &nbsp;&nbsp;Old Password*
    //         </label>

    //         <input
    //           type="text"
    //           className="form-control"
    //           id="exampleInputEmail1"
    //           aria-describedby="emailHelp"
    //           placeholder="Old Password"
    //           value={oldPassword}
    //           onChange={handleOldPasswordChange}
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label htmlFor="exampleInputPassword1">
    //           &nbsp;&nbsp;New Password*
    //         </label>

    //         <input
    //           type="password"
    //           className="form-control"
    //           id="exampleInputPassword1"
    //           placeholder="New Password"
    //           value={newPassword}
    //           onChange={handleNewPasswordChange}
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label htmlFor="exampleInputPassword2">
    //           &nbsp;&nbsp;Confirm Password*
    //         </label>

    //         <input
    //           type="Text"
    //           className="form-control"
    //           id="exampleInputPassword2"
    //           placeholder="Confirm Password"
    //           value={confirmNewPassword}
    //           onChange={handleConfirmNewPasswordChange}
    //         />
    //       </div>
    //     </div>
    //     <div className="d-flex justify-content-center mb-2">
    //       <button type="submit" className="btn btn-primary">
    //         Reset
    //       </button>
    //       <button
    //         type="button"
    //         className="btn btn-primary ml-2"
    //         onClick={handleBackButton}
    //       >
    //         Back
    //       </button>
    //     </div>
    //   </form>
    // </div>

    <section className="content mt-2">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-success">
              <div className="card-header">
                <h3 className="card-title">Change Password</h3>
              </div>
              <form>
                <div className="card-body">
                  <div className="form-group">
                    <label for="exampleInputEmail1">Current Password</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Current Password *"
                      value={oldPassword}
                      onChange={handleOldPasswordChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New Password *"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputFile">Confirm Password</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Confirm Password *"
                      value={confirmNewPassword}
                      onChange={handleConfirmNewPasswordChange}
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    type="submit"
                    className="btn btn-success mr-2"
                    onClick={handleSubmit}
                  >
                    Change
                  </button>
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    onClick={handleBackButton}
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
