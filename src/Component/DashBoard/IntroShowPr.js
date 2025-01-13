import React, { useState, useEffect } from "react";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import { useParams } from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import { FaFilter } from "react-icons/fa";
import { CSVLink } from "react-csv";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { useLocation } from "react-router-dom";
import TransactionSercvice from "../../Services/TransactionSercvice";
import Pagination from "../Pagination";
import NewPagination from "../NewPagination";

const IntroShowPr = () => {
  const { id } = useParams();

  // const flag = transactionDetails;
  const [startDatevalue, SetStartDatesetValue] = useState(
    moment().subtract(1, "days").toDate()
  );
  const [endDatevalue, setEndDateValue] = useState(new Date());
  const [documentView, setDocumentView] = useState([]);
  const [subAdminlist, setSubAdminlist] = useState([]);
  const [subAdmin, setSubAdmin] = useState("");
  const [bankList, setBankList] = useState([]);
  const [bank, setBank] = useState("");
  const [websiteList, setWebsiteList] = useState([]);
  const [website, setWebsite] = useState("");
  const [select, setSelect] = useState("");
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const pageLimit = 10;

  const auth = useAuth();

  const handleFilter = () => {
    AccountService.getUserTransaction(
      auth.user,
      id,
      page,
      pageLimit,
      select,
      subAdmin,
      bank,
      website,
      moment(startDatevalue).toISOString(),
      moment(endDatevalue).toISOString()
    ).then((res) => {
      setDocumentView(res.data?.data);
      setTotalData(res?.data?.pagination?.totalItems);
      setTotalPage(res?.data?.pagination?.totalPages);
    });
  };

  useEffect(() => {
    handleFilter();
  }, []);

  useEffect(() => {
    if (page > 1) {
      handleFilter();
    }
  }, [page]);

  useEffect(() => {
    if (auth.user) {
      TransactionSercvice.subAdminList(auth.user).then((res) => {
        setSubAdminlist(res.data.data);
      });
    }
  }, [auth]);

  useEffect(() => {
    if (auth.user) {
      TransactionSercvice.bankList(auth.user).then((res) => {
        setBankList(res.data.data);
      });
    }
  }, [auth]);

  useEffect(() => {
    AccountService.website(auth.user).then((res) =>
      setWebsiteList(res.data.data)
    );
  }, [auth]);

  const selectPageHandler = (selectedPage) => {
    console.log(selectedPage);
    setPage(selectedPage);
  };

  const startIndex = Math.min((page - 1) * pageLimit + 1);
  const endIndex = Math.min(page * pageLimit, totalData);
  console.log("first", startIndex, endIndex);

  const handleReset = () => {
    setSelect("");
    setSubAdmin("");
    setBank("");
    setWebsite("");
    SetStartDatesetValue(moment().subtract(1, "days").toDate());
    setEndDateValue(new Date());
  };

  const handleStartDatevalue = (e) => {
    SetStartDatesetValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  const handleEndDatevalue = (e) => {
    setEndDateValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);
  };

  const handleSubAdmin = (e) => {
    const value = e.target.value;
    setSubAdmin(value);
  };

  const handleBank = (e) => {
    const value = e.target.value;
    setBank(value);
  };

  const handleWebsite = (e) => {
    const value = e.target.value;
    setWebsite(value);
  };

  return (
    <div className="container-fuid">
      <div className="container mt-5">
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
                <option className="d-flex" value="">
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

            <div className="d-flex col pt-3 justify-content-center">
              <h6 className="fw-bold text-nowrap pt-2"> BankNameList</h6>
              <select
                className="form-control mx-3 w-50"
                value={bank || ""}
                autoComplete="off"
                onChange={handleBank}
                style={{
                  // boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
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

            <div className="d-flex col pt-3 justify-content-center">
              <h6 className="fw-bold text-nowrap pt-2"> WebsitesList</h6>
              <select
                className="form-control mx-3 w-50"
                value={website || ""}
                autoComplete="off"
                onChange={handleWebsite}
                style={{
                  // boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
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
              <div className="d-flex col justify-content-between">
                <div className="mx-2">
                  <button
                    type="button"
                    className="btn btn-dark mx-2"
                    onClick={handleFilter}
                    style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
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
                <div className="mx-2">
                  <CSVLink data={documentView} className="btn btn-success">
                    Download Data
                  </CSVLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <small>
          {/* Normal View */}
          <table class="table table-bordered  table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl w-auto">
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
                <th scope="col" className="text-primary">
                  Bank
                </th>
                <th scope="col" className="text-primary">
                  Website
                </th>
                <th scope="col text-break" className="text-primary">
                  Remarks
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
                        {data?.transactionType === "Withdraw" ? (
                          <p className="col fs-6 text-danger">
                            ₹&nbsp;{data?.amount}
                          </p>
                        ) : (
                          <p className="col fs-6">₹&nbsp;{data?.amount}</p>
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
                        {data.transactionType === "Withdraw" ? (
                          <p className="col fs-6 text-break text-danger">
                            {data.transactionType}
                          </p>
                        ) : (
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
                      <td>{data.subAdminId}</td>
                      <td>
                        <p className="col fs-6">
                          {data.bankName ? data.bankName : "N.A"}
                        </p>
                      </td>
                      <td>
                        <p className="col fs-6">
                          {data.websiteName ? data.websiteName : "N.A"}
                        </p>
                      </td>
                      <td>{data.remarks}</td>
                    </tr>
                  );
                })
              ) : (
                <h1 className="text-center">No Transaction Found</h1>
              )}
            </tbody>
          </table>
        </small>
        {documentView.length > 0 && (
          <NewPagination
            currentPage={page}
            totalPages={totalPage}
            handlePageChange={selectPageHandler}
            startIndex={startIndex}
            endIndex={endIndex}
            totalData={totalData}
          />
        )}
      </div>
    </div>
  );
};

export default IntroShowPr;
