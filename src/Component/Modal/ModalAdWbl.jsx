import React, { useState , useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { toast } from "react-toastify";
import FullScreenLoader from "../FullScreenLoader";
import { customErrorHandler } from "../../Utils/helper";

const ModalAdWbl = ({ ID , setGetWebsite , getWebsite }) => {
  const auth = useAuth();
  const [Amount, SetAmount] = useState(0);
  const [Remarks, SetRemarks] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleModalShow = () => {
      SetAmount(0);
      SetRemarks("");
    };

    const modalElement = document.getElementById("modalAddBlWebsite");
    modalElement.addEventListener("shown.bs.modal", handleModalShow);

    return () => {
      modalElement.removeEventListener("shown.bs.modal", handleModalShow);
    };
  }, []);

  console.log("id", ID);

  const handelamtchange = (e) => {
    SetAmount(e.target.value);
  };

  const handelRemarkschange = (e) => {
    SetRemarks(e.target.value);
  };

  const handelsubmit = () => {
    if (Amount === 0 || Remarks === "" || Amount < 0) {
      if (Amount < 0) {
        toast.error("Amount can not be negetive");
        return;
      }
      toast.error("Amount and Remarks fields cannot be empty.");
      return;
    }
    setIsLoading(true);
    const data = {
      amount: Number(Amount),
      transactionType: "Manual-Website-Deposit",
      remarks: Remarks,
    };
    AccountService.ManualWebsiteEntryDeposit(ID, data, auth.user)
      .then((res) => {
        // console.log(response.data);
        setIsLoading(false);
        if (res.status === 201) {
          const updatedWebsites = getWebsite.map(website => {
            if (website.websiteId === ID){
              return {
                ...website,
                balance: website.balance + res.data.data.depositAmount
              };
            }
            return website;
          });
          setGetWebsite(updatedWebsites);          
          // renderParent(res.data);
          // Close the modal
          const closeButton = document.querySelector("#modalAddBlWebsite .btn-close");
          if (closeButton) {
            closeButton.click();
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(customErrorHandler(error));
        // alert.error("e.message");
      });
  };

  return (
    <div>
      <FullScreenLoader show={isLoading} />
      <div
        className="modal fade"
        id="modalAddBlWebsite"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Provide Website Deposit Amount
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
                    value={auth.user.userName}
                    disabled
                    style={{ fontSize: "10px" }}
                  />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Amount"
                    onChange={handelamtchange}
                    value={Amount}
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
                Deposit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAdWbl;
