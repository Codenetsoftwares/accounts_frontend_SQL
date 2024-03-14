import React, { useState, useEffect } from "react";
import EditServices from "../../../../Services/EditServices";
import { useAuth } from "../../../../Utils/Auth";

const WebsiteEdit = () => {
  const auth = useAuth();
  const [EditRq, SetEditRq] = useState([]);
  useEffect(() => {
    if (auth.user) {
      EditServices.ViewwebsiteEditRq(auth.user).then((res) => {
        SetEditRq(res.data);
      });
    }
  }, [auth]);

  console.log("ALL Request", EditRq);

  const handleapprove = (ID) => {
    const flag = true;

    const data = {
      isApproved: flag,
    };

    EditServices.IsWebsiteEditApprove(ID, data, auth.user)
      .then((response) => {
        console.log(response);
        alert("Approved !! Website Name Changed");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
  const handleReject = (e, id) => {
    e.preventDefault();
    EditServices.IsWebsiteDeleteReject(id, auth.user)
      .then((response) => {
        alert("Rejected !! Website Name Remains Same ");
        window.location.reload();
        console.log(response.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
  return (
    <>
      {EditRq.length > 0 ? (
        <div className="d-flex justify-content-center">
          {EditRq.map((item, index) => (
            <div
              className="card ml-5 mt-5"
              style={{ width: "50rem" }}
              key={item.id}
            >
              <p key={index} className="ml-2 mt-2">
                <b>Website Name</b>: {item.websiteName}
                <br />
              </p>
              <hr />
              <p className="d-flex justify-content-center text-primary">
                {item.message}
              </p>
              <hr />
              <p>
                <button
                  type="button"
                  class="btn btn-success mr-2 ml-2"
                  onClick={() => handleapprove(item.websiteTransactionId)}
                >
                  Approve
                </button>
                <button
                  class="btn btn-danger"
                  onClick={(e) => handleReject(e, item.websiteTransactionId)}
                >
                  Reject
                </button>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div class="card">
          <div class="card-body">No Request Found</div>
        </div>
      )}
    </>
  );
};

export default WebsiteEdit;
