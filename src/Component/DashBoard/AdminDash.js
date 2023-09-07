import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CardFd } from "./CardFd";
import { CardFdT } from "./CardFdT";
import { useAuth } from "../../Utils/Auth";
import TransactionSercvice from "../../Services/TransactionSercvice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import CalenderService from "../../Services/CalenderService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faDownLeftAndUpRightToCenter,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FaFilter } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./AdminDash.css";
import TopNavbar from "../Sidebar/TopNavbar";
import AccountService from "../../Services/AccountService";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import EditTransaction from "../Modal/EditTransaction";
import { CSVLink } from "react-csv";

const AdminDash = () => {
  const auth = useAuth();
  const nav = useNavigate();

  const [accountData, setAccountData] = useState([]);
  const [documentView, setDocumentView] = useState([]);
  const [documentFilter, setDocumentFilter] = useState([]);
  const [subAdminlist, setSubAdminlist] = useState([]);
  const [subAdmin, setSubAdmin] = useState("");
  const [bankList, setBankList] = useState([]);
  const [bank, setBank] = useState("");
  const [websiteList, setWebsiteList] = useState([]);
  const [website, setWebsite] = useState("");
  const [NormalEditData, setNormalEditData] = useState({
    Id: "",
    amount: "",
    bankName: "",
    paymentMethod: "",
    subAdminName: "",
    transactionID: "",
    transactionType: "",
    userId: "",
    websiteName: "",
    depositAmount: "",
    withdrawAmount: "",
  });
  const [select, setSelect] = useState("All");
  const [toggle, setToggle] = useState(true);
  const [startDatevalue, SetStartDatesetValue] = useState(new Date());
  const [endDatevalue, setEndDateValue] = useState(new Date());

  const test = ["transactionType", "subAdminName", "websiteName", "bankName"];

  const handleClick = (key, value) => {
    let nArr = [...documentView];
    // const originalData = [...documentView];

    if (test.includes(key)) {
      nArr = nArr.filter((item) => item[key] === value);
    }
    // if (nArr.length === 0) {
    //   nArr = originalData;
    // }
    setDocumentView(nArr);
  };

  useEffect(() => {
    TransactionSercvice.getAccountSummary(auth.user).then(
      (res) => (setDocumentView(res.data), setAccountData(res.data))
    );
  }, [auth]);
  console.log(documentView);

  const handelDate = () => {
    const sdate = moment(startDatevalue, "DD-MM-YYYY HH:mm").toDate();
    const edate = moment(endDatevalue, "DD-MM-YYYY HH:mm").toDate();
    const filteredDocuments = documentView.filter((data) => {
      const transactionDate = new Date(data.createdAt);
      return transactionDate >= sdate && transactionDate <= edate;
    });
    setDocumentFilter(filteredDocuments);
    setToggle(false);
  };

  const handleReset = () => {
    setSelect("");
    setDocumentView(accountData);
    setSubAdmin("");
    setBank("");
    setWebsite("");
    setToggle(true);
    SetStartDatesetValue("");
    setEndDateValue("");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);
    handleClick("transactionType", value);
  };

  const handleSubAdmin = (e) => {
    const value = e.target.value;
    setSubAdmin(value);
    handleClick("subAdminName", value);
  };

  const handleBank = (e) => {
    const value = e.target.value;
    setBank(value);
    handleClick("bankName", value);
  };

  const handleWebsite = (e) => {
    const value = e.target.value;
    setWebsite(value);
    handleClick("websiteName", value);
  };

  const handleStartDatevalue = (e) => {
    SetStartDatesetValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  const handleEndDatevalue = (e) => {
    setEndDateValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  useEffect(() => {
    if (auth.user) {
      TransactionSercvice.subAdminList(auth.user).then((res) => {
        setSubAdminlist(res.data);
      });
    }
  }, [auth]);

  useEffect(() => {
    if (auth.user) {
      TransactionSercvice.bankList(auth.user).then((res) => {
        setBankList(res.data);
      });
    }
  }, [auth]);

  useEffect(() => {
    AccountService.website(auth.user).then((res) => setWebsiteList(res.data));
  }, [auth]);


  const handleDelete = (e, id, transactionType) => {
    console.log(transactionType);
    console.log(id);
    switch (transactionType) {
      case "Deposit":
        AccountService.SaveTransaction({ requestId: id }, auth.user)



          .then((res) => {
            console.log(res.data);
            toast.success("Transaction delete request sent to Super Admin");
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "Withdraw":
        AccountService.SaveTransaction({ requestId: id }, auth.user)
          .then((res) => {
            console.log(res.data);
            toast.success("Transaction delete request sent to Super Admin");
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      case "Manual-Bank-Withdraw":
        AccountService.SaveBankTransaction({ requestId: id }, auth.user)

          .then((res) => {
            console.log(res.data);
            toast.success(
              "Bank Transaction delete request sent to Super Admin"
            );
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      case "Manual-Bank-Deposit":
        AccountService.SaveWebsiteTransaction({ requestId: id }, auth.user)

          .then((res) => {
            console.log(res.data);

            toast.success(
              "Website Transaction delete request sent to Super Admin"
            );

          })
          .catch((err) => {
            console.log(err);
          });
        break;

      case "Manual-Website-withdraw":
        AccountService.DeleteWebsiteTransaction(id, auth.user)
          .then((res) => {
            console.log(res.data);

            toast.success(
              "Website Transaction delete request sent to Super Admin"
            );

          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "Manual-Website-Deposit":
        AccountService.DeleteTransaction({ requestId: id }, auth.user)
          .then((res) => {
            console.log(res.data);
            toast.success("Bank Transaction deleted");

          })
          .catch((err) => {
            console.log(err);
          });
        break;
      default:
      // code block
    }
  };

  const handelnormaledit = (
    e,
    id,
    amount,
    bankName,
    paymentMethod,
    subAdminName,
    transactionID,
    transactionType,
    userId,
    websiteName,
    depositAmount,
    withdrawAmount
  ) => {
    const data = {
      id,
      amount,
      bankName,
      paymentMethod,
      subAdminName,
      transactionID,
      transactionType,
      userId,
      websiteName,
      depositAmount,
      withdrawAmount,
    };
    setNormalEditData(data);
    console.log("====>>>>", NormalEditData);
  };

  return (
    <div className="main">
      {/* This is the Main Card */}
      <div
        className="card card-body rounded-1 main "
      // style={{ backgroundImage: gradient }}
      >
        <div className="d-flex mt-5 mt-5 ml-5 pt-5 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2">
            {" "}
            View <FaEye />
          </h6>
          <select
            className="form-control mx-3 w-25"
            value={select || ""}
            autoComplete="off"
            onChange={handleChange}
            style={{
              boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
              border: "0.5px solid black",
              borderRadius: "6px",
            }}
          >
            <option className="d-flex" value="All">
              <b>All</b>
            </option>
            <option className="d-flex" value="Deposit">
              <b>Deposit</b>
            </option>
            <option className="d-flex" value="Withdraw">
              <b>Withdraw</b>
            </option>
            <option className="d-flex" value="Manual-Bank-Deposit">
              <b>Manual Bank Deposit</b>
            </option>{" "}
            <option className="d-flex" value="Manual-Bank-Withdraw">
              <b>Manual Bank Withdraw</b>
            </option>
            <option className="d-flex" value="Manual-Website-Deposit">
              <b>Manual Website Deposit</b>
            </option>{" "}
            <option className="d-flex" value="Manual-Website-Withdraw">
              <b>Manual Website Withdraw</b>
            </option>
          </select>
        </div>

        <div className="d-flex pt-3 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2"> SubAdminlist</h6>
          <select
            className="form-control mx-3 w-25"
            value={subAdmin || ""}
            autoComplete="off"
            onChange={handleSubAdmin}
            style={{
              boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
              border: "0.5px solid black",
              borderRadius: "6px",
            }}
            required
          >
            <option selected>Select subAdmin</option>
            {subAdminlist.map((data) => {
              return (
                <option key={data._id} value={data.firstname}>
                  {data.firstname}
                </option>
              );
            })}
          </select>
        </div>
        <div className="d-flex pt-3 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2"> BankNameList</h6>
          <select
            className="form-control mx-3 w-25"
            value={bank || ""}
            autoComplete="off"
            onChange={handleBank}
            style={{
              boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
              border: "0.5px solid black",
              borderRadius: "6px",
            }}
            required
          >
            <option selected>Select Bank</option>
            {bankList.map((data) => {
              return (
                <option key={data._id} value={data.bankName}>
                  {data.bankName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="d-flex pt-3 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2"> WebsitesList</h6>
          <select
            className="form-control mx-3 w-25"
            value={website || ""}
            autoComplete="off"
            onChange={handleWebsite}
            style={{
              boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
              border: "0.5px solid black",
              borderRadius: "6px",
            }}
            required
          >
            <option selected>Select website</option>
            {websiteList.map((data) => {
              return (
                <option key={data._id} value={data.websiteName}>
                  {data.websiteName}
                </option>
              );
            })}
          </select>
        </div>
        {/* <div className="d-flex mt-2 pl-5 justify-content-center">
         

          <div className="d-flex gap-2 justify-content-between w-25 ms-4">
            <label className="form-label">
              Start date
            </label>
            <Datetime value={startDatevalue}
              onChange={handleStartDatevalue}
              dateFormat="DD-MM-YYYY"
              timeFormat="mm:HH" />
            <label className="form-label">
              Date date
            </label>
            <Datetime value={endDatevalue}
              onChange={handleEndDatevalue}
              dateFormat="DD-MM-YYYY"
              timeFormat="mm-HH" />
            <div>
              {" "}
              <button
                type="button"
                className="btn btn-dark"
                style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
                onClick={handelDate}
              >
                Filter
              </button>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-dark"
                style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div> */}
        <div className="d-flex pt-3 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2"> Start Date</h6>
          <Datetime
            value={startDatevalue}
            onChange={handleStartDatevalue}
            dateFormat="DD-MM-YYYY"
            timeFormat="HH:mm"
          />
        </div>
        <div className="d-flex pt-3 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2"> End Date</h6>
          <Datetime
            value={endDatevalue}
            onChange={handleEndDatevalue}
            dateFormat="DD-MM-YYYY"
            timeFormat="HH:mm"
          />
        </div>
        <div className="d-flex pt-3 justify-content-center">
          <div className="mx-2">
            <button
              type="button"
              className="btn btn-dark"
              style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
              onClick={handelDate}
            >
              Filter
            </button>
          </div>
          <div className="mx-2">
            <button
              type="button"
              className="btn btn-dark"
              style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
          {toggle ? (
            <div className="mx-2">
              <CSVLink data={documentView} className="btn btn-success">
                Download Data
              </CSVLink>
            </div>
          ) : (
            <div className="mx-2">
              <CSVLink data={documentFilter} className="btn btn-success">
                Download Filter Data
              </CSVLink>
            </div>
          )}
        </div>
      </div>

      {toggle ? (
        <div className=" container mt-5">
          {/* This is for Deposit Card Normal View */}
          <div
            className="card  rounded-2 mb-2"
            style={{
              boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
              backgroundImage:
                "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
            }}
          >
            <div className="card-body">
              <div className="row">
                <h4 className="col fs-6">Date</h4>
                <h4 className="col fs-6">Amount</h4>
                <h4 className="col fs-6">Transaction Id</h4>
                <h4 className="col fs-6">Transaction Type</h4>
                <h4 className="col fs-6">Gateway</h4>
                <h4 className="col fs-6">CreatedBy</h4>
                <h4 className="col fs-6">User Id</h4>
                <h4 className="col fs-6">Bank</h4>
                <h4 className="col fs-6">Website</h4>
              </div>
            </div>
          </div>

          {documentView.length > 0 ? (
            documentView.map((data, i) => {
              return (
                <div
                  className="card rounded-2"
                  style={{
                    transition: "transform 0.3s",
                    transform: "scale(1)",
                    boxShadow: "20px 3px 22px 1px rgba(0, 0, 0, 0.36)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.01)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <div className="card-body">
                    <div className="row">
                      <p className="col fs-6">
                        {new Date(data.createdAt).toLocaleString("default")}{" "}
                      </p>
                      {data.amount && (
                        <p className="col fs-6">₹&nbsp;{data.amount}</p>
                      )}
                      {data.depositAmount && (
                        <p className="col fs-6">₹&nbsp;{data.depositAmount}</p>
                      )}
                      {data.withdrawAmount && (
                        <p className="col fs-6">₹&nbsp;{data.withdrawAmount}</p>
                      )}
                      {data.transactionID && (
                        <p className="col fs-6 text-break">
                          {data.transactionID}
                        </p>
                      )}
                      {data.depositAmount && (
                        <p className="col fs-6 text-break">N.A</p>
                      )}
                      {data.withdrawAmount && (
                        <p className="col fs-6 text-break">N.A</p>
                      )}
                      {data.transactionType && (
                        <p className="col fs-6 text-break">
                          {data.transactionType}
                        </p>
                      )}
                      {data.depositAmount && (
                        <p className="col fs-6 text-break">N.A</p>
                      )}
                      {data.withdrawAmount && (
                        <p className="col fs-6 text-break">N.A</p>
                      )}
                      {data.paymentMethod && (
                        <p className="col fs-6">{data.paymentMethod}</p>
                      )}
                      <p className="col fs-6 text-break">{data.subAdminName}</p>
                      {data.paymentMethod && (
                        <p className="col fs-6">{data.userId}</p>
                      )}
                      {data.depositAmount && (
                        <p className="col fs-6 text-break">N.A</p>
                      )}
                      {data.withdrawAmount && (
                        <p className="col fs-6 text-break">N.A</p>
                      )}
                      <p className="col fs-6">
                        {data.bankName ? data.bankName : "N.A"}
                      </p>
                      <p className="col fs-6">
                        {data.websiteName ? data.websiteName : "N.A"}
                      </p>
                      {/* {data.websiteName && (<p className="col fs-6">{data.Bank}</p>)}
                      {data.depositAmount && (<p className="col fs-6 text-break">N.A</p>)}
                      {data.withdrawAmount && (<p className="col fs-6 text-break">N.A</p>)}
                      {data.websiteName && (<p className="col fs-6">{data.websiteName}</p>)}
                      {data.depositAmount && (<p className="col fs-6 text-break">N.A</p>)}
                      {data.withdrawAmount && (<p className="col fs-6 text-break">N.A</p>)} */}
                    </div>

                    {/* <Link to={`/admindash/${data._id}`} className="col">
                      <button type="button" className="btn btn-primary">
                        <FontAwesomeIcon
                          icon={faEdit}
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                        />
                      </button>
                    </Link> */}

                    <button type="button" className="btn btn-primary">
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={(e) => {
                          handleDelete(e, data._id, data.transactionType);
                        }}
                      />
                    </button>


                    {/* <Link to={`/admindash/${data._id}`} className="col"> */}
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#edittransaction"
                      onClick={(e) => {
                        handelnormaledit(
                          e,
                          data._id,
                          data.amount,
                          data.bankName,
                          data.paymentMethod,
                          data.subAdminName,
                          data.transactionID,
                          data.transactionType,
                          data.userId,
                          data.websiteName,
                          data.depositAmount,
                          data.withdrawAmount
                        );
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="text-center">No Transaction Found</h1>
          )}
        </div>
      ) : (
        <div className=" container mt-5">
          {/* This is for Deposit Card Normal View */}
          <div
            className="card  rounded-2 mb-2"
            style={{
              boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
              backgroundImage:
                "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
            }}
          >
            <div className="card-body">
              <div className="row">
                <h4 className="col fs-6">Date</h4>
                <h4 className="col fs-6">Amount</h4>
                <h4 className="col fs-6">Transaction Id</h4>
                <h4 className="col fs-6">Gateway</h4>
                <h4 className="col fs-6">CreatedBy</h4>
                <h4 className="col fs-6">User Id</h4>
                <h4 className="col fs-6">Bank</h4>
                <h4 className="col fs-6">Website</h4>
              </div>
            </div>
          </div>

          {documentFilter.length > 0 ? (
            documentFilter.map((data, i) => {
              return (
                <div
                  className="card rounded-2"
                  style={{
                    transition: "transform 0.3s",
                    transform: "scale(1)",
                    boxShadow: "20px 3px 22px 1px rgba(0, 0, 0, 0.36)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.01)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <div className="card-body">
                    <div className="row">
                      <p className="col fs-6">
                        {new Date(data.createdAt).toLocaleString("default")}{" "}
                      </p>
                      {data.amount && (
                        <p className="col fs-6">₹&nbsp;{data.amount}</p>
                      )}
                      {data.depositAmount && (
                        <p className="col fs-6">₹&nbsp;{data.depositAmount}</p>
                      )}
                      {data.withdrawAmount && (
                        <p className="col fs-6">₹&nbsp;{data.withdrawAmount}</p>
                      )}
                      {data.transactionID && (
                        <p className="col fs-6 text-break">
                          {data.transactionID}
                        </p>
                      )}
                      {data.depositAmount && (
                        <p className="col fs-6 text-break">N.A</p>
                      )}
                      {data.withdrawAmount && (
                        <p className="col fs-6 text-break">N.A</p>
                      )}
                      {data.transactionType && (
                        <p className="col fs-6 text-break">
                          {data.transactionType}
                        </p>
                      )}
                      {data.depositAmount && (
                        <p className="col fs-6 text-break">N.A</p>
                      )}
                      {data.withdrawAmount && (
                        <p className="col fs-6 text-break">N.A</p>
                      )}
                      {data.paymentMethod && (
                        <p className="col fs-6">{data.paymentMethod}</p>
                      )}

                      <p className="col fs-6 text-break">{data.subAdminName}</p>
                      {data.paymentMethod && (
                        <p className="col fs-6">{data.userId}</p>
                      )}
                      {data.depositAmount && (
                        <p className="col fs-6 text-break">N.A</p>
                      )}
                      {data.withdrawAmount && (
                        <p className="col fs-6 text-break">N.A</p>
                      )}
                      <p className="col fs-6">
                        {data.bankName ? data.bankName : "N.A"}
                      </p>
                      <p className="col fs-6">
                        {data.websiteName ? data.websiteName : "N.A"}
                      </p>
                      {/* {data.websiteName && (<p className="col fs-6">{data.Bank}</p>)}
                      {data.depositAmount && (<p className="col fs-6 text-break">N.A</p>)}
                      {data.withdrawAmount && (<p className="col fs-6 text-break">N.A</p>)}
                      {data.websiteName && (<p className="col fs-6">{data.websiteName}</p>)}
                      {data.depositAmount && (<p className="col fs-6 text-break">N.A</p>)}
                      {data.withdrawAmount && (<p className="col fs-6 text-break">N.A</p>)} */}
                    </div>
                    <Link to={`/admindash/${data._id}`} className="col">
                      <button type="button" className="btn btn-primary">
                        <FontAwesomeIcon
                          icon={faEdit}
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                        />
                      </button>
                    </Link>
                    <button type="button" className="btn btn-primary">
                      <FontAwesomeIcon
                        icon={faTrash}

                        onClick={(e) => {
                          handleDelete(e, data._id, data.transactionType);
                        }}

                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="text-center">No Transaction Found</h1>
          )}
        </div>
      )}
      <EditTransaction Data={NormalEditData} />
    </div>
  );
};

export default AdminDash;
