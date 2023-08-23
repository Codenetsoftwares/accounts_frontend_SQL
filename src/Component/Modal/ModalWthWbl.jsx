import React, { useState } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";

const ModalWthWbl = ({ ID }) => {
  const auth = useAuth();
  const [Amount, SetAmount] = useState(0);

  const handelamtchange = (e) => {
    SetAmount(e.target.value);
  };

  const handelsubmit = (e) => {
    e.preventDefault();
    const data = {
      amount: Amount,
      transactionType: "Manual-Withdraw",
    };

    console.log(ID);
    AccountService.ManualWebsiteEntryWithdraw(ID, data, auth.user)
      .then((res) => {
        // console.log(response.data);
        if (res.status === 200) {
          alert("Transaction Succesfull");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
        // alert.error("e.message");
      });
  };

  return (
    <div>
      <div
        className="modal fade"
        id="modalWthwbl"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Provide Withdrawal Amount......
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
                      <small>Transaction By:</small>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control font-weight-bold"
                    placeholder="SubAdmin"
                    value={auth.user.email}
                    disabled
                    style={{ fontSize: "10px" }}
                  />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Amount"
                    onChange={handelamtchange}
                    value={Amount}
                  />
                </div>
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
                onClick={handelsubmit}
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

export default ModalWthWbl;
