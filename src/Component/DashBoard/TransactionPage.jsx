import React, { useState, useEffect } from "react";
import EditServices from "../../Services/EditServices";
import { useAuth } from "../../Utils/Auth";
// import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import InnerAlert from "../../Modal/InnerAlert";

const TransactionPage = () => {
  const auth = useAuth();

  const [alert, setAlert] = useState([]);
  const [isApproved, setIsApproved] = useState();

  useEffect(() => {
    if (auth.user) {
      EditServices.ViewAlert(auth.user).then((res) => setAlert(res.data));
    }
  }, [auth]);
  console.log(alert);
  // console.log("alert", alert);
  // console.log("This is Auth=====> ", auth);
  const handleApprove = (e, _id) => {
    console.log(_id);
    const flag = true;

    const data = {
      isApproved: flag,
    };
    EditServices.IsApprove(_id, data, auth.user)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="container d-flex justify-content-center col ">
        <br />
        <div
          className="card  rounded-2 mb-2"
          style={{
            boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
            backgroundImage:
              "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
          }}
        ></div>
        <div className="d-inline-flex p-2">
          {alert.length > 0 ? (
            alert.map((data) => {
              return (
                <div className="card">
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
                        {data.transactionID}
                      </p>
                      <p className="col fs-6 ">
                        Gateway:
                        <br />
                        {data.paymentMethod}
                      </p>
                      <p className="col fs-6 ">
                        User Id:
                        <br />
                        {data.userId}
                      </p>
                      <p className="col fs-6 ">
                        Website:
                        <br />
                        {data.websiteName}
                      </p>
                      <p className="col fs-6 ">
                        Amount:
                        <br />
                        ₹&nbsp; {data.amount}
                      </p>
                      <p className="col fs-6 ">
                        Bank:
                        <br />
                        {data.bankName}
                      </p>
                    </div>
                  </div>
                  <div className="col d-flex justify-content-center gap-2 mb-2">
                    <button
                      class="btn btn-primary"
                      onClick={(e) => handleApprove(e, data._id)}
                    >
                      Approve
                    </button>
                    <button class="btn btn-danger">Reject</button>
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

export default TransactionPage;
