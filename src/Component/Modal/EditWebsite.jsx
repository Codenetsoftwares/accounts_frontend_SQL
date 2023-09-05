import React, { useState } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";

const EditWebsite = (ID) => {
  const auth = useAuth();

  const [Name, SetName] = useState("");
  const handelSubmit = () => {
    const data = { Name };
    console.log(ID);
    AccountService.EditWebsite(data, ID.ID, auth.user)
      .then((response) => {
        console.log(response.data);
        
          alert(response.data);
        
      })
      .catch((error) => {
        console.error(error);
        // toast.error("Failed! Invalid Data");
      });
  };

  return (
    <div>
      <div
        className="modal fade"
        id="editwebsite"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Provide New Name
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <small>Edit By</small>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control font-weight-bold"
                    value={auth.user.email}
                    disabled
                    style={{ fontSize: "10px" }}
                  />
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="New Website Name"
                  onChange={(e) => {
                    SetName(e.target.value);
                  }}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handelSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWebsite;
