import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import { useNavigate, useParams } from "react-router";
import AccountService from "../../Services/AccountService";
import { toast } from "react-toastify";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CSVLink } from "react-csv";
import EditTransaction from "../Modal/EditTransaction";
import TransactionSercvice from "../../Services/TransactionSercvice";
import { Button } from "react-bootstrap";
import Pagination from "../Pagination";

const BankStatement = () => {
  const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();

  const [accountData, setAccountData] = useState([]);
  const [documentView, setDocumentView] = useState([]);
  const [documentFilter, setDocumentFilter] = useState([]);
  const [Manualstmnt, SetManualstmnt] = useState([]);
  const [Userstmnt, SetUserstmnt] = useState([]);
  const [select, setSelect] = useState("All");
  // const [startDatevalue, SetStartDatesetValue] = useState(
  //   new Date() - 1 * 24 * 60 * 60 * 1000
  // );
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 1);

  const [startDatevalue, SetStartDatesetValue] = useState(defaultStartDate);
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
  const [dataId, setDataId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");
  const [length, setLength] = useState("");
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);

  const test = ["transactionType", "subAdminName", "websiteName", "bankName"];

  const handleClick = (key, value) => {
    let nArr = [...documentView];

    if (test.includes(key)) {
      nArr = nArr.filter((item) => item[key] === value);
    }
    setDocumentView(nArr);

  };

  const handleId = (e, id) => {
    e.preventDefault();
    setDataId(id);
  };

  useEffect(() => {
    AccountService.GetBankStMent(auth.user, id)
      .then(
        (res) => (
          setDocumentView(res.data),
          setAccountData(res.data),
          setLength((res.data).length),
          setTotalPage(Math.ceil((res.data).length) / 10)
        )
      )
      .catch((err) => {
        toast.error(err.response.data.message);

      });
  }, [id, auth]);

  useEffect(() => {
    if (auth.user) {
      TransactionSercvice.subAdminList(auth.user).then((res) => {
        setSubAdminlist(res.data);
      
      });
    }
  }, [auth]);

  // useEffect(() => {
  //   if (auth.user) {
  //     TransactionSercvice.bankList(auth.user).then((res) => {
  //       setBankList(res.data);
  //     });
  //   }
  // }, [auth]);

  useEffect(() => {
    handleFilter()
  }, [documentView]);

  // useEffect(() => {
  //   AccountService.introducerId(auth.user).then((res) =>
  //     setIntroducerList(res.data)
  //   );
  // }, [auth]);

  const selectPageHandler = (selectedPage) => {
  

    setPage(selectedPage);
  };

  const handleFilter = () => {
    const sdate = moment(startDatevalue, 'DD-MM-YYYY HH:mm').toDate();
    const edate = moment(endDatevalue, 'DD-MM-YYYY HH:mm').toDate();
    console.log("sdate=====>", sdate);
    console.log("edate=====>", edate)
    console.log("documentView=====>", documentView)
    let filteredDocuments = documentView.filter((data) => {
      const transactionDate = new Date(data.createdAt);
      return transactionDate >= sdate && transactionDate <= edate;
    });

    if (minAmount !== 0 || maxAmount !== 0) {
      filteredDocuments = filteredDocuments.filter((transaction) => {
        return (
          transaction.withdrawAmount >= minAmount &&
          transaction.withdrawAmount <= maxAmount ||
          transaction.depositAmount >= minAmount &&
          transaction.depositAmount <= maxAmount ||
          transaction.amount >= minAmount &&
          transaction.amount <= maxAmount

        );
      }
      );
    };
    console.log("filteredDocuments=======>", filteredDocuments)
    setDocumentFilter(filteredDocuments);
    setToggle(false);
    setPage(1);
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);
    handleClick("transactionType", value);
    setPage(1);
  };

  const handleSubAdmin = (e) => {
    const value = e.target.value;
    setSubAdmin(value);
    handleClick("subAdminName", value);
    setPage(1);
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

  const handleMinAmount = (e) => {
    const value = e.target.value;
    setMinAmount(value);
  };
  const handleMaxAmount = (e) => {
    const value = e.target.value;
    setMaxAmount(value);
  };

  const handleDelete = (e, id, transactionType) => {
  
    switch (transactionType) {
      case "Deposit":
        AccountService.SaveTransaction({ requestId: id }, auth.user)

          .then((res) => {
          

            toast.success("Transaction delete request sent to Super Admin");
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
        break;
      case "Withdraw":
        AccountService.SaveTransaction({ requestId: id }, auth.user)
          .then((res) => {
  
            toast.success("Transaction delete request sent to Super Admin");
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
        break;

      case "Manual-Bank-Withdraw":
        AccountService.SaveBankTransaction({ requestId: id }, auth.user)

          .then((res) => {
   
            toast.success(
              "Bank Transaction delete request sent to Super Admin"
            );
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
        break;

      case "Manual-Bank-Deposit":
        AccountService.SaveBankTransaction({ requestId: id }, auth.user)

          .then((res) => {
      
            toast.success(
              "Website Transaction delete request sent to Super Admin"
            );
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
        break;

      case "Manual-Website-Withdraw":
        AccountService.SaveWebsiteTransaction({ requestId: id }, auth.user)
          .then((res) => {
      
            toast.success(
              "Website Transaction delete request sent to Super Admin"
            );
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
        break;
      case "Manual-Website-Deposit":
        AccountService.SaveWebsiteTransaction({ requestId: id }, auth.user)
          .then((res) => {

            toast.success("Bank Transaction deleted");
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
        break;
      default:
      // code block
    }
  };

  const handleReset = () => {
    setSelect("");
    setDocumentView(accountData);
    setSubAdmin("");
    setBank("");
    setWebsite("");
    setToggle(true);
    SetStartDatesetValue(new Date() - 1 * 24 * 60 * 60 * 1000);
    setEndDateValue(new Date());
    setPage(1);
    setMinAmount(0);
    setMaxAmount(0);
    window.location.reload()
  };

  const handleStartDatevalue = (e) => {
    SetStartDatesetValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  const handleEndDatevalue = (e) => {
    setEndDateValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  let reminder = documentView.length % 10;
  let lastPage = Math.ceil(documentView.length / 10);
  let filterReminder = documentFilter.length % 10;
  let filterLastPage = Math.ceil(documentFilter.length / 10);
  let lastFilterPageReminder = documentView.length % 10 === !0
  let lastPageReminder = documentFilter.length % 10 === !0

  return (
    <>
      <div className="">
        {/* This is for Normal View */}
        <div
          className="card card-body rounded-1 "
          style={{ backgroundColor: "#fff4ec" }}
        >
          <div className="row row-cols-2 row-cols-lg-3 g-2 g-lg-2">
            <div className="d-flex col pt-3 justify-content-center">
              <h6 className="fw-bold text-nowrap pt-2">Transaction</h6>
              <select
                className="form-control mx-3 w-50"
                value={select || ""}
                autoComplete="off"
                onChange={handleChange}
                style={{
                  // boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
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
                {/* <option className="d-flex" value="Manual-Website-Deposit">
                  <b>Manual Website Deposit</b>
                </option>{" "}
                <option className="d-flex" value="Manual-Website-Withdraw">
                  <b>Manual Website Withdraw</b>
                </option> */}
              </select>
            </div>

            <div className="d-flex col pt-3 justify-content-center">
              <h6 className="fw-bold text-nowrap pt-2"> SubAdminlist</h6>
              <select
                className="form-control mx-3 w-50"
                value={subAdmin || ""}
                autoComplete="off"
                onChange={handleSubAdmin}
                style={{
                  // boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
                  border: "0.5px solid black",
                  borderRadius: "6px",
                }}
                required
              >
                <option selected>Select subAdmin</option>
                {subAdminlist.map((data) => {
                  return (
                    <option key={data._id} value={data.userName}>
                      {data.userName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="d-flex col pt-3 justify-content-center"  >
              <h6 className="fw-bold text-nowrap pt-2"> Range Of Amount</h6>
              <input
                className="form-control mx-3 w-25"
                type='number'
                value={minAmount || ""}
                autoComplete="off"
                onChange={handleMinAmount}
                placeholder='Min Amt'
                style={{
                  border: "0.5px solid black",
                  borderRadius: "6px",
                }}
                required
                min={1}
              />
              <h6 className="fw-bold text-nowrap pt-2"> To</h6>
              <input
                className="form-control mx-3 w-25"
                type='number'
                value={maxAmount || ""}
                autoComplete="off"
                onChange={handleMaxAmount}
                placeholder='Max Amt'
                style={{
                  border: "0.5px solid black",
                  borderRadius: "6px",
                }}
                min={1}
                required
              />
            </div>

            <div
              className="row row-cols-4 row-cols-lg-4 g-2 g-lg-3 w-100 "
              style={{ paddingLeft: "5rem" }}
            >
              <div className="d-flex col justify-content-center ">
                <h6 className="fw-bold text-nowrap pt-2 pr-2"> Start Date</h6>
                <Datetime
                  value={startDatevalue}
                  onChange={handleStartDatevalue}
                  dateFormat="DD-MM-YYYY"
                  timeFormat="HH:mm"
                />
              </div>
              <div className="d-flex col  justify-content-center">
                <h6 className="fw-bold text-nowrap pt-2 pr-2"> End Date</h6>
                <Datetime
                  value={endDatevalue}
                  onChange={handleEndDatevalue}
                  dateFormat="DD-MM-YYYY"
                  timeFormat="HH:mm"
                />
              </div>
              <div className="d-flex col justify-content-center">
                <div className="mx-2">
                  <button
                    type="button"
                    className="btn btn-dark"
                    // style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
                    onClick={handleFilter}
                  >
                    Filter
                  </button>
                </div>
                <div className="mx-2">
                  <button
                    type="button"
                    className="btn btn-dark"
                    // style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
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
          </div>
        </div>
        {toggle ? (
          <div>
            {/* Normal View */}
            <table className="table table-bordered  table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl">
              <thead className="table-success">
                <tr align="center" bgcolor="green" className="fs-6">
                  <th scope="col fs-6" className="text-primary">
                    Date & Time
                  </th>
                  <th scope="col text-break fs-6" className="text-primary">
                    Amount
                  </th>
                  <th scope="col text-break fs-6" className="text-primary">
                    Txn Id
                  </th>
                  <th scope="col text-break fs-6" className="text-primary">
                    Txn Type
                  </th>
                  <th scope="col fs-6" className="text-primary">
                    Gateway
                  </th>
                  <th scope="col fs-6" className="text-primary">
                    Entry by
                  </th>
                  <th scope="col fs-6" className="text-primary">
                    User Name
                  </th>

                  <th scope="col text-break fs-6" className="text-primary">
                    Balance
                  </th>

                  <th scope="col text-break" className="text-primary">
                    Remarks
                  </th>
                  {/* <th scope="col text-break" className="text-primary">
                    Edit
                  </th> */}
                  <th scope="col text-break" className="text-primary">
                    Delete
                  </th>
                </tr>
              </thead>
              {/* </div> */}
              <tbody>
                {documentView.length > 0 ? (
                  <>
                    {page === lastPageReminder ? (
                      <>
                        {documentView
                          .slice(page * 10 - 10, page * 10 - 10 + reminder)
                          .map((data) => {
                            return (
                              <tr align="center" className="fs-6">
                                <td>
                                  {" "}
                                  {new Date(data.createdAt).toLocaleString(
                                    "default"
                                  )}{" "}
                                </td>
                                <td>
                                  {data.amount && (
                                    <p
                                      className={`col fs-6 text-break ${
                                        data.transactionType.includes(
                                          "Manual-Website-Withdraw"
                                        ) ||
                                        data.transactionType.includes(
                                          "Manual-Bank-Withdraw"
                                        ) ||
                                        data.transactionType === "Withdraw"
                                          ? "text-red"
                                          : "text-black"
                                      }`}
                                    >
                                      {data.amount}
                                    </p>
                                  )}
                                  {data.depositAmount && (
                                    <p
                                      className={`col fs-6 text-break ${
                                        data.transactionType.includes(
                                          "Manual-Website-Withdraw"
                                        ) ||
                                        data.transactionType.includes(
                                          "Manual-Bank-Withdraw"
                                        ) ||
                                        data.transactionType === "Withdraw"
                                          ? "text-red"
                                          : "text-black"
                                      }`}
                                    >
                                      {data.depositAmount}
                                    </p>
                                  )}
                                  {data.withdrawAmount && (
                                    <p
                                      className={`col fs-6 text-break ${
                                        data.transactionType.includes(
                                          "Manual-Website-Withdraw"
                                        ) ||
                                        data.transactionType.includes(
                                          "Manual-Bank-Withdraw"
                                        ) ||
                                        data.transactionType === "Withdraw"
                                          ? "text-red"
                                          : "text-black"
                                      }`}
                                    >
                                      {data.withdrawAmount}
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
                                    <p
                                      className={`col fs-6 text-bold text-break ${
                                        data.transactionType.includes(
                                          "Manual-Website-Withdraw"
                                        ) ||
                                        data.transactionType.includes(
                                          "Manual-Bank-Withdraw"
                                        ) ||
                                        data.transactionType === "Withdraw"
                                          ? "text-red"
                                          : "text-black"
                                      }`}
                                    >
                                      {data.transactionType}
                                    </p>
                                  )}
                                </td>
                                <td>
                                  {data.paymentMethod && (
                                    <p className="col fs-6">
                                      {data.paymentMethod}
                                    </p>
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
                                    <p className="col fs-6">{data.userName}</p>
                                  )}
                                  {data.depositAmount && (
                                    <p className="col fs-6 text-break">N.A</p>
                                  )}
                                  {data.withdrawAmount && (
                                    <p className="col fs-6 text-break">N.A</p>
                                  )}
                                </td>
                                <td>
                                  {data.balance ? (
                                    <p className="col fs-6 text-break">
                                      {data.balance}
                                    </p>
                                  ) : (
                                    "N.A"
                                  )}
                                </td>

                                <td>{data.remarks}</td>
                                {/* <td>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edittransaction"
                                    onClick={(e) => {
                                      handleId(e, data._id);
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faEdit} />
                                  </button>
                                </td> */}
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                  >
                                    {["Deposit", "Withdraw"].includes(
                                      data.transactionType
                                    ) && (
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={(e) => {
                                          handleDelete(
                                            e,
                                            data.Transaction_Id,
                                            data.transactionType
                                          );
                                        }}
                                      />
                                    )}
                                    {[
                                      "Manual-Bank-Withdraw",
                                      "Manual-Bank-Deposit",
                                    ].includes(data.transactionType) && (
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={(e) => {
                                          handleDelete(
                                            e,
                                            data.BankTransaction_Id,
                                            data.transactionType
                                          );
                                        }}
                                      />
                                    )}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </>
                    ) : (
                      <>
                        {documentView
                          .slice(page * 10 - 10, page * 10)
                          .map((data) => {
                            return (
                              <tr align="center" className="fs-6">
                                <td>
                                  {" "}
                                  {new Date(data.createdAt).toLocaleString(
                                    "default"
                                  )}{" "}
                                </td>
                                <td>
                                  {data.amount && (
                                    <p
                                      className={`col fs-6 text-break ${
                                        data.transactionType.includes(
                                          "Manual-Website-Withdraw"
                                        ) ||
                                        data.transactionType.includes(
                                          "Manual-Bank-Withdraw"
                                        ) ||
                                        data.transactionType === "Withdraw"
                                          ? "text-red"
                                          : "text-black"
                                      }`}
                                    >
                                      {data.amount}
                                    </p>
                                  )}
                                  {data.depositAmount && (
                                    <p
                                      className={`col fs-6 text-break ${
                                        data.transactionType.includes(
                                          "Manual-Website-Withdraw"
                                        ) ||
                                        data.transactionType.includes(
                                          "Manual-Bank-Withdraw"
                                        ) ||
                                        data.transactionType === "Withdraw"
                                          ? "text-red"
                                          : "text-black"
                                      }`}
                                    >
                                      {data.depositAmount}
                                    </p>
                                  )}
                                  {data.withdrawAmount && (
                                    <p
                                      className={`col fs-6 text-break ${
                                        data.transactionType.includes(
                                          "Manual-Website-Withdraw"
                                        ) ||
                                        data.transactionType.includes(
                                          "Manual-Bank-Withdraw"
                                        ) ||
                                        data.transactionType === "Withdraw"
                                          ? "text-red"
                                          : "text-black"
                                      }`}
                                    >
                                      {data.withdrawAmount}
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
                                    <p
                                      className={`col fs-6 text-break text-bold ${
                                        data.transactionType.includes(
                                          "Manual-Website-Withdraw"
                                        ) ||
                                        data.transactionType.includes(
                                          "Manual-Bank-Withdraw"
                                        ) ||
                                        data.transactionType === "Withdraw"
                                          ? "text-red"
                                          : "text-black"
                                      }`}
                                    >
                                      {data.transactionType}
                                    </p>
                                  )}
                                </td>
                                <td>
                                  {data.paymentMethod && (
                                    <p className="col fs-6">
                                      {data.paymentMethod}
                                    </p>
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
                                    <p className="col fs-6">{data.userName}</p>
                                  )}
                                  {data.depositAmount && (
                                    <p className="col fs-6 text-break">N.A</p>
                                  )}
                                  {data.withdrawAmount && (
                                    <p className="col fs-6 text-break">N.A</p>
                                  )}
                                </td>

                                <td>
                                  {data.balance ? (
                                    <p className="col fs-6 text-break">
                                      {data.balance}
                                    </p>
                                  ) : (
                                    "N.A"
                                  )}
                                </td>

                                <td>{data.remarks}</td>
                                {/* <td>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edittransaction"
                                    onClick={(e) => {
                                      handleId(e, data._id);
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faEdit} />
                                  </button>
                                </td> */}
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                  >
                                    {["Deposit", "Withdraw"].includes(
                                      data.transactionType
                                    ) && (
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={(e) => {
                                          handleDelete(
                                            e,
                                            data.Transaction_Id,
                                            data.transactionType
                                          );
                                        }}
                                      />
                                    )}
                                    {[
                                      "Manual-Bank-Withdraw",
                                      "Manual-Bank-Deposit",
                                    ].includes(data.transactionType) && (
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={(e) => {
                                          handleDelete(
                                            e,
                                            data.BankTransaction_Id,
                                            data.transactionType
                                          );
                                        }}
                                      />
                                    )}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </>
                    )}
                  </>
                ) : (
                  <h1 className="text-center">No Transaction Found</h1>
                )}
              </tbody>
            </table>
            {documentView.length > 0 && (

              <Pagination handlePage={selectPageHandler} page={page} totalPage={lastPage} totalData={documentView.length} perPagePagination={10} />
            )}
          </div>
        ) : (
          <div>
            {/* Normal View */}
            <table class="table table-bordered  table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl">
              <thead className="table-success">
                <tr align="center" bgcolor="green" className="fs-6">
                  <th scope="col fs-6" className="text-primary">
                    Date & Time
                  </th>
                  <th scope="col text-break fs-6" className="text-primary">
                    Amount
                  </th>
                  <th scope="col text-break fs-6" className="text-primary">
                    Txn Id
                  </th>
                  <th scope="col text-break fs-6" className="text-primary">
                    Txn Type
                  </th>
                  <th scope="col fs-6" className="text-primary">
                    Gateway
                  </th>
                  <th scope="col fs-6" className="text-primary">
                    Entry by
                  </th>
                  <th scope="col fs-6" className="text-primary">
                    User Name
                  </th>

                  <th scope="col text-break fs-6" className="text-primary">
                    Balance
                  </th>

                  <th scope="col text-break" className="text-primary">
                    Remarks
                  </th>
                  {/* <th scope="col text-break" className="text-primary">
                    Edit
                  </th> */}
                  <th scope="col text-break" className="text-primary">
                    Delete
                  </th>
                </tr>
              </thead>
              {/* </div> */}
              <tbody>
                {documentFilter.length > 0 ? (
                  <>
                      {page === lastFilterPageReminder ? (
                        <>
                      {
                        lastPage === 1 ? (<>
                          {documentFilter
                            .slice(page * 10 - 10, page * 10)
                            .map((data) => {
                              return (
                                <tr align="center" className="fs-6">
                                  <td>
                                    {" "}
                                    {new Date(data.createdAt).toLocaleString(
                                      "default"
                                    )}{" "}
                                  </td>
                                  <td>
                                    {data.amount && (
                                      <p
                                        className={`col fs-6 text-break ${
                                          data.transactionType.includes(
                                            "Manual-Website-Withdraw"
                                          ) ||
                                          data.transactionType.includes(
                                            "Manual-Bank-Withdraw"
                                          ) ||
                                          data.transactionType === "Withdraw"
                                            ? "text-red"
                                            : "text-black"
                                        }`}
                                      >
                                        {data.amount}
                                      </p>
                                    )}
                                    {data.depositAmount && (
                                      <p className="col fs-6">
                                        {data.depositAmount}
                                      </p>
                                    )}
                                    {data.withdrawAmount && (
                                      <p className="col fs-6">
                                        {data.withdrawAmount}
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
                                      <p
                                        className={`col fs-6 text-break text-bold ${
                                          data.transactionType.includes(
                                            "Manual-Website-Withdraw"
                                          ) ||
                                          data.transactionType.includes(
                                            "Manual-Bank-Withdraw"
                                          ) ||
                                          data.transactionType === "Withdraw"
                                            ? "text-red"
                                            : "text-black"
                                        }`}
                                      >
                                        {data.transactionType}
                                      </p>
                                    )}
                                  </td>
                                  <td>
                                    {data.paymentMethod && (
                                      <p className="col fs-6">
                                        {data.paymentMethod}
                                      </p>
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
                                      <p className="col fs-6">
                                        {data.userName}
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
                                    {data.balance ? (
                                      <p className="col fs-6 text-break">
                                        {data.balance}
                                      </p>
                                    ) : (
                                      "N.A"
                                    )}
                                  </td>
                                  <td>{data.remarks}</td>
                                  {/* <td>
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edittransaction"
                                      onClick={(e) => {
                                        handleId(e, data._id);
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                  </td> */}
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                    >
                                      {["Deposit", "Withdraw"].includes(
                                        data.transactionType
                                      ) && (
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                          onClick={(e) => {
                                            handleDelete(
                                              e,
                                              data.Transaction_Id,
                                              data.transactionType
                                            );
                                          }}
                                        />
                                      )}
                                      {[
                                        "Manual-Bank-Withdraw",
                                        "Manual-Bank-Deposit",
                                      ].includes(data.transactionType) && (
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                          onClick={(e) => {
                                            handleDelete(
                                              e,
                                              data.BankTransaction_Id,
                                              data.transactionType
                                            );
                                          }}
                                        />
                                      )}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </>
                          ) : (
                            <>
                          {documentFilter
                            .slice(
                              page * 10 - 10,
                              page * 10 - 10 + filterReminder
                            )
                            .map((data) => {
                              return (
                                <tr align="center" className="fs-6">
                                  <td>
                                    {" "}
                                    {new Date(data.createdAt).toLocaleString(
                                      "default"
                                    )}{" "}
                                  </td>
                                  <td>
                                    {data.amount && (
                                      <p
                                        className={`col fs-6 text-break ${
                                          data.transactionType.includes(
                                            "Manual-Website-Withdraw"
                                          ) ||
                                          data.transactionType.includes(
                                            "Manual-Bank-Withdraw"
                                          ) ||
                                          data.transactionType === "Withdraw"
                                            ? "text-red"
                                            : "text-black"
                                        }`}
                                      >
                                        {data.amount}
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
                                      <p
                                        className={`col fs-6 text-break text-bold ${
                                          data.transactionType.includes(
                                            "Manual-Website-Withdraw"
                                          ) ||
                                          data.transactionType.includes(
                                            "Manual-Bank-Withdraw"
                                          ) ||
                                          data.transactionType === "Withdraw"
                                            ? "text-red"
                                            : "text-black"
                                        }`}
                                      >
                                        {data.transactionType}
                                      </p>
                                    )}
                                  </td>
                                  <td>
                                    {data.paymentMethod && (
                                      <p className="col fs-6">
                                        {data.paymentMethod}
                                      </p>
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
                                      <p className="col fs-6">
                                        {data.userName}
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
                                    {data.balance ? (
                                      <p className="col fs-6 text-break">
                                        {data.balance}
                                      </p>
                                    ) : (
                                      "N.A"
                                    )}
                                  </td>

                                  <td>{data.remarks}</td>
                                  {/* <td>
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edittransaction"
                                      onClick={(e) => {
                                        handleId(e, data._id);
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                  </td> */}
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                    >
                                      {["Deposit", "Withdraw"].includes(
                                        data.transactionType
                                      ) && (
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                          onClick={(e) => {
                                            handleDelete(
                                              e,
                                              data.Transaction_Id,
                                              data.transactionType
                                            );
                                          }}
                                        />
                                      )}
                                      {[
                                        "Manual-Bank-Withdraw",
                                        "Manual-Bank-Deposit",
                                      ].includes(data.transactionType) && (
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                          onClick={(e) => {
                                            handleDelete(
                                              e,
                                              data.BankTransaction_Id,
                                              data.transactionType
                                            );
                                          }}
                                        />
                                      )}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                              </>
                            )
                      }
                    </>
                    ) : (
                      <>
                        {documentFilter
                          .slice(page * 10 - 10, page * 10)
                          .map((data) => {
                            return (
                              <tr align="center" className="fs-6">
                                <td>
                                  {" "}
                                  {new Date(data.createdAt).toLocaleString(
                                    "default"
                                  )}{" "}
                                </td>
                                <td>
                                  {data.amount && (
                                    <p className={`col fs-6 text-break ${data.transactionType.includes(
                                      "Manual-Website-Withdraw"
                                    ) ||
                                      data.transactionType.includes("Manual-Bank-Withdraw") ||
                                      data.transactionType === "Withdraw"
                                      ? "text-red"
                                      : "text-black"
                                      }`}>{data.amount}</p>
                                  )}
                                  {data.depositAmount && (
                                    <p className="col fs-6">
                                      {data.depositAmount}
                                    </p>
                                  )}
                                  {data.withdrawAmount && (
                                    <p className="col fs-6">
                                      {data.withdrawAmount}
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
                                    <p className={`col fs-6 text-break text-bold ${data.transactionType.includes(
                                      "Manual-Website-Withdraw"
                                    ) ||
                                      data.transactionType.includes(
                                        "Manual-Bank-Withdraw"
                                      ) ||
                                      data.transactionType === "Withdraw"
                                      ? "text-red"
                                      : "text-black"
                                      }`}>
                                      {data.transactionType}
                                    </p>
                                  )}
                                </td>
                                <td>
                                  {data.paymentMethod && (
                                    <p className="col fs-6">
                                      {data.paymentMethod}
                                    </p>
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
                                    <p className="col fs-6">{data.userName}</p>
                                  )}
                                  {data.depositAmount && (
                                    <p className="col fs-6 text-break">N.A</p>
                                  )}
                                  {data.withdrawAmount && (
                                    <p className="col fs-6 text-break">N.A</p>
                                  )}
                                </td>
                                <td>
                                  {data.balance ? (
                                    <p className="col fs-6 text-break">
                                      {data.balance}
                                    </p>
                                  ) : (
                                    "N.A"
                                  )}
                                </td>
                                <td>{data.remarks}</td>
                                {/* <td>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edittransaction"
                                    onClick={(e) => {
                                      handleId(e, data._id);
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faEdit} />
                                  </button>
                                </td> */}
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                  >
                                     {["Deposit", "Withdraw"].includes(
                                      data.transactionType
                                    ) && (
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={(e) => {
                                          handleDelete(
                                            e,
                                            data.Transaction_Id,
                                            data.transactionType
                                          );
                                        }}
                                      />
                                    )}
                                    {[
                                      "Manual-Bank-Withdraw",
                                      "Manual-Bank-Deposit",
                                    ].includes(data.transactionType) && (
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={(e) => {
                                          handleDelete(
                                            e,
                                            data.BankTransaction_Id,
                                            data.transactionType
                                          );
                                        }}
                                      />
                                    )}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </>
                    )}
                  </>
                ) : (
                  <h1 className="text-center">No Transaction Found</h1>
                )}
              </tbody>
            </table>
            {documentFilter.length > 0 && (
              //   (
              // <div className="d-flex justify-content-center">
              //   <button
              //     onClick={() => selectPageHandler(page - 1)}
              //     className={`${
              //       page > 1 ? "" : "pagination__disable"
              //     } btn btn-primary`}
              //   >
              //     Prev
              //   </button>
              //   <span className="mx-3">{page}</span>
              //   <button
              //     onClick={() => selectPageHandler(page + 1)}
              //     className={`${
              //       page === filterLastPage ? "" : "pagination__disable"
              //     } btn btn-primary`}
              //   >
              //     Next
              //   </button>
              // </div>
              //   )
              <Pagination handlePage={selectPageHandler} page={page} totalPage={filterLastPage} totalData={documentFilter.length} perPagePagination={10} />

            )}
          </div>
        )}
      </div>
      {/* <EditTransaction id={dataId} /> */}
    </>
  );
};

export default BankStatement;
