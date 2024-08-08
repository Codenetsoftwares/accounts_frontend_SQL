import React, { useState, useEffect } from "react";
import { BsArrowLeftRight } from "react-icons/bs";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import DashService from "../../Services/DashService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Deposit() {
  const auth = useAuth();
  const [Bank, setBank] = useState([]);
  const [Website, setWebsite] = useState([]);
  const [WebsiteName, setWebsiteName] = useState([]);
  const [UId, setUId] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [SendUId, setSendUId] = useState([]);
  const [introducerId, setIntroducerId] = useState([]);
  const [Sendintroducer, setSendIntroducer] = useState([]);
  const [BankAccNo, SetBankAccNo] = useState([]);
  const [transactionId, setTransactionId] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bonus, setBonus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    AccountService.getActiveBank(auth.user).then((res) => setBank(res.data));
  }, [auth]);
  console.log("bank names", Bank);

  useEffect(() => {
    AccountService.getActiveWebsite(auth.user).then((res) =>
      setWebsite(res.data)
    );
  }, [auth]);
  console.log("Website Names", Website);
  useEffect(() => {
    AccountService.userId(auth.user).then((res) => setUId(res.data));
  }, [auth]);
  useEffect(() => {
    AccountService.introducerId(auth.user).then((res) =>
      setIntroducerId(res.data)
    );
  }, [auth]);
  console.log("user Id", introducerId);

  const handleSubmit = () => {
    // "transactionID" : "dffgdgdg",
    // "transactionType" : "Deposit",
    // "amount" : 100,
    // "paymentMethod" : "G-Pay",
    // "userName" : "Tom@123",
    // "subAdminUserName" : "Demo_Admin",
    // "accountNumber" : 658451457845145,
    // "websiteName" : "himanshu.com",
    // "bankName" : "Himanshu Bank of Testing",
    // "bonus" : 5,
    // "remarks" : "Amount Transfer From Website to Bank"

    const data = {
      transactionID: transactionId,
      transactionType: "Deposit",
      amount: Number(amount),
      paymentMethod: paymentMethod,
      subAdminUserName: auth.user.userName,
      userName: searchTerm,
      bankName: BankAccNo[0],
      accountNumber: Number(BankAccNo[1]),
      websiteName: WebsiteName,
      bonus: Number(bonus),
      remarks: remarks,
      // introducerUserName: Sendintroducer,
    };
    console.log(data);

    const confirmed = window.confirm(
      "Please double-check the form on obhiasb before confirming, as changes or deletions won't be possible afterward."
    );
    if (confirmed) {
      DashService.CreateTransactionDeposit(data, auth.user)
        .then((response) => {
          // Handle successful response from the backend
          console.log(response.data);
          alert("Transaction Created Successfully!!");
          window.location.reload();
        })
        .catch((error) => {
          // Handle error from the backend
          console.error(error);
          alert(error.response.data.message);
        });
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter the options based on the input value

    const filtered = value
      ? UId.filter((data) =>
        data.userName.toLowerCase().includes(value.toLowerCase())
      )
      : [];

    setFilteredOptions(filtered);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchTerm(option.userName);
    setFilteredOptions([]); // Clear the filtered options when an option is selected
  };

  return (
    <div
      className="Container fluid='lg'"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        // background: "linear-gradient(to left, green, white)",
        margin: 0,
        padding: 12,
        boxSizing: "border-box",
        color: "white",
      }}
    >
      <div
        className="form-box"
        style={{
          width: "380px",
          // height: '450px',
          backgroundColor: "black",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          opacity: 1,
          borderRadius: "2%",
        }}
      >
        <div
          className="header-form"
          style={{
            marginBottom: "15px",
          }}
        >
          <h4 className="text-success text-center">
            {/* <i className="fa fa-user-circle" style={{ fontSize: "110px" }}></i> */}
            <span style={{ fontSize: "50px" }}>Deposit</span>
          </h4>
          <div className="image"></div>
        </div>
        <div className="body-form">
          <form>
            <div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user id"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by User Name"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </div>
              {filteredOptions.length > 0 && (
                <div className="list-group">
                  {filteredOptions.map((option, index) => (
                    <button
                      key={index}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option.userName}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i class="fa fa-user id"></i>
                </span>
              </div>
              <select
                type="text"
                className="form-select"
                onChange={(e) => {
                  setSendIntroducer(e.target.value); // Parse the JSON string back to an array
                }}
              >
                <option selected>Introducer Name</option>
                {introducerId.map((data, index) => (
                  <option key={index} value={data.userName}>
                    {data.userName}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <BsArrowLeftRight />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Transaction Id"
                onChange={(e) => {
                  setTransactionId(e.target.value);
                }}
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i>
                    <b>&#8377;</b>
                  </i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Amount"
                value={amount}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  // Check if the input is a non-negative number or empty
                  if (/^\d*\.?\d*$/.test(inputValue)) {
                    setAmount(inputValue);
                  }
                }}
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i class="fa fa-credit-card"></i>
                </span>
              </div>
              <select
                type="text"
                className="form-select"
                value={paymentMethod||""} 
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
              >
                <option selected>Select PaymentMethod</option>
                <option  value="UPI">
                  <b>UPI</b>
                </option>
                <option  value="IMPS">
                  <b>IMPS</b>
                </option>
              </select>
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i class="fa fa-gift"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Bonus"
                value={bonus}
                onChange={(e) => {
                  const BnousValue = e.target.value;
                  // Check if the input is a non-negative number or empty
                  if (/^\d*\.?\d*$/.test(BnousValue)) {
                    setBonus(BnousValue);
                  }
                }}
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i class="fa fa-university"></i>
                </span>
              </div>
              <select
                type="text"
                className="form-select"
                value={JSON.stringify(BankAccNo)} // Store the array as a JSON string
                onChange={(e) => {
                  SetBankAccNo(JSON.parse(e.target.value));
                }}
              >
                <option selected>Select Bank</option>
                {Bank.map((data, index) => {
                  // Checking if isActive is true before rendering the bank name
                  if (data.isActive) {
                    return (
                      <option
                        key={index}
                        value={JSON.stringify([
                          data.bankName,
                          data.accountNumber,
                        ])}
                      >
                        {data.bankName}
                      </option>
                    );
                  } else {
                    return null;
                  }
                })}
              </select>
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-globe nav-icon" />
                </span>
              </div>
              <select
                type="text"
                className="form-select"
                onChange={(e) => {
                  setWebsiteName(e.target.value); // Set the selected website name
                }}
              >
                <option selected>Select Website</option>
                {Website.map((data, index) => {
                  // Checking if isActive is true before rendering the website name
                  if (data.isActive) {
                    return (
                      <option key={index} value={data.websiteName}>
                        {data.websiteName}
                      </option>
                    );
                  } else {
                    return null;
                  }
                })}
              </select>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i class="fas fa-comment"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-outline-success btn-block"
              onClick={handleSubmit}
              style={{
                marginTop: "40px",
                marginBottom: "10px",
              }}
            >
              Deposit
            </button>
            <div
              className="message"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            ></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Deposit;
