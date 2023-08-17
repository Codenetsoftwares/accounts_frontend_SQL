import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import TransactionSercvice from "../../Services/TransactionSercvice";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./EditTransaction.css";
import EditIcon from "../../Assets/edit-iconii.png";
import AccountService from "../../Services/AccountService";

const EditTransaction = () => {
  const auth = useAuth();
  console.log("This is Auth", auth);
  const { id } = useParams();
  const [transactionId, setTransactionId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [uid, setUid] = useState("");
  const [Bank, SetBank] = useState("");
  const [Website, setWebsite] = useState("");
  const navigate = useNavigate();

  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleTransactionType = (e) => {
    setTransactionType(e.target.value);
  };
  const handleUserIDChange = (e) => {
    setUid(e.target.value);
  };
  console.log(Bank);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      transactionID: transactionId,
      transactionType: transactionType,
      amount: amount,
      paymentMethod: paymentMethod,
      userId: uid,
      bankName: Bank,
      websiteName: Website,
    };
    console.log(id, data);
    TransactionSercvice.editTransactionData(id, data, auth.user)
      .then((response) => {
        console.log(response.data);
        if (transactionId.length && amount.length && paymentMethod.length > 0) {
          toast.success("Edit Request Send Successfully!");
          navigate("/admindash");
        } else {
          toast.error("Failed");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed! Invalid Data");
      });
  };
  const [getbankName, setGetBankName] = useState([]);
  useEffect(() => {
    AccountService.getbank(auth.user).then((res) => setGetBankName(res.data));
  }, [auth]);
  console.log("Bank Names", getbankName);

  // Get Website Api
  const [getWebsite, setGetWebsite] = useState([]);
  useEffect(() => {
    AccountService.website(auth.user).then((res) => setGetWebsite(res.data));
  }, [auth]);

  const handleBankChange = (e) => {
    const value = e.target.value;
    SetBank(value);
  };
  const handleWebsiteChange = (e) => {
    const value = e.target.value;
    setWebsite(value);
  };
  return (
    <div className="EditTransaction">
      {/* <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul> */}

      <div
        className="wrapper"
        style={{
          transition: "transform 0.3s",
          transform: "scale(1)",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <div className="logo">
          <img src={EditIcon} alt="" />
        </div>
        <div className="text-center mt-4 name">Edit Transction</div>
        <form className="p-3 mt-3">
          <div className="form-field d-flex align-items-center">
            <input
              placeholder="Eamil"
              disabled
              value={auth.user.email}
              style={{ fontSize: "15px", textAlign: "center" }}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <input
              type="text"
              placeholder="User Id"
              onChange={handleUserIDChange}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <input
              type="text"
              placeholder="Amount"
              onChange={handleAmountChange}
            />
          </div>

          <div className="form-field d-flex align-items-center">
            <input
              placeholder="Transaction ID"
              onChange={handleTransactionIdChange}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <select
              className="form-select"
              onChange={handlePaymentMethodChange}
            >
              <option selected>PaymentMethod</option>
              <option value="GPAy">GPAy</option>
              <option value="PhonePe">PhonePe</option>
              <option value="Paytm">Paytm</option>
              <option value="Bank">Bank</option>
              <option value="others">others</option>
            </select>
          </div>
          <div className="form-field d-flex align-items-center">
            <select className="form-select" onChange={handleTransactionType}>
              <option selected>Transaction Type</option>
              <option value="Deposit">Deposit</option>
              <option value="Withdraw">Withdraw</option>
            </select>
          </div>

          <div className="form-field d-flex align-items-center">
            <select
              class="form-select"
              value={getbankName.bankName}
              onChange={handleBankChange}
            >
              <option selected>Select Bank</option>
              {getbankName.map((bank, index) => (
                <option key={index} value={bank.bankName}>
                  {bank.bankName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field d-flex align-items-center">
            <select
              class="form-select"
              value={getWebsite.name}
              onChange={handleWebsiteChange}
            >
              <option selected>Select Website</option>
              {getWebsite.map((website, index) => (
                <option key={index} value={website.name}>
                  {website.name}
                </option>
              ))}
            </select>
          </div>

          <button className="btn mt-3" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTransaction;
