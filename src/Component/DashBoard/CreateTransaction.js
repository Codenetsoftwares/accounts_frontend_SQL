import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import DashService from "../../Services/DashService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePay } from "@fortawesome/free-brands-svg-icons";

const CreateTransaction = () => {
  const auth = useAuth();
  const [transactionType, setTransactionType] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [Bank, SetBank] = useState("");
  const [Website, setWebsite] = useState("");
  const [uid, setUid] = useState("");

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
  console.log("Website", getWebsite);
  console.log("Auth==>>", auth);

  const resetForm = () => {
    // Reset the form fields after submission

    setTransactionType("");
    setTransactionId("");
    setAmount("");
    setPaymentMethod("");
  };
  const handleUserIdChange = (e) => {
    setUid(e.target.value);
  };

  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };

  const handleBankChange = (e) => {
    const value = e.target.value;
    SetBank(value);
  };
  console.log(Bank);

  const handleWebsiteChange = (e) => {
    const value = e.target.value;
    setWebsite(value);
  };
  console.log(Website);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prevent the default form submission behavior

    // Prepare the data object to be sent to the backend
    const data = {
      transactionID: transactionId,
      transactionType: transactionType,
      amount: amount,
      paymentMethod: paymentMethod,
      subAdminId: auth.user.email,
      userId: uid,
      bankName: Bank,
      websiteName: Website,
    };

    // Call the API service method to send the data to the backend
    DashService.CreateTransaction(data, auth.user)
      .then((response) => {
        // Handle successful response from the backend
        console.log(response.data);
        toast.success("Transaction Created Successfully!!");
      })
      .catch((error) => {
        // Handle error from the backend
        console.error(error);
        toast.error("Failed! Transaction ID Does Not Exists");
      });
  };
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // minHeight: '100vh',
    // border:'2px solid red'
  };
  const cardStyle = {
    margin: "auto",
    marginTop: "5rem",
    padding: "1.5rem",
    width: "80%",
    maxWidth: "50rem",
    borderRadius: "1rem",
    boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.5)",
    visibility: "visible",
    // border:'2px solid blue'
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "2rem",
    border: "1px solid #ccc",
    marginBottom: "1rem",
    // border:'2px solid green'
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "2rem",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
    // border:'2px solid black'
  };

  return (
    <>
      <div style={containerStyle}>
        <div style={cardStyle}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="UID">
                <h5>User ID </h5>
              </label>
              <input
                type="text"
                className="form-control"
                onChange={handleUserIdChange}
                placeholder="User ID"
                value={uid}
                style={inputStyle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="transactionId">
                <h5>Transaction ID </h5>
              </label>
              <input
                type="text"
                className="form-control"
                onChange={handleTransactionIdChange}
                placeholder="Transaction ID"
                value={transactionId}
                style={inputStyle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">
                <h5>Amount</h5>
              </label>
              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Amount"
                style={inputStyle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="PaymentMethod">
                <h5 style={{ fontWeight: "boldb   " }}>PaymentMethod</h5>
              </label>
              <select
                class="form-select"
                style={inputStyle}
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <option selected>Open this select menu</option>
                <option value="GPAy">GPAy</option>
                <option value="PhonePe">PhonePe</option>
                <option value="Paytm">Paytm</option>
                <option value="Bank">Bank</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="PaymentMethod">
                <h5 style={{ fontWeight: "boldb   " }}>Transaction Type</h5>
              </label>
              <select
                class="form-select"
                style={inputStyle}
                onChange={handleTransactionTypeChange}
                value={transactionType}
              >
                <option selected>Open this select menu</option>
                <option value="Deposit">Deposit</option>
                <option value="Withdarw">Withdarw</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="PaymentMethod">
                <h5 style={{ fontWeight: "boldb" }}>Bank</h5>
              </label>
              <select
                class="form-select"
                style={inputStyle}
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

            <div className="form-group">
              <label htmlFor="PaymentMethod">
                <h5 style={{ fontWeight: "boldb" }}>Website</h5>
              </label>
              <select
                class="form-select"
                style={inputStyle}
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

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary"
                style={buttonStyle}
              >
                Submit Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTransaction;
