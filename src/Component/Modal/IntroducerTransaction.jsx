import React, { useState } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { toast } from "react-toastify";
import TransactionSercvice from "../../Services/TransactionSercvice";

const IntroducerTransaction = ({ TxType, IntroducerName }) => {
  console.log(IntroducerName);
  const auth = useAuth();
  const [Amount, SetAmount] = useState(0);
  const [Remarks, SetRemarks] = useState("");

  const handelamtchange = (e) => {
    SetAmount(e.target.value);
  };

  const handelRemarkschange = (e) => {
    SetRemarks(e.target.value);
  };

  const handleSubmit = () => {
    const data = {
      amount: Number(Amount),
      transactionType: TxType,
      remarks: Remarks,
      introducerUserName: IntroducerName,
    };

    switch (TxType) {
      case "Deposit":
        TransactionSercvice.IntroducerTransaction(data, auth.user)
          .then((res) => {
            // console.log(response.data);
            if (res.status === 200) {
              alert(res.data.message);
              window.location.reload();
            }
          })
          .catch((error) => {
            alert(error.response.data.message);
            console.log(error);
            // alert.error("e.message");
          });
        break;

      case "Withdraw":
        TransactionSercvice.IntroducerTransaction(data, auth.user)
          .then((res) => {
            // console.log(response.data);
            if (res.status === 200) {
              alert(res.data.message);
              window.location.reload();
            }
          })
          .catch((error) => {
            alert(error.response.data.message);
            console.log(error);
            // alert.error("e.message");
          });
        break;

      default:
    }
  };

  return (
    <div>
      <div
        class="modal fade"
        id="IntroTx"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Introducer Transaction
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
                    value={auth.user.userName}
                    disabled
                    style={{ fontSize: "10px" }}
                  />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Amount"
                    onChange={handelamtchange}
                    // min={0}
                  />
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Remarks *"
                  onChange={handelRemarkschange}
                  value={Remarks}
                  required
                />
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleSubmit}
              >
                Save Transaction
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroducerTransaction;
