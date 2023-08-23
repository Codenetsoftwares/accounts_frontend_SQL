import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
import { useAuth } from "../../Utils/Auth";
import { useParams } from "react-router";
import AccountService from "../../Services/AccountService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFilter } from "react-icons/fa";

const WebsiteStatement = () => {

  const { id } = useParams();
  const auth = useAuth();
  const [Manualstmnt, SetManualstmnt] = useState([]);
  const [Userstmnt, SetUserstmnt] = useState([]);

  const [select, setSelect] = useState("Manual Entry");
  console.log("This is Website Name", id);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);
  };

  useEffect(() => {
    AccountService.GetWebsiteStateMent(id, auth.user).then((res) =>
      SetManualstmnt(res.data)
    );
  }, [id, auth]);

  useEffect(() => {
    AccountService.GetWebsiteSmmry(id, auth.user).then((res) =>
      SetUserstmnt(res.data)
    );
  }, [id, auth]);

  console.log("Website Names Manual =>>>", Manualstmnt);
  console.log("Website Names User =>>>", Userstmnt);
  return (
    <div>
      <div className=" container mt-5">
        {/* This is for Normal View */}
        <div className="d-flex mt-5 mt-5 ml-5 pt-5 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2">View</h6>
          <select
            className="form-control mx-3 w-25 mb-2"
            value={select || ""}
            autoComplete="off"
            onChange={handleChange}
            style={{
              boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
              border: "0.5px solid black",
              borderRadius: "6px",
            }}
          >
            <option className="d-flex" value="Manual Entry">
              <b>Manual Entry</b>
            </option>
            <option className="d-flex" value="User Entry">
              <b>User Entry</b>
            </option>
          </select>
        </div>

        {select === "Manual Entry" ? (
          <div
            className="card  rounded-2 mb-2"
            style={{
              boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
              backgroundImage:
                "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
            }}
          >
            <div className="card rounded-2 mb-2">
              <div className="card-body">
                <div className="row">
                  <h4 className="col fs-6 font-weight-bold">Date</h4>
                  <h4 className="col fs-6 font-weight-bold">Amount</h4>
                  <h4 className="col fs-6 font-weight-bold">CreatedBy</h4>
                  <h4 className="col fs-6 font-weight-bold">Website</h4>
                  <h4 className="col fs-6 font-weight-bold">
                    Transaction Type
                  </h4>
                  <h4 className="col fs-6 font-weight-bold">Balance</h4>
                </div>
                <hr style={{ color: "green" }} />
                {Manualstmnt.length > 0 ? (
                  Manualstmnt.map((transaction, index) => (
                    <div className="row" key={index}>
                      <p className="col fs-6">
                        {new Date(transaction.createdAt).toLocaleString(
                          "default",
                          {
                            month: "long",
                          }
                        )}{" "}
                        {new Date(transaction.createdAt).getDate()}
                      </p>
                      <p className="col fs-6">{transaction.depositAmount}</p>
                      <p className="col fs-6">{transaction.subAdminName}</p>
                      <p className="col fs-6">{transaction.websiteName}</p>
                      <p className="col fs-6">{transaction.transactionType}</p>
                      <p className="col fs-6">
                        {transaction.transactionType === "Withdraw" ? (
                          <span style={{ color: "red" }}>
                            {transaction.currentBalance} -
                          </span>
                        ) : (
                          <span style={{ color: "green" }}>
                            {transaction.currentBalance} +
                          </span>
                        )}
                      </p>
                    </div>
                  ))
                ) : (
                  <h1>No Transaction Found</h1>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="card  rounded-2 mb-2"
            style={{
              boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
              backgroundImage:
                "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
            }}
          >
            <div className="card rounded-2 mb-2">
              <div className="card-body">
                <div className="row">
                  <h4 className="col fs-6 font-weight-bold">Date</h4>
                  <h4 className="col fs-6 font-weight-bold">Amount</h4>
                  <h4 className="col fs-6 font-weight-bold">CreatedBy</h4>
                  <h4 className="col fs-6 font-weight-bold">User Id</h4>
                  <h4 className="col fs-6 font-weight-bold">Website</h4>
                  <h4 className="col fs-6 font-weight-bold">
                    Transaction Type
                  </h4>
                  <h4 className="col fs-6 font-weight-bold">Balance</h4>
                </div>
                <hr style={{ color: "green" }} />
                {Userstmnt.length > 0 ? (
                  Userstmnt.map((transaction, index) => (
                    <div className="row" key={index}>
                      <p className="col fs-6">
                        {new Date(transaction.createdAt).toLocaleString(
                          "default",
                          {
                            month: "long",
                          }
                        )}{" "}
                        {new Date(transaction.createdAt).getDate()}
                      </p>
                      <p className="col fs-6">{transaction.amount}</p>
                      <p className="col fs-6">{transaction.subAdminName}</p>
                      <p className="col fs-6">{transaction.userId}</p>
                      <p className="col fs-6">{transaction.websiteName}</p>
                      <p className="col fs-6">{transaction.transactionType}</p>

                      <p className="col fs-6">
                        {transaction.transactionType === "Withdraw" ? (
                          <span style={{ color: "red" }}>
                            {transaction.amount} -
                          </span>
                        ) : (
                          <span style={{ color: "green" }}>
                            {transaction.amount} +
                          </span>
                        )}
                      </p>
                    </div>
                  ))
                ) : (
                  <h1>No Transaction Found</h1>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteStatement;
