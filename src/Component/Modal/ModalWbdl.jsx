import React from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";

const ModalWbdl = ({ name }) => {
  const auth = useAuth();

  const handeldeletewebsite = () => {
    const data = {
      websiteName: name,
    };
    AccountService.deletewebsite(data, auth.user)
      .then((res) => {
        if (res.status === 200) {
          alert("Website Deleted successfully!");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(data);
  };

  return (
    <div>
      <div
        className="modal fade"
        id="modalWbdl"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <p>Are You Sure You Want To Delete This Website?</p>
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
                className="btn btn-danger"
                onClick={handeldeletewebsite}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWbdl;
