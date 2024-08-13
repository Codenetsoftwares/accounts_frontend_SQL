import React, { useState, useEffect } from "react";
import EditServices from "../../../../Services/EditServices";
import { useAuth } from "../../../../Utils/Auth";
import { toast } from "react-toastify";
import { customErrorHandler } from "../../../../Utils/helper";

const BankEdit = () => {
  const auth = useAuth();
  const [ChangeFiled, SetChangeFiled] = useState([]);
  const [EditRq, SetEditRq] = useState([]);
  const [renderSate, setRenderSate] = useState("");

  useEffect(() => {
    if (auth.user) {
      EditServices.ViewBankEditRq(auth.user).then((res) => {
        const changedFieldsArray = res.data.data.map(
          (item) => item.changedFields
        );

        SetChangeFiled(changedFieldsArray);
        SetEditRq(res.data.data);
      });
    }
  }, [auth, renderSate]);

  const handleapprove = (ID) => {
    const flag = true;

    const data = {
      isApproved: flag,
    };

    EditServices.IsBankEditApprove(ID, data, auth.user)
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
    <>
      {EditRq.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr align="center">
                <th>Account Holder Name</th>
                <th>Account Number</th>
                <th>Bank Name</th>
                <th>IFSC Code</th>
                <th>UPI App Name</th>
                <th>UPI ID</th>
                <th>UPI Number</th>
                <th>Message</th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {EditRq.reverse().map((item) => (
                <tr key={item.id} align="center">
                  <td>{item.accountHolderName}</td>
                  <td>{item.accountNumber}</td>
                  <td>{item.bankName}</td>
                  <td>{item.ifscCode}</td>
                  <td>{item.upiAppName}</td>
                  <td>{item.upiId}</td>
                  <td>{item.upiNumber}</td>
                  <td>{item.message}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-success mr-2"
                      onClick={() => handleapprove(item.bankId)}
                    >
                      Approve
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={(e) => handleReject(e, item.bankId)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          className="alert alert-warning fs-6 d-flex justify-content-center container"
          role="alert"
        >
          No Alert Found
        </div>
      )}
    </>
  );
};

export default BankEdit;
