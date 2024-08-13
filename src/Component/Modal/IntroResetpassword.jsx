import React, { useState } from "react";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import { toast } from "react-toastify";
import { customErrorHandler } from "../../Utils/helper";

const IntroResetpassword = ({ UserName }) => {
  const auth = useAuth();
  const [password, setPassword] = useState("");
  const [Cpassword, setCpassword] = useState("");

  const handleResetpassword = (e) => {
    e.preventDefault();

    if (password !== Cpassword) {
      alert("Passwords do not match.");
      return;
    }

    const data = {
      userName: UserName,
      password: Cpassword,
    };

    AccountService.IntoducerResetPassword(data, auth.user)
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        alert(customErrorHandler(err));
      });
  };

  return (
    <div className="collapse" id="collapseExample">
      <div className="container card card-body">
        <input
          type="text"
          className="form-control mb-1"
          value={UserName}
          disabled
        />
        <input
          type="password"
          className="form-control mb-1"
          placeholder="Password *"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Confirm Password *"
          value={Cpassword}
          onChange={(e) => setCpassword(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-success"
          onClick={handleResetpassword}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default IntroResetpassword;
