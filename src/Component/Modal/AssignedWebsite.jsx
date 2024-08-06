import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";

const AssignedWebsite = ({ ID }) => {
  const [WebsiteNames, setWebsiteNames] = useState([]);
    const auth = useAuth();
    const username = ID;

  useEffect(() => {
    AccountService.subadminassigneedwebsiteview(username, auth.user)
      .then((res) =>
          console.log('===>>> response for website',res)
        // setWebsiteNames(res.data)
      )
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [username, auth]);

  const handelsave = () => {
      console.log("=>>>>", WebsiteNames);
     
  };

  return (
    <div
      class="modal fade"
      id="AssignedWebsite"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Assigned Website to this SubAdmin
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {WebsiteNames.length > 0 ? (
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Bank Name</th>
                  </tr>
                </thead>
                <tbody>
                  {WebsiteNames.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{data.websiteName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No data available.</p>
            )}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" onClick={handelsave}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedWebsite;
