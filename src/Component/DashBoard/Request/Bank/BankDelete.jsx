import React, { useState, useEffect } from "react";
import EditServices from "../../../../Services/EditServices";
import { useAuth } from "../../../../Utils/Auth";
import { customErrorHandler } from "../../../../Utils/helper";
import { toast } from "react-toastify";

const BankDelete = () => {
  const auth = useAuth();

  const [viewBankDelete, setViewBankDelete] = useState([]);
  const [renderSate, setRenderSate] = useState("");

  useEffect(() => {
    if (auth.user) {
      EditServices.ViewBankDelete(auth.user).then((res) =>
        setViewBankDelete(res.data.data)
      );
    }
  }, [auth, renderSate]);

  const handleApprove = (e, id) => {
    e.preventDefault();
    const flag = true;

    const data = {
      isApproved: flag,
    };
    EditServices.IsBankDeleteApprove(id, auth.user)
      .then((response) => {
        toast.success(response.data.message);
        setRenderSate(response.data);
      })
      .catch((error) => {
        toast.error(customErrorHandler(error));
      });
  };

  const handleReject = (e, id) => {
    e.preventDefault();
    EditServices.IsBankDeleteReject(id, auth.user)
      .then((response) => {
        toast.success(response.data.message);
        setRenderSate(response.data);
      })
      .catch((error) => {
        toast.error(customErrorHandler(error));
      });
  };

  return (
    <div className="container ">
      {viewBankDelete.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr align="center">
              <th scope="col">Bank Name</th>
              <th scope="col">Account Holder Name</th>
              <th scope="col">Account Number</th>
              <th scope="col">IFSC Code</th>
              <th scope="col">UPI App Name</th>
              <th scope="col">UPI Id</th>
              <th scope="col" colspan="2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {viewBankDelete.reverse().map((data, i) => (
              <tr key={i} align="center">
                <td
                  className={
                    data.changedFields?.bankName
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {data.changedFields?.bankName || data.bankName}
                </td>
                <td className="text-success">{data.accountHolderName}</td>
                <td className="text-success">{data.accountNumber}</td>
                <td className="text-success">{data.ifscCode}</td>
                <td className="text-success">{data.upiAppName}</td>
                <td className="text-success">{data.upiId}</td>
                <td>
                  <button
                    className="btn btn-outline-success me-2"
                    onClick={(e) => handleApprove(e, data.bankId)}
                  >
                    Approve
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={(e) => handleReject(e, data.bankId)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div class="alert alert-warning text-center" role="alert">
          No Alert Found
        </div>
      )}
    </div>
  );
};

export default BankDelete;
