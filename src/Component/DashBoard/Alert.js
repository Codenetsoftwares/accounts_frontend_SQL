import React, { useState, useEffect } from "react";
import EditServices from "../../Services/EditServices";
import { useAuth } from "../../Utils/Auth";
import InnerAlert from "../../Modal/InnerAlert";
import TransactionSercvice from "../../Services/TransactionSercvice";
import { toast } from "react-toastify";
import { customErrorHandler } from "../../Utils/helper";

const Alert = () => {
  const auth = useAuth();
  const [alert, setAlert] = useState([]);
  const [renderSate, setRenderSate] = useState("");

  useEffect(() => {
    if (auth.user) {
      EditServices.ViewAlert(auth.user).then((res) =>
        setAlert(res?.data?.data)
      );
    }
  }, [auth, renderSate]);

  const handleDeleteApprove = (e, id, transactionType) => {
    e.preventDefault();
    switch (transactionType) {
      case "Deposit":
      case "Withdraw":
        TransactionSercvice.MoveTrashTransaction(id, auth.user)
          .then((response) => {
            toast.success(response.data.message);
            setRenderSate(response.data);
          })
          .catch((error) => {
            toast.error(customErrorHandler(error));
          });
        break;
      case "Manual-Website-Withdraw":
      case "Manual-Website-Deposit":
        TransactionSercvice.MoveTrashWebsiteTransaction(id, auth.user)
          .then((response) => {
            toast.success(response.data.message);
            setRenderSate(response.data);
          })
          .catch((error) => {
            toast.error(customErrorHandler(error));
          });
        break;
      case "Manual-Bank-Withdraw":
      case "Manual-Bank-Deposit":
        TransactionSercvice.MoveTrashBankTransaction(id, auth.user)
          .then((response) => {
            toast.success(response.data.message);
            setRenderSate(response.data);
          })
          .catch((error) => {
            toast.error(customErrorHandler(error));
          });
        break;
      default:
        break;
    }
  };

  const handleDeleteReject = (e, id, transactionType) => {
    e.preventDefault();
    EditServices.IsTransactionDeleteReject(id, auth.user)
      .then((response) => {
        toast.success(response.data.message);
        setRenderSate(response.data);
      })
      .catch((error) => {
        toast.error(customErrorHandler(error));
      });
  };

  return (
    <div className="d-flex justify-content-center p-5">
      <div>
        {alert?.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr align="center">
                <th>Transaction Type</th>
                <th>Transaction ID</th>
                <th>Gateway</th>
                <th>User Name</th>
                <th>Website</th>
                <th>Amount</th>
                <th>Bank</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {alert.reverse().map((data, i) => (
                <tr key={i}>
                  <td>{data.transactionType}</td>
                  <td
                    className={
                      data.changedFields?.transactionID
                        ? "text-danger"
                        : "text-success"
                    }
                  >
                    {data.changedFields?.transactionID || data.transactionID}
                  </td>
                  <td
                    className={
                      data.changedFields?.paymentMethod
                        ? "text-danger"
                        : "text-success"
                    }
                  >
                    {data.changedFields?.paymentMethod || data.paymentMethod}
                  </td>
                  <td
                    className={
                      data.changedFields?.userName
                        ? "text-danger"
                        : "text-success"
                    }
                  >
                    {data.changedFields?.userName || data.userName}
                  </td>
                  <td
                    className={
                      data.changedFields?.websiteName
                        ? "text-danger"
                        : "text-success"
                    }
                  >
                    {data.changedFields?.websiteName || data.websiteName}
                  </td>
                  <td
                    className={
                      data.changedFields?.withdrawAmount ||
                        data.changedFields?.amount ||
                        data.changedFields?.depositAmount
                        ? "text-danger"
                        : "text-success"
                    }
                  >
                    {data.changedFields?.withdrawAmount ||
                      data.changedFields?.amount ||
                      data.changedFields?.depositAmount ||
                      data.withdrawAmount ||
                      data.amount ||
                      data.depositAmount}
                  </td>
                  <td
                    className={
                      data.changedFields?.bankName
                        ? "text-danger"
                        : "text-success"
                    }
                  >
                    {data.changedFields?.bankName || data.bankName}
                  </td>
                  <td className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-outline-success"
                      onClick={(e) =>
                        handleDeleteApprove(
                          e,
                          data.editId,
                          data.transactionType
                        )
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={(e) =>
                        handleDeleteReject(e, data.editId, data.transactionType)
                      }
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-warning fs-6" role="alert">
            No Alert Found
          </div>
        )}
      </div>
      <InnerAlert />
    </div>
  );
};

export default Alert;
