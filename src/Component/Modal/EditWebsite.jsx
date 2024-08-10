import React, { useState , useEffect} from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { toast } from "react-toastify";
import { customErrorHandler } from "../../Utils/helper";

const EditWebsite = ({ ID, webName }) => {
  const auth = useAuth();

  const [Name, SetName] = useState("");

  useEffect(() => {
    const handleModalShow = () => {
      SetName("");
    };

    const modalElement = document.getElementById("editwebsite");
    modalElement.addEventListener("shown.bs.modal", handleModalShow);

    return () => {
      modalElement.removeEventListener("shown.bs.modal", handleModalShow);
    };
  }, []);

  const handelSubmit = () => {
    const data = { websiteName: Name };
    console.log(ID);
    AccountService.EditWebsite(data, ID, auth.user)
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
        const closeButton = document.querySelector("#editwebsite .btn-close");
        if (closeButton) {
          closeButton.click();
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        toast.error(customErrorHandler(error));
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
                      <small>Present Name </small>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control font-weight-bold"
                    value={webName}
                    disabled
                    style={{ fontSize: "15px" }}
                  />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <small>Edit By</small>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control font-weight-bold"
                    value={auth.user.userName}
                    disabled
                    style={{ fontSize: "10px" }}
                  />
                </div>

                <input
                  type="text"
                  value={Name}
                  className="form-control"
                  placeholder="New Website Name"
                  onChange={(e) => {
                    SetName(e.target.value);
                  }}
                />
              </form>
            </div>
            <div className="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handelSubmit}
              >
                Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWebsite;
