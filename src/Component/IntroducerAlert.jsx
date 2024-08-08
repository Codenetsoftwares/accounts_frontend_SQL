import React, { useState, useEffect } from "react";
import InnerAlert from "../Modal/InnerAlert";
import EditServices from "../Services/EditServices";
import TransactionSercvice from "../Services/TransactionSercvice";
import { useAuth } from "../Utils/Auth";

const IntroducerAlert = () => {
  const auth = useAuth();
  console.log(auth);
  const [alert, setAlert] = useState([]);
  const [isApproved, setIsApproved] = useState();
  var EditData = [];

  useEffect(() => {
    if (auth.user) {
      TransactionSercvice.IntroducerAlertTransaction(auth.user).then((res) =>
        setAlert(res.data)
      );
    }
  }, [auth]);

  for (let i = 0; i < alert.length; i++) {
    EditData[i] = alert[i].changedFields;
  }
  console.log(auth.user);

  const handleEditApprove = (e, id, transactionType) => {
    console.log(transactionType);
    e.preventDefault();
    const flag = true;

    const data = {
      isApproved: flag,
    };
    switch (transactionType) {
      case "Deposit":
        EditServices.IsEditIntroducerApprove(id, data, auth.user)
          .then((response) => {
            window.location.reload();
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case "Withdraw":
        EditServices.IsEditIntroducerApprove(id, data, auth.user)
          .then((response) => {
            window.location.reload();
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
  const handleEditReject = (e, id, transactionType) => {
    switch (transactionType) {
      case "Deposit":
        EditServices.IsReject(id, auth.user)
          .then((response) => {
            window.location.reload();
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case "Withdraw":
        EditServices.IsReject(id, auth.user)
          .then((response) => {
            window.location.reload();
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

  const handleDeleteApprove = (e, id, transactionType) => {
    console.log(auth.user);
    e.preventDefault();
    const flag = true;

    const data = {
      isApproved: flag,
    };
    switch (transactionType) {
      case "Deposit":
        EditServices.IsDeleteIntroducerApprove(id, auth.user)
          .then((response) => {
            window.location.reload();
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case "Withdraw":
        EditServices.IsDeleteIntroducerApprove(id, auth.user)
          .then((response) => {
            window.location.reload();
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
  const handleDeleteReject = (e, id, transactionType) => {
    switch (transactionType) {
      case "Deposit":
        EditServices.IsIntroducerTransactionDeleteReject(id, auth.user)
          .then((response) => {
            window.location.reload();
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case "Withdraw":
        EditServices.IsIntroducerTransactionDeleteReject(id, auth.user)
          .then((response) => {
            window.location.reload();
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

  console.log(alert);
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
                <>
                  {data.type === "Edit" && (
                    <div className="card">
                      <h5 class="card-title text-center text-danger">
                        {data.message}
                      </h5>
                      <div className="card-body">
                        <div className="row">
                          <div className="row">
                            <div className="row">
                              <p className="col fs-6">
                                Transaction Type:
                                <br />
                                <p className="text-success">
                                  {data.transactionType}
                                </p>
                              </p>
                              <p className="col fs-6 ">
                                Transaction Id:
                                <br />
                                <p
                                  className={
                                    data.changedFields?.transactionID
                                      ? "text-danger"
                                      : "text-success"
                                  }
                                >
                                  {data.changedFields?.transactionID ||
                                    data.transactionID}
                                </p>
                              </p>
                              <p className="col fs-6 ">
                                Gateway:
                                <br />
                                <p
                                  className={
                                    data.changedFields?.paymentMethod
                                      ? "text-danger"
                                      : "text-success"
                                  }
                                >
                                  {data.changedFields?.paymentMethod ||
                                    data.paymentMethod}
                                </p>
                              </p>
                              <p className="col fs-6 ">
                                User Id:
                                <br />
                                <p
                                  className={
                                    data.changedFields?.userId
                                      ? "text-danger"
                                      : "text-success"
                                  }
                                >
                                  {data.changedFields?.userId || data.userId}
                                </p>
                              </p>
                              <p className="col fs-6 ">
                                Website:
                                <br />
                                <p
                                  className={
                                    data.changedFields?.websiteName
                                      ? "text-danger"
                                      : "text-success"
                                  }
                                >
                                  {data.changedFields?.websiteName ||
                                    data.websiteName}
                                </p>
                              </p>
                              <p className="col fs-6 ">
                                Amount:
                                <br />
                                <p
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
                                </p>
                              </p>
                              <p className="col fs-6 ">
                                Bank:
                                <br />
                                <p
                                  className={
                                    data.changedFields?.bankName
                                      ? "text-danger"
                                      : "text-success"
                                  }
                                >
                                  {data.changedFields?.bankName ||
                                    data.bankName}
                                </p>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col d-flex justify-content-center gap-2 mb-2">
                        <button
                          class="btn btn-primary"
                          onClick={(e) =>
                            handleEditApprove(e, data.IntroEditID, data.transactionType)
                          }
                        >
                          Approve
                        </button>
                        <button
                          class="btn btn-danger"
                          onClick={(e) =>
                            handleEditReject(e, data.IntroEditID, data.transactionType)
                          }
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  )}
                  {data.type === "Delete" && (
                    <div className="card">
                      <h5 class="card-title text-center text-danger">
                        {data.message}
                      </h5>
                      <div className="card-body">
                        <div className="row">
                          <div className="row">
                            <div className="row">
                              <p className="col fs-6">
                                Transaction Type:
                                <br />
                                <p className="text-success">
                                  {data.transactionType}
                                </p>
                              </p>
                              <p className="col fs-6 ">
                                Transaction Id:
                                <br />
                                <p
                                  className={
                                    data.changedFields?.transactionID
                                      ? "text-danger"
                                      : "text-success"
                                  }
                                >
                                  {data.changedFields?.transactionID ||
                                    data.transactionID}
                                </p>
                              </p>
                              <p className="col fs-6 ">
                                Gateway:
                                <br />
                                <p
                                  className={
                                    data.changedFields?.paymentMethod
                                      ? "text-danger"
                                      : "text-success"
                                  }
                                >
                                  {data.changedFields?.paymentMethod ||
                                    data.paymentMethod}
                                </p>
                              </p>
                              <p className="col fs-6 ">
                                User Id:
                                <br />
                                <p
                                  className={
                                    data.changedFields?.userId
                                      ? "text-danger"
                                      : "text-success"
                                  }
                                >
                                  {data.changedFields?.userId || data.userId}
                                </p>
                              </p>
                              <p className="col fs-6 ">
                                Website:
                                <br />
                                <p
                                  className={
                                    data.changedFields?.websiteName
                                      ? "text-danger"
                                      : "text-success"
                                  }
                                >
                                  {data.changedFields?.websiteName ||
                                    data.websiteName}
                                </p>
                              </p>
                              <p className="col fs-6 ">
                                Amount:
                                <br />
                                <p
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
                                </p>
                              </p>
                              <p className="col fs-6 ">
                                Bank:
                                <br />
                                <p
                                  className={
                                    data.changedFields?.bankName
                                      ? "text-danger"
                                      : "text-success"
                                  }
                                >
                                  {data.changedFields?.bankName ||
                                    data.bankName}
                                </p>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col d-flex justify-content-center gap-2 mb-2">
                        <button
                          class="btn btn-primary"
                          onClick={(e) =>
                            handleDeleteApprove(
                              e,
                              data.IntroEditID,
                              data.transactionType
                            )
                          }
                        >
                          Approve
                        </button>
                        <button
                          class="btn btn-danger"
                          onClick={(e) =>
                            handleDeleteReject(
                              e,
                              data.IntroEditID,
                              data.transactionType
                            )
                          }
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  )}
                </>
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

export default IntroducerAlert;
