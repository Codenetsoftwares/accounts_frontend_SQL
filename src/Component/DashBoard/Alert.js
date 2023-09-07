import React, { useState, useEffect } from "react";
import EditServices from "../../Services/EditServices";
import { useAuth } from "../../Utils/Auth";
// import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import InnerAlert from "../../Modal/InnerAlert";

const Alert = () => {
  const auth = useAuth();

  const [alert, setAlert] = useState([]);
  const [isApproved, setIsApproved] = useState();
  var EditData = [];

  useEffect(() => {
    if (auth.user) {
      EditServices.ViewAlert(auth.user).then((res) => setAlert(res.data));
    }
  }, [auth]);
  console.log("Request", alert);

  for (let i = 0; i < alert.length; i++) {
    EditData[i] = alert[i].changedFields;
  }

  console.log("ChangeFields===>>>>>>>>>", EditData);

  // console.log("alert", alert);
  // console.log("This is Auth=====> ", auth);
  const handleApprove = (e, id, transactionType) => {
    console.log(id);
    const flag = true;

    const data = {
      isApproved: flag,
    };
    switch (transactionType) {
      case "Deposit":
        EditServices.IsApprove(id, data, auth.user)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case "Withdraw":
        EditServices.IsApprove(id, data, auth.user)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        break;

      case "Manual-Bank-Withdraw":
        EditServices.IsBankApprove(id, data, auth.user)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        break;

      case "Manual-Bank-Deposit":
        EditServices.IsBankApprove(id, data, auth.user)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        break;

      case "Manual-Website-Withdraw":
        EditServices.IsWebsiteApprove(id, data, auth.user)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        break;

      case "Manual-Webiste-Deposit":
        EditServices.IsWebsiteApprove(id, data, auth.user)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        break;

      default:
      // code block
    }
  };
  const handleReject = (e, id, transactionType) => {
  
    switch (transactionType) {
      case "Deposit":
        EditServices.IsReject(id, auth.user)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case "Withdraw":
        EditServices.IsReject(id, auth.user)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        break;

      case "Manual-Bank-Withdraw":
        EditServices.IsReject(id, auth.user)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        break;

      case "Manual-Bank-Deposit":
        EditServices.IsReject(id, auth.user)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        break;

      case "Manual-Website-Withdraw":
        EditServices.IsReject(id, auth.user)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        break;

      case "Manual-Webiste-Deposit":
        EditServices.IsReject(id, auth.user)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        break;

      default:
      // code block
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center  ">
        <br />
        <div
          className="card  rounded-2 mb-2"
          style={{
            boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
            backgroundImage:
              "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
          }}
        ></div>
        <div className=" p-2">
          {alert.length > 0 ? (
            alert.map((data, i) => {
              return (
                <div className="card">
                  <h5 class="card-title text-center text-danger">
                    {data.message}
                  </h5>
                  <div className="card-body">
                    <div className="row">
                      <p className="col fs-6">
                        Transaction Type:
                        <br />
                        {data.transactionType}
                      </p>
                      <p className="col fs-6 ">
                        Transaction Id:
                        <br />
                        {data?.changedFields?.transactionID}
                      </p>
                      <p className="col fs-6 ">
                        Gateway:
                        <br />
                        {data?.changedFields?.paymentMethod}
                      </p>
                      <p className="col fs-6 ">
                        User Id:
                        <br />
                        {data?.changedFields?.userId}
                      </p>
                      <p className="col fs-6 ">
                        Website:
                        <br />
                        {data?.changedFields?.websiteName}
                      </p>
                      <p className="col fs-6 ">
                        Amount:
                        <br />
                        {data?.changedFields?.withdrawAmount}
                        {data?.changedFields?.amount}
                        {data?.changedFields?.depositAmount}
                      </p>
                      <p className="col fs-6 ">
                        Bank:
                        <br />
                        {data?.changedFields?.bankName}
                      </p>
                    </div>
                  </div>
                  <div className="col d-flex justify-content-center gap-2 mb-2">
                    <button
                      class="btn btn-primary"
                      onClick={(e) =>
                        handleApprove(e, data._id, data.transactionType)
                      }
                    >
                      Approve
                    </button>
                    <button class="btn btn-danger"  onClick={(e) =>
                        handleReject(e, data._id, data.transactionType)
                      }>Reject</button>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>No Alert Found</h1>
          )}
        </div>
        <InnerAlert />
      </div>
    </>
  );
};

export default Alert;
