import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../Utils/Auth";
import { useParams } from "react-router";
import AccountService from "../../Services/AccountService";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import TransactionSercvice from "../../Services/TransactionSercvice";
import { toast } from "react-toastify";
import EditTransaction from "../Modal/EditTransaction";

const WebsiteStatement = () => {
  const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState([]);
  const [documentView, setDocumentView] = useState([]);
  const [documentFilter, setDocumentFilter] = useState([]);
  const [Manualstmnt, SetManualstmnt] = useState([]);
  const [Userstmnt, SetUserstmnt] = useState([]);
  const [select, setSelect] = useState("All");
  const [startDatevalue, SetStartDatesetValue] = useState(new Date());
  const [endDatevalue, setEndDateValue] = useState(new Date());
  const [toggle, setToggle] = useState(true);
  const [subAdminlist, setSubAdminlist] = useState([]);
  const [subAdmin, setSubAdmin] = useState("");
  const [bankList, setBankList] = useState([]);
  const [bank, setBank] = useState("");
  const [introducerList, setIntroducerList] = useState([]);
  const [introducer, setIntroducer] = useState("");
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

  console.log("This is Website Name", id);

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

  const handleIntroducer = (e) => {
    const value = e.target.value;
    setIntroducer(value);
    handleClick("introducerId", value);
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


  useEffect(() => {
    const fetchManualStatement = async () => {
      try {
        const res = await AccountService.GetWebsiteStateMent(id, auth.user);
        setDocumentView(res.data);
        setAccountData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchManualStatement();
  }, [id, auth]);
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

  useEffect(() => {
    AccountService.introducerId(auth.user).then((res) => setIntroducerList(res.data));
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

  const handleStartDatevalue = (e) => {
    SetStartDatesetValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  const handleEndDatevalue = (e) => {
    setEndDateValue(moment(e).format("DD-MM-YYYY HH:mm"));
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

  const handleDelete = (e, id, transactionType) => {
    console.log(transactionType);
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

  // const handleDel = (id) => {
  //   TransactionSercvice.delWebTransactionData(id, auth.user)
  //     .then((response) => {
  //       console.log(response.data);
  //       navigate("/admindash");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       toast.error("Failed! Invalid Data");
  //     });
  // };

  console.log("Website Names Manual =>>>", Manualstmnt);
  console.log("Website Names User =>>>", Userstmnt);
  return (
    <div>
      <div className="">
        {/* This is for Normal View */}
        <div className="d-flex mt-5 mt-5 ml-5 pt-5 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2">View</h6>
          <select
            className="form-control mx-3 w-25 mb-2"
            value={select || ""}
            autoComplete="off"
            onChange={handleChange}
            style={{
              boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
              border: "0.5px solid black",
              borderRadius: "6px",
            }}
          >
            {" "}
            <option className="d-flex" value="All">
              <b>All</b>
            </option>
            <option className="d-flex" value="Manual-Deposit">
              <b>Manual Entry(Deposit)</b>
            </option>
            <option className="d-flex" value="Manual-Deposit">
              <b>Manual Entry(Withdraw)</b>
            </option>
            <option className="d-flex" value="Deposit">
              <b>User Entry(Deposit)</b>
            </option>
            <option className="d-flex" value="Withdraw">
              <b>User Entry(Withdraw)</b>
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
          <h6 className="fw-bold text-nowrap pt-2"> Introducerlist</h6>
          <select
            className="form-control mx-3 w-25"
            value={introducer || ""}
            autoComplete="off"
            onChange={handleIntroducer}
            style={{
              boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
              border: "0.5px solid black",
              borderRadius: "6px",
            }}
            required
          >
            <option selected>Select Introducer</option>
            {introducerList.map((data) => {
              return (
                <option key={data._id} value={data.introducerId}>
                  {data.introducerId}
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
        <div className="d-flex pt-2 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2"> Start Date</h6>
          <Datetime
            value={startDatevalue}
            onChange={handleStartDatevalue}
            dateFormat="DD-MM-YYYY"
            timeFormat="HH:mm"
          />
        </div>
        <div className="d-flex pt-2 justify-content-center mb-3">
          <h6 className="fw-bold text-nowrap pt-2"> End Date</h6>
          <Datetime
            value={endDatevalue}
            onChange={handleEndDatevalue}
            dateFormat="DD-MM-YYYY"
            timeFormat="HH:mm"
          />
        </div>
        <div className="d-flex pt-3 justify-content-center mb-2">
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
          <div className="mx-2">
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
          <small>
            {/* Normal View */}
            <table class="table table-bordered  table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl w-auto ml-5">
              {/* This is for Deposit Card Normal View */}
              {/* <div
            className="card  rounded-2 mb-2"
            style={{
              boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
              backgroundImage:
                "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
            }}
          > */}
              <thead className="table-success">
                <tr align="center" bgcolor="green" className="fs-6">
                  <th scope="col fs-6" className="text-primary">
                    Date <br />&<br /> Time
                  </th>
                  <th scope="col text-break fs-6" className="text-primary">
                    Amount
                  </th>
                  <th scope="col text-break fs-6" className="text-primary">
                    Transaction Id
                  </th>
                  <th scope="col text-break fs-6" className="text-primary">
                    Transaction Type
                  </th>
                  <th scope="col fs-6" className="text-primary">
                    Gateway
                  </th>
                  <th scope="col fs-6" className="text-primary">
                    CreatedBy
                  </th>
                  <th scope="col fs-6" className="text-primary">
                    User Id
                  </th>
                  {/* <th scope="col" className="text-primary">
                    Bank
                  </th> */}
                  {/* <th scope="col" className="text-primary">
                    Website
                  </th> */}
                  {/* <th scope="col text-break fs-6" className="text-primary">
                    Before Bank Balance
                  </th> */}
                  {/* <th scope="col text-break fs-6" className="text-primary">
                    Current Bank Balance
                  </th> */}
                  <th scope="col text-break fs-6" className="text-primary">
                    Before Website Balance
                  </th>
                  <th scope="col text-break fs-6" className="text-primary">
                    Current Website Balance
                  </th>
                  <th scope="col text-break fs-6" className="text-primary">
                    Before Balance
                    <br />
                    (Manual)
                  </th>
                  <th scope="col text-break fs-6" className="text-primary">
                    Current Balance
                    <br />
                    (Manual)
                  </th>
                  <th scope="col text-break" className="text-primary">
                    Remarks
                  </th>
                  <th scope="col text-break" className="text-primary">
                    Edit
                  </th>
                  <th scope="col text-break" className="text-primary">
                    Delete
                  </th>
                </tr>
              </thead>
              {/* </div> */}
              <tbody>
                {documentView.length > 0 ? (
                  documentView.map((data, i) => {
                    return (
                      <tr align="center" className="fs-6">
                        <td>
                          {" "}
                          {new Date(data.createdAt).toLocaleString(
                            "default"
                          )}{" "}
                        </td>
                        <td className="text-break">
                          {data.amount && (
                            <p className="col fs-6">₹&nbsp;{data.amount}</p>
                          )}
                          {data.depositAmount && (
                            <p className="col fs-6">
                              ₹&nbsp;{data.depositAmount}
                            </p>
                          )}
                          {data.withdrawAmount && (
                            <p className="col fs-6">
                              ₹&nbsp;{data.withdrawAmount}
                            </p>
                          )}
                        </td>
                        <td>
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
                        </td>
                        <td>
                          {data.transactionType && (
                            <p className="col fs-6 text-break">
                              {data.transactionType}
                            </p>
                          )}
                        </td>
                        <td>
                          {data.paymentMethod && (
                            <p className="col fs-6">{data.paymentMethod}</p>
                          )}
                          {data.depositAmount && (
                            <p className="col fs-6 text-break">N.A</p>
                          )}
                          {data.withdrawAmount && (
                            <p className="col fs-6 text-break">N.A</p>
                          )}
                        </td>
                        <td>{data.subAdminName}</td>
                        <td>
                          {data.paymentMethod && (
                            <p className="col fs-6">{data.userId}</p>
                          )}
                          {data.depositAmount && (
                            <p className="col fs-6 text-break">N.A</p>
                          )}
                          {data.withdrawAmount && (
                            <p className="col fs-6 text-break">N.A</p>
                          )}
                        </td>
                        {/* <td>
                          <p className="col fs-6">
                            {data.bankName ? data.bankName : "N.A"}
                          </p>
                        </td> */}
                        {/* <td>
                          <p className="col fs-6">
                            {data.websiteName ? data.websiteName : "N.A"}
                          </p>
                        </td> */}
                        {/* <td>
                          {data.beforeBalanceBankWithdraw ? (
                            <p className="col fs-6">
                              {data.beforeBalanceBankWithdraw && (
                                <p className="col fs-6 text-break">
                                  ₹&nbsp; {data.beforeBalanceBankWithdraw}
                                </p>
                              )}
                              {data.beforeBalanceBankDeposit && (
                                <p className="col fs-6 text-break">
                                  ₹&nbsp; {data.beforeBalanceBankDeposit}
                                </p>
                              )}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td> */}
                        {/* <td>
                          {data.beforeBalanceBankWithdraw ? (
                            <p className="col fs-6">
                              {data.currentBalanceBankWithdraw && (
                                <p className="col fs-6 text-break">
                                  ₹&nbsp; {data.currentBalanceBankWithdraw}
                                </p>
                              )}
                              {data.currentBalanceBankDeposit && (
                                <p className="col fs-6 text-break">
                                  ₹&nbsp; {data.currentBalanceBankDeposit}
                                </p>
                              )}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td> */}
                        <td>
                          {data.beforeBalanceBankWithdraw ? (
                            <p className="col fs-6">
                              {data.beforeBalanceWebsiteWithdraw && (
                                <p className="col fs-6 text-break">
                                  ₹&nbsp; {data.beforeBalanceWebsiteWithdraw}
                                </p>
                              )}
                              {data.beforeBalanceWebsiteDeposit && (
                                <p className="col fs-6 text-break">
                                  ₹&nbsp; {data.beforeBalanceWebsiteDeposit}
                                </p>
                              )}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td>
                        <td>
                          {data.beforeBalanceBankWithdraw ? (
                            <p className="col fs-6">
                              {data.currentBalanceWebsiteWithdraw && (
                                <p className="col fs-6 text-break">
                                  ₹&nbsp; {data.currentBalanceWebsiteWithdraw}
                                </p>
                              )}
                              {data.currentBalanceWebsiteDeposit && (
                                <p className="col fs-6 text-break">
                                  ₹&nbsp; {data.currentBalanceWebsiteDeposit}
                                </p>
                              )}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td>
                        <td>
                          {data.beforeBalance ? (
                            <p className="col fs-6">
                              {data.beforeBalance ? data.beforeBalance : "N.A"}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td>
                        <td>
                          {data.currentBalance ? (
                            <p className="col fs-6">
                              {data.currentBalance
                                ? data.currentBalance
                                : "N.A"}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td>

                        <td>{data.remark}</td>
                        <td>
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
                        </td>
                        <td>
                          <button type="button" className="btn btn-danger">
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={(e) => {
                                handleDelete(e, data._id, data.transactionType);
                              }}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <h1 className="text-center">No Transaction Found</h1>
                )}
              </tbody>
            </table>
          </small>
        ) : (
          <small>
            {/* Normal View */}
            <table class="table table-bordered  table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl w-auto ml-5">
              {/* This is for Deposit Card Normal View */}
              {/* <div
            className="card  rounded-2 mb-2"
            style={{
              boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
              backgroundImage:
                "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
            }}
          > */}
              <thead className="table-success">
                <tr align="center" bgcolor="green" className="fs-6">
                  <th scope="col fs-6" className="text-primary">
                    Date <br />&<br /> Time
                  </th>
                  <th scope="col text-break fs-6" className="text-primary">
                    Amount
                  </th>
                  <th scope="col text-break fs-6" className="text-primary">
                    Transaction Id
                  </th>
                  <th scope="col text-break fs-6" className="text-primary">
                    Transaction Type
                  </th>
                  <th scope="col fs-6" className="text-primary">
                    Gateway
                  </th>
                  <th scope="col fs-6" className="text-primary">
                    CreatedBy
                  </th>
                  <th scope="col fs-6" className="text-primary">
                    User Id
                  </th>
                  {/* <th scope="col" className="text-primary">
                    Bank
                  </th> */}
                  {/* <th scope="col" className="text-primary">
                    Website
                  </th> */}
                  {/* <th scope="col text-break fs-6" className="text-primary">
                    Before Bank Balance
                  </th> */}
                  {/* <th scope="col text-break fs-6" className="text-primary">
                    Current Bank Balance
                  </th> */}
                  <th scope="col text-break fs-6" className="text-primary">
                    Before Website Balance
                  </th>
                  <th scope="col text-break fs-6" className="text-primary">
                    Current Website Balance
                  </th>
                  <th scope="col text-break fs-6" className="text-primary">
                    Before Balance
                    <br />
                    (Manual)
                  </th>
                  <th scope="col text-break fs-6" className="text-primary">
                    Current Balance
                    <br />
                    (Manual)
                  </th>
                  <th scope="col text-break" className="text-primary">
                    Remarks
                  </th>
                  <th scope="col text-break" className="text-primary">
                    Edit
                  </th>
                  <th scope="col text-break" className="text-primary">
                    Delete
                  </th>
                </tr>
              </thead>
              {/* </div> */}
              <tbody>
                {documentFilter.length > 0 ? (
                  documentFilter.map((data, i) => {
                    return (
                      <tr align="center" className="fs-6">
                        <td>
                          {" "}
                          {new Date(data.createdAt).toLocaleString(
                            "default"
                          )}{" "}
                        </td>
                        <td className="text-break">
                          {data.amount && (
                            <p className="col fs-6">₹&nbsp;{data.amount}</p>
                          )}
                          {data.depositAmount && (
                            <p className="col fs-6">
                              ₹&nbsp;{data.depositAmount}
                            </p>
                          )}
                          {data.withdrawAmount && (
                            <p className="col fs-6">
                              ₹&nbsp;{data.withdrawAmount}
                            </p>
                          )}
                        </td>
                        <td>
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
                        </td>
                        <td>
                          {data.transactionType && (
                            <p className="col fs-6 text-break">
                              {data.transactionType}
                            </p>
                          )}
                        </td>
                        <td>
                          {data.paymentMethod && (
                            <p className="col fs-6">{data.paymentMethod}</p>
                          )}
                          {data.depositAmount && (
                            <p className="col fs-6 text-break">N.A</p>
                          )}
                          {data.withdrawAmount && (
                            <p className="col fs-6 text-break">N.A</p>
                          )}
                        </td>
                        <td>{data.subAdminName}</td>
                        <td>
                          {data.paymentMethod && (
                            <p className="col fs-6">{data.userId}</p>
                          )}
                          {data.depositAmount && (
                            <p className="col fs-6 text-break">N.A</p>
                          )}
                          {data.withdrawAmount && (
                            <p className="col fs-6 text-break">N.A</p>
                          )}
                        </td>
                        {/* <td>
                          <p className="col fs-6">
                            {data.bankName ? data.bankName : "N.A"}
                          </p>
                        </td> */}
                        {/* <td>
                          <p className="col fs-6">
                            {data.websiteName ? data.websiteName : "N.A"}
                          </p>
                        </td> */}
                        {/* <td>
                          {data.beforeBalanceBankWithdraw ? (
                            <p className="col fs-6">
                              {data.beforeBalanceBankWithdraw && (
                                <p className="col fs-6 text-break">
                                  ₹&nbsp; {data.beforeBalanceBankWithdraw}
                                </p>
                              )}
                              {data.beforeBalanceBankDeposit && (
                                <p className="col fs-6 text-break">
                                  ₹&nbsp; {data.beforeBalanceBankDeposit}
                                </p>
                              )}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td> */}
                        {/* <td>
                          {data.beforeBalanceBankWithdraw ? (
                            <p className="col fs-6">
                              {data.currentBalanceBankWithdraw && (
                                <p className="col fs-6 text-break">
                                  ₹&nbsp; {data.currentBalanceBankWithdraw}
                                </p>
                              )}
                              {data.currentBalanceBankDeposit && (
                                <p className="col fs-6 text-break">
                                  ₹&nbsp; {data.currentBalanceBankDeposit}
                                </p>
                              )}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td> */}
                        <td>
                          {data.beforeBalanceBankWithdraw ? (
                            <p className="col fs-6">
                              {data.beforeBalanceWebsiteWithdraw && (
                                <p className="col fs-6 text-break">
                                  ₹&nbsp; {data.beforeBalanceWebsiteWithdraw}
                                </p>
                              )}
                              {data.beforeBalanceWebsiteDeposit && (
                                <p className="col fs-6 text-break">
                                  ₹&nbsp; {data.beforeBalanceWebsiteDeposit}
                                </p>
                              )}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td>
                        <td>
                          {data.beforeBalanceBankWithdraw ? (
                            <p className="col fs-6">
                              {data.currentBalanceWebsiteWithdraw && (
                                <p className="col fs-6 text-break">
                                  ₹&nbsp; {data.currentBalanceWebsiteWithdraw}
                                </p>
                              )}
                              {data.currentBalanceWebsiteDeposit && (
                                <p className="col fs-6 text-break">
                                  ₹&nbsp; {data.currentBalanceWebsiteDeposit}
                                </p>
                              )}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td>
                        <td>
                          {data.beforeBalance ? (
                            <p className="col fs-6">
                              {data.beforeBalance ? data.beforeBalance : "N.A"}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td>
                        <td>
                          {data.currentBalance ? (
                            <p className="col fs-6">
                              {data.currentBalance
                                ? data.currentBalance
                                : "N.A"}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td>

                        <td>{data.remark}</td>
                        <td>
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
                        </td>
                        <td>
                          <button type="button" className="btn btn-danger">
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={(e) => {
                                handleDelete(e, data._id, data.transactionType);
                              }}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <h1 className="text-center">No Transaction Found</h1>
                )}
              </tbody>
            </table>
          </small>
        )}
      </div>
      <EditTransaction Data={NormalEditData} />
    </div>
  );
};

export default WebsiteStatement;
