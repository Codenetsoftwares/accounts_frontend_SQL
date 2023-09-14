import React, { useState } from "react";
import { useAuth } from "../../Utils/Auth";
import TransactionSercvice from "../../Services/TransactionSercvice";

const EditTransaction = ({ Data }) => {
  const auth = useAuth();
  const [EditData, SetEditData] = useState({
    amount: "",
    bankName: "",
    paymentMethod: "",
    subAdminName: "",
    transactionID: "",
    transactionType: "",
    userId: "",
    websiteName: "",
    depositAmount: "",
    withdrawAmount: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetEditData({ ...EditData, [name]: value });
  };
  const handleSubmit = (e, transactionType) => {
   
   
    e.preventDefault();

    const flag = true;
    const data = {
      transactionID: EditData.transactionID,
      transactionType: EditData.transactionType,
      amount: EditData.amount,
      paymentMethod: EditData.paymentMethod,
      userId: EditData.userId,
      subAdminId: EditData.subAdminName,
      bankName: EditData.Bank,
      websiteName: EditData.Website,
      isSubmit: flag,
    };
    const dataWithdraw = {
      transactionID: EditData.transactionID,
      transactionType: EditData.transactionType,
      withdrawAmount: EditData.amount,
      paymentMethod: EditData.paymentMethod,
      userId: EditData.userId,
      subAdminId: EditData.subAdminName,
      bankName: EditData.Bank,
      websiteName: EditData.Website,
    };

    const dataDeposit = {
      transactionID: EditData.transactionID,
      transactionType: EditData.transactionType,
      depositAmount: EditData.amount,
      paymentMethod: EditData.paymentMethod,
      userId: EditData.userId,
      subAdminId: EditData.subAdminName,
      bankName: EditData.Bank,
      websiteName: EditData.Website,
    };

    switch (transactionType) {
      case "Deposit":
        TransactionSercvice.editTransactionData(Data.id, data, auth.user)
          .then((res) => {
            alert(res.data);
            window.location.reload();
          })
          .catch((err) => {
            alert(err);
          });
        break;
      case "Withdraw":
        TransactionSercvice.editTransactionData(Data.id, data, auth.user)
          .then((res) => {
            alert('withdraw', res.data);
            window.location.reload();
          })
          .catch((err) => {
            alert(err);
          });
        break;

      case "Manual-Bank-Withdraw":
        TransactionSercvice.editBnkTransactionData(
          Data.id,
          dataWithdraw,
          auth.user
        )
          .then((res) => {
            alert(res.data);
            window.location.reload();
          })
          .catch((err) => {
            alert(err);
          });
        break;

      case "Manual-Bank-Deposit":
        TransactionSercvice.editBnkTransactionData(
          Data.id,
          dataDeposit,
          auth.user
        )
          .then((res) => {
            alert(res.data);
            window.location.reload();
          })
          .catch((err) => {
            alert(err);
          });
        break;

      case "Manual-Website-Withdraw":
        TransactionSercvice.editWebTransactionData(
          Data.id,
          dataWithdraw,
          auth.user
        )
          .then((res) => {
            alert(res.data);
            window.location.reload();
          })
          .catch((err) => {
            alert(err);
          });
        break;

      case "Manual-Website-Deposit":
        TransactionSercvice.editWebTransactionData(
          Data.id,
          dataDeposit,
          auth.user
        )
          .then((res) => {
            alert(res.data);
            window.location.reload();
          })
          .catch((err) => {
            alert(err);
          });
        break;

      default:
      // code block
    }
  };
  return (
    <div>
      <div
        className="modal fade"
        id="edittransaction"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Provide New Name
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <small>Edit By</small>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control font-weight-bold"
                    disabled
                    value={auth.user.email}
                    style={{ fontSize: "10px" }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="Amount"
                    name="amount"
                    value={EditData.amount}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className="form-control mb-1 "
                    placeholder="bankName"
                    value={EditData.bankName}
                    onChange={handleChange}
                    name="bankName"
                  />
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="paymentMethod"
                    value={EditData.paymentMethod}
                    onChange={handleChange}
                    name="paymentMethod"
                  />
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="subAdminName"
                    value={EditData.subAdminName}
                    onChange={handleChange}
                    name="subAdminName"
                  />
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="transactionID"
                    value={EditData.transactionID}
                    onChange={handleChange}
                    name="transactionID"
                  />
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="transactionID"
                    value={Data.transactionType}
                    onChange={handleChange}
                    name="transactionType"
                  />
                  {/* <select
                    className="form-control mb-1"
                    value={Data.transactionType || ""}
                    autoComplete="off"
                    name="transactionType"
                    onChange={handleChange}
                  >
                    <option className="d-flex" value="Deposit">
                      <b>Deposit</b>
                    </option>
                    <option className="d-flex" value="Withdraw">
                      <b>Withdraw</b>
                    </option>
                    <option className="d-flex" value="Manual-Bank-Deposit">
                      <b>Manual Bank Deposit</b>
                    </option>{" "}
                    <option className="d-flex" value="Manual-Bank-Withdraw">
                      <b>Manual Bank Withdraw</b>
                    </option>
                    <option className="d-flex" value="Manual-Website-Deposit">
                      <b>Manual Website Deposit</b>
                    </option>{" "}
                    <option className="d-flex" value="Manual-Website-Withdraw">
                      <b>Manual Website Withdraw</b>
                    </option>
                  </select> */}
                  {/* <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="userId"
                    value={EditData.userId}
                    onChange={handleChange}
                    name="userId"
                  /> */}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="websiteName"
                    value={EditData.websiteName}
                    name="websiteName"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={(e) => handleSubmit(e, Data.transactionType)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTransaction;
