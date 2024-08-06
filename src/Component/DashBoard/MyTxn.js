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
import SingleCard from "../../common/singleCard";

const MyTxn = () => {
  const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();

  const [accountData, setAccountData] = useState([]);
  const [documentView, setDocumentView] = useState([]);
  const [documentFilter, setDocumentFilter] = useState([]);
  const [Manualstmnt, SetManualstmnt] = useState([]);
  const [Userstmnt, SetUserstmnt] = useState([]);
  const [select, setSelect] = useState("All");
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

  // console.log("==>>>", id);
  console.log(documentView);
  console.log("data===>", documentView);
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
    // setTotalPage(Math.ceil(documentView.length / 10));
    // setLength(documentView.length);
  };

  const handleId = (e, id) => {
    e.preventDefault();
    setDataId(id);
  };

  useEffect(() => {
    TransactionSercvice.subadminWiseTxn(auth.user.userName, auth.user).then(
      (res) => {
        console.log("res=>>>>", res.data);

        const filteredData = [];

        res.data.data.forEach((item) => {
          if (item !== null) {
            filteredData.push(item);
          }
        });

        setDocumentView(filteredData);
        setAccountData(filteredData);
        setLength(filteredData.length);
        setTotalPage(Math.ceil(res.data.length) / 10);
      }
    );
  }, [auth]);

  console.log("txn=>>>", documentView);

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

  // useEffect(() => {
  //   AccountService.website(auth.user).then((res) => setWebsiteList(res.data));
  // }, [auth]);

  useEffect(() => {
    AccountService.introducerId(auth.user).then((res) =>
      setIntroducerList(res.data)
    );
  }, [auth]);

  const selectPageHandler = (selectedPage) => {
    console.log(selectedPage);

    setPage(selectedPage);
  };
  useEffect(() => {
    handleFilter();
  }, [documentView]);

  const handleFilter = () => {
    const sdate = moment(startDatevalue, "DD-MM-YYYY HH:mm").toDate();
    const edate = moment(endDatevalue, "DD-MM-YYYY HH:mm").toDate();
    let filteredDocuments = documentView.filter((data) => {
      const transactionDate = new Date(data.createdAt);
      return transactionDate >= sdate && transactionDate <= edate;
    });

    if (minAmount !== 0 || maxAmount !== 0) {
      filteredDocuments = filteredDocuments.filter((transaction) => {
        return (
          (transaction.withdrawAmount >= minAmount &&
            transaction.withdrawAmount <= maxAmount) ||
          (transaction.depositAmount >= minAmount &&
            transaction.depositAmount <= maxAmount) ||
          (transaction.amount >= minAmount && transaction.amount <= maxAmount)
        );
      });
    }
    setDocumentFilter(filteredDocuments);
    setToggle(false);
    setPage(1);
  };

  // console.log("documentView =>>>", documentView);
  // console.log("accountData =>>>", accountData);

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
    TransactionSercvice.MoveTrashIntroducerTransaction(
      { requestId: id },
      auth.user
    )
      .then((res) => {
        console.log(res.data);
        toast.success("Bank Transaction deleted");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
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
    window.location.reload();
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
  console.log(lastPage);
  console.log(page);
  console.log(documentView);
  return (
    <>
      <SingleCard className="card card-body rounded-8px mt-1">
        <SingleCard
          className="card card-body rounded-8px shadow"
          style={{
            backgroundColor: "#e6f7ff",
            maxWidth: "1500px",
            margin: "auto",
          }}
        >
          <div className="row g-3">
            <div className="col-md-4 col-lg-3">
              <h6 className="fw-bold text-nowrap">Transaction</h6>
              <select
                className="form-control"
                value={select || ""}
                autoComplete="off"
                onChange={handleChange}
                style={{ border: "0.5px solid black", borderRadius: "6px" }}
              >
                <option value="">All</option>
                <option value="Deposit">Deposit</option>
                <option value="Withdraw">Withdraw</option>
                <option value="Manual-Bank-Deposit">Manual Bank Deposit</option>
                <option value="Manual-Bank-Withdraw">Manual Bank Withdraw</option>
                <option value="Manual-Website-Deposit">
                  Manual Website Deposit
                </option>
                <option value="Manual-Website-Withdraw">
                  Manual Website Withdraw
                </option>
              </select>
            </div>
            <div className="col-md-4 col-lg-3">
              <h6 className="fw-bold text-nowrap">Date Range</h6>
              <div className="d-flex">
                <Datetime
                  value={startDatevalue}
                  onChange={handleStartDatevalue}
                  dateFormat="DD-MM-YYYY"
                  timeFormat="HH:mm"
                />
                <h6 className="fw-bold text-nowrap">To</h6>
                <Datetime
                  value={endDatevalue}
                  onChange={handleEndDatevalue}
                  dateFormat="DD-MM-YYYY"
                  timeFormat="HH:mm"
                />
              </div>
            </div>
            <div className="col-md-4 col-lg-3">
              <div className="d-flex justify-content-between gap-2">
                <button
                  className="btn btn-dark"
                  onClick={handleFilter}
                  style={{ borderRadius: "6px" }}
                >
                  Filter
                </button>
                <button
                  className="btn btn-dark"
                  onClick={handleReset}
                  style={{ borderRadius: "6px" }}
                >
                  Reset
                </button>

                {documentView !== undefined && (
                  <CSVLink data={documentView} className="btn btn-success">
                    Download Data
                  </CSVLink>
                )}
              </div>
            </div>
            {/* <div className="col-12 mt-3">
             
            </div> */}
          </div>
        </SingleCard>
      </SingleCard>
      <SingleCard className="card card-body rounded-8px">
        <SingleCard className="container-fluid w-90">
          <div
            className="table-responsive"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <table className="table table-striped table-bordered table-hover">
              <thead
                className="table-success"
                style={{ position: "sticky", top: 0, zIndex: 1 }}
              >
                <tr align="center" bgcolor="green" className="fs-6">
                  <th
                    scope="col"
                    className="text-info"
                    style={{ backgroundColor: "#e6f7ff" }}
                  >
                    Date & Time
                  </th>
                  <th
                    scope="col"
                    className="text-info"
                    style={{ backgroundColor: "#e6f7ff" }}
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="text-info"
                    style={{ backgroundColor: "#e6f7ff" }}
                  >
                    Bonus
                  </th>{" "}
                  <th
                    scope="col"
                    className="text-info"
                    style={{ backgroundColor: "#e6f7ff" }}
                  >
                    Bank Charges
                  </th>
                  <th
                    scope="col"
                    className="text-info"
                    style={{ backgroundColor: "#e6f7ff" }}
                  >
                    Txn Id
                  </th>
                  <th
                    scope="col"
                    className="text-info"
                    style={{ backgroundColor: "#e6f7ff" }}
                  >
                    Txn Type
                  </th>
                  <th
                    scope="col"
                    className="text-info"
                    style={{ backgroundColor: "#e6f7ff" }}
                  >
                    Gateway
                  </th>
                  <th
                    scope="col"
                    className="text-info"
                    style={{ backgroundColor: "#e6f7ff" }}
                  >
                    Entry by
                  </th>
                  <th
                    scope="col"
                    className="text-info"
                    style={{ backgroundColor: "#e6f7ff" }}
                  >
                    User Name
                  </th>
                  {/* {purpose === "mainStatement" && (
                    <>
                      <th
                        scope="col"
                        className="text-info"
                        style={{ backgroundColor: "#e6f7ff" }}
                      >
                        Intro Name
                      </th>
                      <th
                        scope="col"
                        className="text-info"
                        style={{ backgroundColor: "#e6f7ff" }}
                      >
                        Bank
                      </th>
                      <th
                        scope="col"
                        className="text-info"
                        style={{ backgroundColor: "#e6f7ff" }}
                      >
                        Website
                      </th>
                    </>
                  )}
                  {purpose === "bankStatement" && (
                    <th
                      scope="col"
                      className="text-info"
                      style={{ backgroundColor: "#e6f7ff" }}
                    >
                      Balance
                    </th>
                  )}
                  {purpose === "websiteStatement" && (
                    <th
                      scope="col"
                      className="text-info"
                      style={{ backgroundColor: "#e6f7ff" }}
                    >
                      Balance
                    </th>
                  )} */}
                  <th
                    scope="col"
                    className="text-info"
                    style={{ backgroundColor: "#e6f7ff" }}
                  >
                    Remarks
                  </th>
                  {/* <th scope="col text-break" className="text-primary">
                            Edit
                        </th> */}
                  <th
                    scope="col"
                    className="text-info"
                    style={{ backgroundColor: "#e6f7ff" }}
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              {/* </div> */}
              <tbody>
                {documentView?.length > 0 ? (
                  documentView?.map((data, i) => {
                    return (
                      <tr align="center" className="fs-6">
                        <td>
                          {" "}
                          {new Date(data?.createdAt).toLocaleString(
                            "default"
                          )}{" "}
                        </td>
                        <td>
                          {data?.amount && (
                            <p className="col fs-6">{data?.amount}</p>
                          )}
                          {data?.depositAmount && (
                            <p className="col fs-6">{data?.depositAmount}</p>
                          )}
                          {data?.withdrawAmount && (
                            <p className="col fs-6">{data?.withdrawAmount}</p>
                          )}
                        </td>
                        <td>
                          {data?.bonus ? (
                            <p className="col fs-6">{data?.bonus}</p>
                          ) : (
                            <p className="col fs-6">N.A</p>
                          )}
                        </td>
                        <td>
                          {data?.bankCharges ? (
                            <p className="col fs-6">{data?.bankCharges}</p>
                          ) : (
                            <p className="col fs-6">N.A</p>
                          )}
                        </td>
                        <td>
                          {data?.transactionID && (
                            <p className="col fs-6 ">{data?.transactionID}</p>
                          )}
                          {data?.depositAmount && (
                            <p className="col fs-6 ">N.A</p>
                          )}
                          {data?.withdrawAmount && (
                            <p className="col fs-6 ">N.A</p>
                          )}
                        </td>
                        <td>
                          {data?.transactionType && (
                            <p className="col fs-6 text-break">
                              {data?.transactionType}
                            </p>
                          )}
                        </td>
                        <td>
                          {data?.paymentMethod && (
                            <p className="col fs-6">{data?.paymentMethod}</p>
                          )}
                          {data?.depositAmount && (
                            <p className="col fs-6 text-break">N.A</p>
                          )}
                          {data?.withdrawAmount && (
                            <p className="col fs-6 text-break">N.A</p>
                          )}
                        </td>
                        <td>{data?.subAdminName}</td>
                        <td>
                          {data?.paymentMethod && (
                            <p className="col fs-6">{data?.userName}</p>
                          )}
                          {data?.depositAmount && (
                            <p className="col fs-6 text-break">N.A</p>
                          )}
                          {data?.withdrawAmount && (
                            <p className="col fs-6 text-break">N.A</p>
                          )}
                        </td>

                        {/* when props pass mainStatement from parent component*/}
                        {/* {purpose === "mainStatement" && (
                          <>
                            <td>
                              {data?.paymentMethod && (
                                <p className="col fs-6">
                                  {data?.introducerUserName}
                                </p>
                              )}
                              {data?.depositAmount && (
                                <p className="col fs-6 text-break">N.A</p>
                              )}
                              {data?.withdrawAmount && (
                                <p className="col fs-6 text-break">N.A</p>
                              )}
                            </td>
                            <td>
                              <p className="col fs-6">
                                {data?.bankName ? data?.bankName : "N.A"}
                              </p>
                            </td>
                            <td>
                              <p className="col fs-6">
                                {data?.websiteName ? data?.websiteName : "N.A"}
                              </p>
                            </td>
                          </>
                        )} */}
                        {/* when props pass mainStatement from parent component*/}
                        {/* {purpose === "bankStatement" && (
                          <td>{data.balance ? data.balance : "N .A"}</td>
                        )} */}
                        {/* {purpose === "websiteStatement" && (
                          <td>{data.balance ? data.balance : "N .A"}</td>
                        )} */}
                        <td>{data?.remarks}</td>
                        {/* <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#edittransaction"
                                            onClick={(e) => {
                                                console.log("id===>", data?._id);
                                                handleId(e, data?._id);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                    </td> */}
                        <td>
                          <button type="button" className="btn btn-danger">
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={(e) => {
                                handleDelete(e, data?._id, data?.transactionType);
                              }}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="14" className="text-center fs-4">
                      No Transaction Found!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </SingleCard>
        {/* {documentView?.length > 0 ? (
          <Pagination
            handlePage={handlePage}
            page={page}
            totalPage={totalPage}
            totalData={totalData}
            perPagePagination={10}
          />
        ) : null} */}

      </SingleCard>

      {/* <EditTransaction id={dataId} /> */}
    </>
  );
};

export default MyTxn;
