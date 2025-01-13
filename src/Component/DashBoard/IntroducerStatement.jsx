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
import TransactionSercvice from "../../Services/TransactionSercvice";
import EditIntroducerTransaction from "../Modal/EditIntroducerTransaction";
import NewPagination from "../NewPagination";
import { formatDate } from "../../Utils/helper";

const IntroducerStatement = () => {
  const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState([]);
  const [documentView, setDocumentView] = useState([]);
  const [select, setSelect] = useState("");
  const [startDatevalue, SetStartDatesetValue] = useState(
    new Date() - 1 * 24 * 60 * 60 * 1000
  );
  const [endDatevalue, setEndDateValue] = useState(new Date());
  const [dataId, setDataId] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const pageLimit = 10;

  const handleFilter = () => {
    TransactionSercvice.IntroducerStatement(
      id,
      page,
      pageLimit,
      select,
      formatDate(moment(startDatevalue).toDate()),
      formatDate(moment(endDatevalue).toDate()),
      auth.user
    )
      .then((res) => {
        setDocumentView(res.data?.data);
        setTotalData(res?.data?.pagination?.totalItems);
        setTotalPage(res?.data?.pagination?.totalPages);
      })
      .catch((err) => {
        console.error(err, "object");
      });
  };

  const startIndex = Math.min((page - 1) * pageLimit + 1);
  const endIndex = Math.min(page * pageLimit, totalData);

  const selectPageHandler = (selectedPage) => {
    console.log(selectedPage);
    setPage(selectedPage);
  };

  const handleDelete = (e, id, transactionType) => {
    console.log(transactionType);
    switch (transactionType) {
      case "Deposit":
        AccountService.DeleteIntroducerTransaction({ requestId: id }, auth.user)

          .then((res) => {
            console.log(res.data.data);

            toast.success("Transaction delete request sent to Super Admin");
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
        break;
      case "Withdraw":
        AccountService.DeleteIntroducerTransaction({ requestId: id }, auth.user)
          .then((res) => {
            console.log(res.data.data);
            toast.success("Transaction delete request sent to Super Admin");
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
        break;

      default:
      // code block
    }
  };

  useEffect(() => {
    handleFilter();
  }, []);

  useEffect(() => {
    if (page > 1) {
      handleFilter();
    }
  }, [page]);

  const handleReset = () => {
    setSelect("");
    SetStartDatesetValue(moment().subtract(1, "days").toDate());
    setEndDateValue(new Date());
  };

  const handleStartDatevalue = (e) => {
    SetStartDatesetValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  const handleEndDatevalue = (e) => {
    setEndDateValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

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
                onChange={(e) => setSelect(e.target.value)}
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
          <table class="table table-bordered  table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl">
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
                  Date & Time
                </th>
                <th scope="col  fs-6" className="text-primary">
                  Amount
                </th>
                <th scope="col  fs-6" className="text-primary">
                  Txn Type
                </th>
                <th scope="col  fs-6" className="text-primary">
                  Balance
                </th>

                <th scope="col " className="text-primary">
                  Remarks
                </th>
                {/* <th scope="col " className="text-primary">
                    Edit
                  </th> */}
                <th scope="col " className="text-primary">
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
                      <td>
                        <p
                          className={`col fs-6  ${
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
                          {data.amount && (
                            <p className="col fs-6 font-weight-bold">
                              {data.amount}
                            </p>
                          )}
                          {data.depositAmount && (
                            <p className="col fs-6 font-weight-bold">
                              {data.depositAmount}
                            </p>
                          )}
                          {data.withdrawAmount && (
                            <p className="col fs-6 font-weight-bold">
                              {data.withdrawAmount}
                            </p>
                          )}
                        </p>
                      </td>
                      <td>
                        {data?.transactionType && (
                          <p
                            className={`col fs-6 text-break ${
                              [
                                "Manual-Website-Deposit",
                                "Manual-Bank-Deposit",
                                "Deposit",
                              ].includes(data.transactionType)
                                ? "text-success" // Green for deposits
                                : [
                                    "Manual-Website-Withdraw",
                                    "Manual-Bank-Withdraw",
                                    "Withdraw",
                                  ].includes(data.transactionType)
                                ? "text-danger" // Red for withdrawals
                                : ""
                            }`}
                          >
                            {data?.transactionType}
                          </p>
                        )}
                      </td>
                      <td>
                        {data.balance ? (
                          <p className="col fs-6 ">{data.balance}</p>
                        ) : (
                          "N.A"
                        )}
                      </td>
                      <td>{data.remarks}</td>

                      <td>
                        <button type="button" className="btn btn-danger">
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={(e) => {
                              handleDelete(
                                e,
                                data.introTransactionId,
                                data.transactionType
                              );
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
    </>
  );
};

export default IntroducerStatement;
