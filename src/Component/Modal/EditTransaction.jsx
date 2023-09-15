import React, { useState } from "react";
import { useAuth } from "../../Utils/Auth";
import TransactionSercvice from "../../Services/TransactionSercvice";

const EditTransaction = ({ Data }) => {
  console.log(Data)
  const auth = useAuth();
  console.log(auth)
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleToggleEdit = (e) => {
    e.preventDefault();

    setIsEditing(!isEditing);
    setEditedData([]);
  };
  const handleClose = () => {
    setIsEditing(false);
  }
  const handleSubmit = (e, transactionType, field) => {
    e.preventDefault();
    setIsEditing(false);
    setEditedData({ ...editedData, [field]: "" });

    const data = {
      transactionID: editedData.transactionID,
      transactionType: editedData.transactionType,
      amount: editedData.amount,
      paymentMethod: editedData.paymentMethod,
      userId: editedData.userId,
      subAdminId: editedData.subAdminName,
      bankName: editedData.Bank,
      websiteName: editedData.Website,

    };
    const dataWithdraw = {
      transactionID: editedData.transactionID,
      transactionType: editedData.transactionType,
      withdrawAmount: editedData.amount,
      paymentMethod: editedData.paymentMethod,
      userId: editedData.userId,
      subAdminId: editedData.subAdminName,
      bankName: editedData.Bank,
      websiteName: editedData.Website,
    };

    const dataDeposit = {
      transactionID: editedData.transactionID,
      transactionType: editedData.transactionType,
      depositAmount: editedData.amount,
      paymentMethod: editedData.paymentMethod,
      userId: editedData.userId,
      subAdminId: editedData.subAdminName,
      bankName: editedData.Bank,
      websiteName: editedData.Website,
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
                onClick={handleClose}
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
                    className="form-control font-weight-bold fs-6"
                    disabled
                    value={auth.user.userName}
                    style={{ fontSize: "10px" }}
                  />
                </div>
                {Data && (<div>
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="Amount"
                    name="amount"
                    value={isEditing
                      ? editedData.amount
                      : Data.amount}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className="form-control mb-1 "
                    placeholder="bankName"
                    value={isEditing
                      ? editedData.bankName
                      : Data.bankName}
                    onChange={handleChange}
                    name="bankName"
                  />
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="paymentMethod"
                    value={isEditing
                      ? editedData.paymentMethod
                      : Data.paymentMethod}
                    onChange={handleChange}
                    name="paymentMethod"
                  />
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="subAdminName"
                    value={isEditing
                      ? editedData.subAdminName
                      : Data.subAdminName}
                    onChange={handleChange}
                    name="subAdminName"
                  />
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="transactionID"
                    value={isEditing
                      ? editedData.transactionID
                      : Data.transactionID}
                    onChange={handleChange}
                    name="transactionID"
                  />
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="transactionType"
                    value={Data.transactionType}
                    onChange={handleChange}
                    name="transactionType"
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="websiteName"
                    value={isEditing
                      ? editedData.websiteName
                      : Data.websiteName}
                    name="websiteName"
                  />
                </div>)}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
              {isEditing ? (

                <button
                  className="btn btn-success mx-1"
                  data-bs-dismiss="modal"
                  onClick={(e) => handleSubmit(e, Data.transactionType)}
                >
                  Save
                </button>



              ) : (
                <>
                  <button
                    className="btn btn-info mx-1"
                    onClick={handleToggleEdit}
                  >
                    Edit
                  </button>

                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTransaction;
