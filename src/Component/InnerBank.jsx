import React, { useState, useEffect } from "react";
import { useAuth } from "../Utils/Auth";
import AccountService from "../Services/AccountService";
import { toast } from "react-toastify";

const InnerBank = ({ getbankName }) => {
  const [bname, setBname] = useState("");
  const [accno, setAccno] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [hname, setHname] = useState("");
  const [upi, setUpi] = useState("");
  const [upiName, setUpiName] = useState("");
  const [upiPhoneNumber, setUpiPhoneNumber] = useState("");

  const auth = useAuth();

  // Refresh the Form after the Modal triggered each and every time
  useEffect(() => {
    const handleModalShow = () => {
      setBname("");
      setAccno("");
      setIfsc("");
      setHname("");
      setUpi("");
      setUpiName("");
      setUpiPhoneNumber("");
    };

    const modalElement = document.getElementById("innerbnk");
    modalElement.addEventListener("shown.bs.modal", handleModalShow);

    return () => {
      modalElement.removeEventListener("shown.bs.modal", handleModalShow);
    };
  }, []);

  const bnamechnage = (e) => setBname(e.target.value);
  const accnochnage = (e) => setAccno(e.target.value);
  const ifscchnage = (e) => setIfsc(e.target.value);
  const hnamechnage = (e) => setHname(e.target.value);
  const hUpichnage = (e) => setUpi(e.target.value);
  const hupiNamechnage = (e) => setUpiName(e.target.value);
  const hUpiNumberchnage = (e) => setUpiPhoneNumber(e.target.value);

  const handelsubmit = (e) => {
    e.preventDefault();

    const data = {
      bankName: bname,
      accountNumber: accno,
      ifscCode: ifsc,
      accountHolderName: hname,
      upiId: upi,
      upiAppName: upiName,
      upiNumber: upiPhoneNumber,
    };

    AccountService.addBank(data, auth.user)
      .then((response) => {
        console.log("bank", response.data);
        toast.success(response.data.message);
        // Close the modal
        const closeButton = document.querySelector("#innerbnk .btn-close");
        if (closeButton) {
          closeButton.click();
        }
      })
      .catch((error) => {
        toast.error(error.response.data.errMessage);
        console.log(error);
      });
  };

  return (
    <div>
      <div
        className="modal fade"
        id="innerbnk"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Please Provide The Details
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="d-flex flex-column modal-body gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Name of Bank *"
                value={bname}
                onChange={bnamechnage}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Acc No. *"
                value={accno}
                onChange={accnochnage}
              />
              <input
                type="text"
                className="form-control"
                placeholder="IFSC CODE "
                value={ifsc}
                onChange={ifscchnage}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Name of the Acc. Holder "
                value={hname}
                onChange={hnamechnage}
              />
              <input
                type="text"
                className="form-control"
                placeholder="UPI ID "
                value={upi}
                onChange={hUpichnage}
              />
              <input
                type="text"
                className="form-control"
                placeholder="UPI App Name "
                value={upiName}
                onChange={hupiNamechnage}
              />
              <input
                type="text"
                className="form-control"
                placeholder="UPI Phone Number "
                value={upiPhoneNumber}
                onChange={hUpiNumberchnage}
              />
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
                Add Bank
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnerBank;
