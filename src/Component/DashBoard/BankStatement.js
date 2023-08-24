import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import { useParams } from "react-router";
import AccountService from "../../Services/AccountService";
import { toast } from "react-toastify";

const BankStatement = () => {
  const { id } = useParams();
  const auth = useAuth();
  const [Manualstmnt, SetManualstmnt] = useState([]);
  const [Userstmnt, SetUserstmnt] = useState([]);
  const [select, setSelect] = useState("Manual Entry");
  console.log(id);

  useEffect(() => {
    AccountService.GetBankStMent(id, auth.user)
      .then((res) => SetManualstmnt(res.data))
      .catch((err) => {
        // console.log(err.response.data.message);
        toast.err("No Details Found");
        console.error(err, "object");
      });
  }, [id, auth]);

  useEffect(() => {
    AccountService.GetBankuserStMent(id, auth.user)
      .then((res) => SetUserstmnt(res.data))
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error("No Details Found");
        console.error(err, "object");
      });
  }, [id, auth]);

  console.log("Bank Names Manual =>>>", Manualstmnt);
  console.log("Bank Names User =>>>", Userstmnt);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);
  };

  return (
    <div>
      <div className=" container mt-1">
        {/* This is for Normal View */}
        <div className="d-flex  ml-5  justify-content-center">
          <h6 className="fw-bold text-nowrap ">View</h6>
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
            <table className="table table-bordered">
              <thead>
                <tr className="text-center">
                  <th scope="col ">Txn Date & Time</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Transaction Type</th>
                  <th scope="col">Sub Admin Name</th>
                  <th scope="col">Before Balance</th>
                  <th scope="col">Current Balance </th>
                  <th scope="col">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {Manualstmnt.map((item, index) => (
                  <tr className="text-center" key={index}>
                    <td>
                      {new Date(item.createdAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>

                    {/* <td>{item.transactionID}</td> */}
                    {item.transactionType === "Manual-Deposit" ? (
                      <td style={{ color: "green" }}>{item.depositAmount}</td>
                    ) : (
                      <td style={{ color: "red" }}>{item.withdrawAmount}</td>
                    )}

                    <td
                      style={{
                        color:
                          item.transactionType === "Manual-Deposit"
                            ? "green"
                            : "red",
                      }}
                    >
                      {item.transactionType}
                    </td>
                    <td>{item.subAdminName}</td>
                    <td>{item.beforeBalance}</td>
                    <td>{item.currentBalance}</td>
                    <td>{item.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                  <h4 className="col fs-6 font-weight-bold">Bank</h4>
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
                          "default"
                        )}
                      </p>
                      <p className="col fs-6">{transaction.amount}</p>
                      <p className="col fs-6">{transaction.subAdminName}</p>
                      <p className="col fs-6">{transaction.userId}</p>
                      <p className="col fs-6">{transaction.bankName}</p>
                      <p className="col fs-6">{transaction.transactionType}</p>

                      <p className="col fs-6">
                        {transaction.transactionType === "Withdraw" ? (
                          <span style={{ color: "red" }}>
                            {transaction.beforeBalanceBankDeposit} -
                          </span>
                        ) : (
                          <span style={{ color: "green" }}>
                            {transaction.beforeBalanceBankDeposit} +
                          </span>
                        )}
                      </p>
                    </div>
                  ))
                ) : (
                  <h1>No Transaction found</h1>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankStatement;
