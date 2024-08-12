import React, { useEffect, useState } from "react";
import EditServices from "../../../../Services/EditServices";
import { useAuth } from "../../../../Utils/Auth";
import { toast } from "react-toastify";
import { customErrorHandler } from "../../../../Utils/helper";

const WebsiteDelete = () => {
  const auth = useAuth();

  const [viewWebsiteDelete, setViewWebsiteDelete] = useState([]);
  const [renderSate, setRenderSate] = useState("");
  // const [isApproved, setIsApproved] = useState();
  var EditData = [];

  useEffect(() => {
    if (auth.user) {
      EditServices.ViewWebsiteDelete(auth.user).then((res) =>
        setViewWebsiteDelete(res.data.data)
      );
    }
  }, [auth, renderSate]);

  for (let i = 0; i < alert.length; i++) {
    EditData[i] = alert[i].changedFields;
  }
  console.log(viewWebsiteDelete);

  const handleApprove = (e, id) => {
    e.preventDefault();
    console.log(id);
    const flag = true;

    const data = {
      isApproved: flag,
    };
    EditServices.IsWebsiteDeleteApprove(id, auth.user)
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
    EditServices.IsWebsiteDeleteReject(id, auth.user)
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
      {viewWebsiteDelete.length > 0 ? (
        <div className="container d-flex justify-content-center ">
          <div className=" p-2">
            <div>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Website Name</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                {viewWebsiteDelete.map((data, index) => (
                  <tr key={data.websiteTransactionId}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.websiteName}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={(e) => handleApprove(e, data.websiteId)}
                      >
                        Approve
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => handleReject(e, data.websiteId)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div class="container alert alert-warning mt-1" role="alert">
          <p className="d-flex justify-content-center">
            No Delete Request Found
          </p>
        </div>
      )}
    </>
  );
};

export default WebsiteDelete;
