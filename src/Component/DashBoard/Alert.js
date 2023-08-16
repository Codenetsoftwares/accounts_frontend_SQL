import React, { useEffect, useState } from "react";
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
      <div className="container d-flex justify-content-center ">
        <br />
        <div className="d-inline-flex p-2">
          {alert.length > 0 ? (
            alert.map((data) => {
              return (
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <p className="col fs-6">{data.transactionType}</p>
                      <p className="col fs-6 text-break">
                        {data.transactionID}
                      </p>
                      <p className="col fs-6 ">{data.paymentMethod}</p>
                      <p className="col fs-6 ">₹&nbsp;{data.amount}</p>
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

export default Alert;
