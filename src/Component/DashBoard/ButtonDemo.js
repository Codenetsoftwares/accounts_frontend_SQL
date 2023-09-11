import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Utils/Auth";
import Deposit from "../../Assets/Deposit.jpg";
import Withdraw from "../../Assets/Withdraws.jpg";

function ButtonDemo() {
  const auth = useAuth();
  const [userrole, setUserRole] = useState([]);

  useEffect(() => {
    setUserRole(auth.user.role);
  }, [auth]);
  return (
    <div className="container-fluid">
      <div
        className="row justify-content-center align-items-center min-vh-100"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,114,53,1) 0%, rgba(250,255,53,1) 52%, rgba(255,114,53,1) 100%)",
        }}
      >
        <div className="col-md-6 text-center">
          <div className="row ">
            <div className="col-md-6">
              {userrole.some(
                (role) =>
                  role === "superAdmin" ||
                  role === "Dashboard-View" ||
                  role === "Create-Deposit-Transaction" ||
                  role === "Create-Withdraw-Transaction" ||
                  role === "Create-Transaction"
              ) && (
                <Link to="/withdraw" style={{ cursor: "pointer" }}>
                  <div class="card" style={{ width: "18rem"}}>
                    <img
                      class="card-img-top"
                      src={Withdraw}
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <p class="card-text">
                        <b>Withdraw</b>
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
            <div className="col-md-6">
              {userrole.some(
                (role) =>
                  role === "superAdmin" ||
                  role === "Dashboard-View" ||
                  role === "Create-Deposit-Transaction" ||
                  role === "Create-Withdraw-Transaction" ||
                  role === "Create-Transaction"
              ) && (
                <Link to="/deposit" style={{ cursor: "pointer" }}>
                  <div class="card" style={{ width: "18rem" }}>
                    <img
                      class="card-img-top"
                      src={Deposit}
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <p class="card-text">
                        <b>Deposit</b>
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ButtonDemo;
