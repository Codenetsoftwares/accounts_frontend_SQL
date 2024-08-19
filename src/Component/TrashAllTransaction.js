import React, { useState, useEffect } from "react";
import { useAuth } from "../Utils/Auth";
import TransactionSercvice from "../Services/TransactionSercvice";
import { toast } from "react-toastify";
import { customErrorHandler } from "../Utils/helper";

const TrashAllTransaction = () => {
  const auth = useAuth();
  const [alert, setAlert] = useState([]);
  const [renderSate, setRenderSate] = useState("");

  useEffect(() => {
    if (auth.user) {
      TransactionSercvice.ViewTrash(auth.user).then((res) =>
        setAlert(res.data.data)
      );
    }
  }, [auth, renderSate]);

  const handleDeleteApprove = (e, id, transactionType) => {
    e.preventDefault();
    TransactionSercvice.IsTransactionDelete(id, auth.user)
      .then((response) => {
        toast.success(response.data.message);
        setRenderSate(response.data);
      })
      .catch((error) => {
        toast.error(customErrorHandler(error));
      });
  };

  const handleRestore = (e, data) => {
    e.preventDefault();

    switch (data.nameType) {
      case "Transaction":
        TransactionSercvice.RestoreTransaction(data.Transaction_Id, auth.user)
          .then((response) => {
            toast.success(response.data.message);
            setRenderSate(response.data);
          })
          .catch((error) => {
            toast.error(customErrorHandler(error));
          });
        break;
      case "Introducer":
        TransactionSercvice.RestoreIntroducerTransaction(
          data.introTransactionId,
          auth.user
        )
          .then((response) => {
            toast.success(response.data.message);
            setRenderSate(response.data);
          })
          .catch((error) => {
            toast.error(customErrorHandler(error));
          });
        break;
      case "Bank":
        TransactionSercvice.RestoreBankTransaction(
          data.bankTransactionId,
          auth.user
        )
          .then((response) => {
            toast.success(response.data.message);
            setRenderSate(response.data);
          })
          .catch((error) => {
            toast.error(customErrorHandler(error));
          });
        break;
      case "Website":
        TransactionSercvice.RestoreWebsiteTransaction(
          data.websiteTransactionId,
          auth.user
        )
          .then((response) => {
            toast.success(response.data.message);
            setRenderSate(response.data);
          })
          .catch((error) => {
            toast.error(customErrorHandler(error));
          });
        break;
      default:
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      {alert.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr align="center">
              <th>Message</th>
              <th>Txn Type</th>
              <th>Txn Id</th>
              <th>Gateway</th>
              <th>UserName</th>
              <th>Website</th>
              <th>Amount</th>
              <th>Bank</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alert.reverse().map((data, i) => (
              <tr key={i} align="center">
                <td className="text-danger">{data.message}</td>
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
                <td>
                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={(e) =>
                      handleDeleteApprove(e, data._id, data.transactionType)
                    }
                  >
                    Delete
                  </button>
                </td>
                <td>
                  {data.nameType && (
                    <button
                      className="btn btn-outline-dark btn-sm"
                      onClick={(e) => handleRestore(e, data)}
                    >
                      Restore
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div class="alert alert-primary" role="alert">
          No Request Found !!
        </div>
      )}
    </div>
  );
};

export default TrashAllTransaction;
