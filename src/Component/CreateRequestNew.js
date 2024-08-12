import React, { useEffect, useState } from "react";
import { useAuth } from "../Utils/Auth";
import SubAdminBank from "./Modal/SubAdminBank";
import { toast } from "react-toastify";
import { customErrorHandler } from "../Utils/helper";

const CreateRequestNew = ({ Api, purpose, ApiReject, EditApi }) => {
  console.log("first", purpose);
  const auth = useAuth();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [Id, setId] = useState();
  const [childresponse, setChildResponse] = useState("");

  useEffect(() => {
    Api(auth.user)
      .then((res) => {
        setData(res.data.data);
        console.log(res.data);
      })
      .catch((err) => {
        setError("Error fetching data. Please try again.");
      });
  }, [auth , childresponse]);

  console.log("data = >>>>>", data);

  const handleApprove = (_id) => {
    setId(_id);
    // const flag = true;
    // const data = {
    //     isApproved: flag,
    // };
    // ApiNewRqApprove(_id, data, auth.user)
    //     .then((response) => {
    //         console.log(response);
    //         alert("data Request is Approved & Activated");
    //         // window.location.reload();
    //         //   SubAdmindata();
    //     })
    //     .catch((error) => {
    //         alert("An unexpected error has occurred");
    //         console.log(error);
    //     });
  };

  const handleReject = (_id) => {
    ApiReject(_id, auth.user)
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
        setChildResponse(response.data)
      })
      .catch((error) => {
        toast.error(customErrorHandler(error));
      });
  };
  return (
    <div className="container">
      <h1 className="text-center">New data Details</h1>
      {error ? (
        <p>{error}</p>
      ) : data.length === 0 ? (
        <div class="alert alert-info justify-content-center" role="alert">
          No Request Found !! &#128680;
        </div>
      ) : (
        <table className="table table-striped">
          <thead>
            {purpose === "bank" && (
              <tr>
                <th scope="col">#</th>
                <th scope="col"> Name</th>
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
            )}
            {purpose === "website" && (
              <tr>
                <th scope="col">#</th>
                <th scope="col"> Name</th>
                <th scope="col">Active Status</th>
                {/* <th scope="col">Acc Holder</th>
                                <th scope="col">Acc No.</th>
                                <th scope="col">IFSC Code</th> */}
                <th scope="col">Created By</th>
                {/* <th scope="col">UPI App</th>
                                <th scope="col">UPI ID</th>
                                <th scope="col">UPI No.</th> */}
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            )}
          </thead>
          <tbody>
            {data?.reverse().map((data, index) => (
              <tr key={index}>
                {purpose === "bank" && (
                  <>
                    {" "}
                    <th scope="row">{index + 1}</th>
                    <td>{data.bankName}</td>
                    <td>{data.isActive ? "Active" : "Inactive"}</td>
                    <td>{data.accountHolderName}</td>
                    <td>{data.accountNumber}</td>
                    <td>{data.ifscCode}</td>
                    <td>{data.subAdminName}</td>
                    <td>{data.upiAppName}</td>
                    <td>{data.upiId}</td>
                    <td>{data.upiNumber}</td>
                  </>
                )}
                {purpose === "website" && (
                  <>
                    {" "}
                    <th scope="row">{index + 1}</th>
                    <td>{data.websiteName}</td>
                    <td>{data.isActive ? "Active" : "Inactive"}</td>
                    {/* <td>{data.accountHolderName}</td>
                                        <td>{data.accountNumber}</td>
                                        <td>{data.ifscCode}</td> */}
                    <td>{data.subAdminId}</td>
                    {/* <td>{data.upiAppName}</td>
                                        <td>{data.upiId}</td>
                                    <td>{data.upiNumber}</td> */}
                  </>
                )}
                <td>
                  {purpose === "bank" ? (
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleApprove(data.bankId)}
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      Approve & Active
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleApprove(data.websiteId)}
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      Approve & Active
                    </button>
                  )}
                </td>
                <td>
                  {purpose === "bank" ? (
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleReject(data.bankId)}
                    >
                      Reject
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleReject(data.websiteId)}
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <SubAdminBank ID={Id} EditApi={EditApi} purpose={purpose} renderParent={setChildResponse} />
    </div>
  );
};

export default CreateRequestNew;
