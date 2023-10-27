import React, { useEffect, useState } from "react";
import { useAuth } from "../Utils/Auth";
import AccountService from "../Services/AccountService";
import EditServices from "../Services/EditServices";
import SubAdminBank from "../Component/Modal/SubAdminBank";

const NewBank = () => {
  const auth = useAuth();
  const [bankData, setBankData] = useState([]);
  const [error, setError] = useState(null);
  const [Id, setId] = useState();

  useEffect(() => {
    AccountService.getrequestedbank(auth.user)
      .then((res) => {
        setBankData(res.data);
      })
      .catch((err) => {
        setError("Error fetching data. Please try again.");
      });
  }, [auth]);
  console.log(bankData);

  const handleApprove = (_id) => {
    setId(_id);
    const flag = true;
    const data = {
      isApproved: flag,
    };
    EditServices.NewBankRqApprove(_id, data, auth.user)
      .then((response) => {
        console.log(response);
        alert("Bank Request is Approved & Activated");
        // window.location.reload();
        //   SubAdminBank();
      })
      .catch((error) => {
        alert("An unexpected error has occurred");
        console.log(error);
      });
  };

  const handleReject = (_id) => {
    EditServices.NewBankRqReject(_id, auth.user)
      .then((response) => {
        console.log(response.data);
        alert(`Rejected \uD83C\uDFA3`);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h1 className="text-center">New Bank Details</h1>
      {error ? (
        <p>{error}</p>
      ) : bankData.length === 0 ? (
        <div class="alert alert-info justify-content-center" role="alert">
          No Request Found !! &#128680;
        </div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Bank Name</th>
              <th scope="col">Active Status</th>
              <th scope="col">Acc Holder</th>
              <th scope="col">Acc No.</th>
              <th scope="col">IFSC Code</th>
              <th scope="col">Created By</th>
              <th scope="col">UPI App</th>
              <th scope="col">UPI ID</th>
              <th scope="col">UPI No.</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {bankData.map((bank, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{bank.bankName}</td>
                <td>{bank.isActive ? "Active" : "Inactive"}</td>
                <td>{bank.accountHolderName}</td>
                <td>{bank.accountNumber}</td>
                <td>{bank.ifscCode}</td>
                <td>{bank.subAdminName}</td>
                <td>{bank.upiAppName}</td>
                <td>{bank.upiId}</td>
                <td>{bank.upiNumber}</td>
                <td>
                  <button
                    className="btn btn-outline-success"
                    onClick={() => handleApprove(bank._id)}
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    Approve & Active
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleReject(bank._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <SubAdminBank ID={Id} />
    </div>
  );
};

export default NewBank;
