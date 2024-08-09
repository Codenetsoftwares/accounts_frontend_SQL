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
import { errorHandler } from "../../Utils/helper";

const MyTxn = () => {
  const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();

  const [accountData, setAccountData] = useState([]);
  const [documentView, setDocumentView] = useState([]);
  const [documentFilter, setDocumentFilter] = useState([]);
  const [Manualstmnt, SetManualstmnt] = useState([]);
  const [Userstmnt, SetUserstmnt] = useState([]);
  const [select, setSelect] = useState("");
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
  const [totalData, setTotalData] = useState("");


  const data = {
    "filters": {
      transactionType: select,
      // sdate: moment(startDatevalue).toDate(),
      // edate: moment(endDatevalue).toDate(),
      // maxAmount: maxAmount,
      // minAmount: minAmount
    }
  }


  useEffect(() => {
    TransactionSercvice.subadminWiseTxn(auth.user.userName, auth.user, data, page).then(
      (res) => {
        console.log("res=>>>>", res.data);

        const filteredData = [];

        res.data.data.forEach((item) => {
          if (item !== null) {
            filteredData.push(item);
          }
        });

        setDocumentView(res.data.data);
        setAccountData(res.data.data);
        setPage(res.data.pagination.page);
        setTotalPage(res.data.pagination.totalPages);
        setTotalData(res.data.pagination.totalItems);
      }
    ).catch((err) => {
      errorHandler(err.message, "Something went wrong");
    });
  }, [auth, select, page]);

  console.log("txn=>>>", documentView);

  const selectPageHandler = (selectedPage) => {
    console.log(selectedPage);

    setPage(selectedPage);
  };
  // useEffect(() => {
  //   handleFilter();
  // }, [documentView]);

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


  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);
    // handleClick("transactionType", value);
    setPage(1);
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
      { requestId: id, type:transactionType },
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


  return (
    <>
      <div className="card card-body rounded-8px mt-2">
        {/* This is for Normal View */}
        <div
          className="card card-body rounded-8px shadow"
          style={{
            backgroundColor: "#e6f7ff",
            maxWidth: "1500px",
            margin: "auto",
          }}
        >
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            <div className="col d-flex flex-column align-items-center pt-3">
              <h6 className="fw-bold text-nowrap">Transaction</h6>
              <select
                className="form-control w-100"
                value={select || ""}
                autoComplete="off"
                onChange={handleChange}
                style={{
                  border: "0.5px solid #ced4da",
                  borderRadius: "6px",
                }}
              >
                <option value="All">
                  <b>All</b>
                </option>
                <option value="Deposit">
                  <b>Deposit</b>
                </option>
                <option value="Withdraw">
                  <b>Withdraw</b>
                </option>
                <option value="Manual-Bank-Deposit">
                  <b>Manual Bank Deposit</b>
                </option>
                <option value="Manual-Bank-Withdraw">
                  <b>Manual Bank Withdraw</b>
                </option>
                <option value="Manual-Website-Deposit">
                  <b>Manual Website Deposit</b>
                </option>
                <option value="Manual-Website-Withdraw">
                  <b>Manual Website Withdraw</b>
                </option>
              </select>
            </div>

            <div className="col d-flex flex-column align-items-center pt-3">
              <h6 className="fw-bold text-nowrap">Range Of Amount</h6>
              <div className="d-flex flex-column flex-md-row align-items-center w-100">
                <input
                  className="form-control mb-2 mb-md-0 mx-0 mx-md-2"
                  type="number"
                  value={minAmount || ""}
                  autoComplete="off"
                  onChange={handleMinAmount}
                  placeholder="Min Amt"
                  style={{
                    border: "0.5px solid #ced4da",
                    borderRadius: "6px",
                  }}
                  required
                  min={1}
                />
                <h6 className="fw-bold mx-2">To</h6>
                <input
                  className="form-control mx-0 mx-md-2"
                  type="number"
                  value={maxAmount || ""}
                  autoComplete="off"
                  onChange={handleMaxAmount}
                  placeholder="Max Amt"
                  style={{
                    border: "0.5px solid #ced4da",
                    borderRadius: "6px",
                  }}
                  min={1}
                  required
                />
              </div>
            </div>

            <div className="col d-flex flex-column align-items-center pt-3">
              <div className="d-flex flex-column flex-md-row align-items-center w-100">
                <div className="d-flex flex-column mx-0 mx-md-2 w-100">
                  <h6 className="fw-bold text-nowrap">Start Date</h6>
                  <Datetime
                    value={startDatevalue}
                    onChange={handleStartDatevalue}
                    dateFormat="DD-MM-YYYY"
                    timeFormat="HH:mm"
                    className="w-100"
                  />
                </div>
                <div className="d-flex flex-column mx-0 mx-md-2 w-100">
                  <h6 className="fw-bold text-nowrap">End Date</h6>
                  <Datetime
                    value={endDatevalue}
                    onChange={handleEndDatevalue}
                    dateFormat="DD-MM-YYYY"
                    timeFormat="HH:mm"
                    className="w-100"
                  />
                </div>
              </div>
            </div>

            <div className="col-12 d-flex justify-content-center pt-3">
              <div className="d-flex flex-wrap justify-content-center w-100">
                <button
                  type="button"
                  className="btn btn-dark mx-2"
                  onClick={handleFilter}
                >
                  Filter
                </button>
                <button
                  type="button"
                  className="btn btn-dark mx-2"
                  onClick={handleReset}
                >
                  Reset
                </button>
                {toggle ? (
                  <CSVLink data={documentView} className="btn btn-success mx-2">
                    Download Data
                  </CSVLink>
                ) : (
                  <CSVLink
                    data={documentFilter}
                    className="btn btn-success mx-2"
                  >
                    Download Filter Data
                  </CSVLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
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
                    Remarks
                  </th>

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

                        <td>{data?.remarks}</td>

                        <td>
                          <button type="button" className="btn btn-danger">
                            {data?.Transaction_Id && <FontAwesomeIcon
                              icon={faTrash}
                              onClick={(e) => {
                                handleDelete(
                                  e,
                                  data?.Transaction_Id,
                                  data?.type
                                );
                              }}
                            />}
                            {data?.bankTransactionId && <FontAwesomeIcon
                              icon={faTrash}
                              onClick={(e) => {
                                handleDelete(
                                  e,
                                  data?.bankTransactionId,
                                  data?.type
                                );
                              }}
                            />}
                            {data?.websiteTransactionId && <FontAwesomeIcon
                              icon={faTrash}
                              onClick={(e) => {
                                handleDelete(
                                  e,
                                  data?.websiteTransactionId,
                                  data?.type
                                );
                              }}
                            />}
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
        {documentView?.length > 0 ? (
          <Pagination
            handlePage={selectPageHandler}
            page={page}
            totalPage={totalPage}
            totalData={totalData}
            perPagePagination={10}
          />
        ) : null}

      </SingleCard>
    </>
  );
};

export default MyTxn;
