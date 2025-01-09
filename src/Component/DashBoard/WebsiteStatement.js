import React, { useState, useEffect, useCallback } from "react";
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
import Pagination from "../Pagination";
import SingleCard from "../../common/singleCard";
import { debounce } from "lodash";
import { customErrorHandler, errorHandler } from "../../Utils/helper";
import NewPagination from "../NewPagination";

const WebsiteStatement = () => {
  const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState([]);
  const [documentView, setDocumentView] = useState([]);
  const [documentFilter, setDocumentFilter] = useState([]);
  const [select, setSelect] = useState("");
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 1);

  const [startDatevalue, SetStartDateValue] = useState(defaultStartDate);
  const [endDatevalue, setEndDateValue] = useState(new Date());
  const [toggle, setToggle] = useState(true);
  const [subAdminlist, setSubAdminlist] = useState([]);
  const [subAdmin, setSubAdmin] = useState("");
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState("");
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState("");
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [filteredSubAdminOptions, setFilteredSubAdminOptions] = useState([]);
  const [isSubAdminDropdownVisible, setIsSubAdminDropdownVisible] = useState(false);
  const [activeSubAdminIndex, setActiveSubAdminIndex] = useState(-1);
  const pageLimit = 10

  const [data, setData] = useState({
    filters: {
      transactionType: select,
      subAdminName: subAdmin,
      startDate: moment(startDatevalue).toISOString(),
      endDate: moment(endDatevalue).toISOString(),
      maxAmount: maxAmount === 0 ? 5000 : maxAmount,
      minAmount: minAmount
    }
  });


  const handleDataChange = () => {
    setPage(1)
    setData({
      filters: {
        transactionType: select,
        subAdminName: subAdmin,
        startDate: moment(startDatevalue).toISOString(),
        endDate: moment(endDatevalue).toISOString(),
        maxAmount: maxAmount === 0 ? 5000 : maxAmount,
        minAmount: minAmount
      }
    });
  };

  const handleFilter = () => {

    AccountService.GetWebsiteStateMent(auth.user, id, data, page, pageLimit)
      .then(
        (res) => (
          setDocumentView(res.data.data),
          setPage(res.data.pagination.page),
          setTotalPage(res.data.pagination.totalPages),
          setTotalData(res.data.pagination.totalItems)
        )
      )
      .catch((err) => {
        errorHandler(err.message, "Something went wrong");
      });
  }

  useEffect(() => {
    handleFilter();
  }, []);

  useEffect(() => {
    if (data) {
      handleFilter();
    }
  }, [data]);

  useEffect(() => {
    if (page > 1) {
      handleFilter();
    }
  }, [
    page
  ]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);

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

  const selectPageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  const handleStartDatevalue = (e) => {
    // Store the Date object
    SetStartDateValue(e);
  };

  const handleEndDatevalue = (e) => {
    // Store the Date object
    setEndDateValue(e);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    if (auth.user) {
      TransactionSercvice.subAdminList(auth.user).then((res) => {
        setSubAdminlist(res.data.data);

      });
    }
  }, [auth]);

  const startIndex = Math.min((page - 1) * pageLimit + 1);
  const endIndex = Math.min(page * pageLimit, totalData);

  const handleReset = () => {
    setPage(1)
    setData({
      filters: {
        transactionType: '',
        subAdminName: '',
        startDate: moment(defaultStartDate).toISOString(),
        endDate: moment(new Date()).toISOString(),
        maxAmount: maxAmount === 0 ? 5000 : maxAmount,
        minAmount: minAmount
      }
    });
  };

  const handleDelete = (e, id, transactionType) => {
    switch (transactionType) {
      case "Deposit":
        AccountService.SaveTransaction({ requestId: id }, auth.user)

          .then((res) => {
            toast.success(res.data.message);
          })
          .catch((err) => {
            toast.error(customErrorHandler(err));
          });
        break;
      case "Withdraw":
        AccountService.SaveTransaction({ requestId: id }, auth.user)
          .then((res) => {
            toast.success(res.data.message);
          })
          .catch((err) => {
            toast.error(customErrorHandler(err));
          });
        break;

      case "Manual-Website-Withdraw":
        AccountService.SaveWebsiteTransaction({ requestId: id }, auth.user)
          .then((res) => {
            toast.success(res.data.message);
          })
          .catch((err) => {
            toast.error(customErrorHandler(err));
          });
        break;
      case "Manual-Website-Deposit":
        AccountService.SaveWebsiteTransaction({ requestId: id }, auth.user)
          .then((res) => {
            toast.success(res.data.message);
          })
          .catch((err) => {
            toast.error(customErrorHandler(err));
          });
        break;
      default:
      // code block
    }
  };

  const handleSubAdminSearch = useCallback(
    debounce((value) => {
      if (value) {
        const filteredItems = subAdminlist.filter((item) =>
          item.userName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSubAdminOptions(filteredItems);
        setIsSubAdminDropdownVisible(true);
      } else {
        setFilteredSubAdminOptions([]);
        setIsSubAdminDropdownVisible(false);
      }
    }, 1300),
    [subAdminlist]
  );

  const handleSubAdminChange = (e) => {
    const value = e.target.value;
    setSubAdmin(value);
    handleSubAdminSearch(value);
  };

  const handleSubAdminKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveSubAdminIndex((prevIndex) =>
        (prevIndex + 1) % filteredSubAdminOptions.length
      );
    } else if (e.key === "ArrowUp") {
      setActiveSubAdminIndex(
        (prevIndex) =>
          (prevIndex - 1 + filteredSubAdminOptions.length) %
          filteredSubAdminOptions.length
      );
    } else if ((e.key === "Enter" || e.key === "Tab") && activeSubAdminIndex >= 0) {
      setSubAdmin(filteredSubAdminOptions[activeSubAdminIndex].userName);
      setIsSubAdminDropdownVisible(false);
      setActiveSubAdminIndex(-1);
    }
  };

  return (
    <div className="">
      <SingleCard>
        <SingleCard style={{ border: "1px solid #4682b4" }}>
          <div
            className="card card-body rounded-4 "
            style={{
              backgroundColor: "#4682b4",
              boxShadow:
                "0 8px 16px rgba(0,0,0,0.3), 0 12px 24px rgba(0,0,0,0.2)",
              borderRadius: "1000px",
              padding: "20px",
              transformStyle: "preserve-3d",
              margin: "20px",
              zIndex: "1000",
            }}
          >
            <div className="row g-2">
              <div className="col-12 col-md-3">
                <h6 className="fw-bold text-light">Transaction</h6>
                <select
                  className="form-control"
                  value={select || ""}
                  autoComplete="off"
                  onChange={handleChange}
                  style={{
                    border: "0.5px solid black",
                    borderRadius: "6px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <option value="">
                    <b>All</b>
                  </option>
                  <option value="Deposit">
                    <b>Deposit</b>
                  </option>
                  <option value="Withdraw">
                    <b>Withdraw</b>
                  </option>
                  <option value="Manual-Website-Deposit">
                    <b>Manual Website Deposit</b>
                  </option>
                  <option value="Manual-Website-Withdraw">
                    <b>Manual Website Withdraw</b>
                  </option>
                </select>
              </div>

              <div className="col-md-4 col-lg-3">
                <h6 className="fw-bold text-nowrap">SubAdmin List</h6>
                <input
                  className="form-control"
                  value={subAdmin || ""}
                  placeholder="SubAdmin Name"
                  type="text"
                  autoComplete="off"
                  onChange={handleSubAdminChange}
                  onKeyDown={handleSubAdminKeyDown}
                  onFocus={() => setIsSubAdminDropdownVisible(true)}
                  onBlur={() => setIsSubAdminDropdownVisible(false)}
                  style={{ border: "0.5px solid black", borderRadius: "6px" }}
                />
                {isSubAdminDropdownVisible && (
                  <ul
                    className="dropdown-menu show w-100"
                    style={{ maxHeight: "150px", overflowY: "auto" }}
                  >
                    {filteredSubAdminOptions.length > 0 ? (
                      filteredSubAdminOptions.map((option, index) => (
                        <li
                          key={index}
                          className={`dropdown-item ${index === activeSubAdminIndex ? "active" : ""}`}
                          onMouseDown={() => {
                            setSubAdmin(option.userName);
                            setIsSubAdminDropdownVisible(false);
                            setActiveSubAdminIndex(-1);
                          }}
                        >
                          {option.userName}
                        </li>
                      ))
                    ) : (
                      <li style={{ padding: "8px" }}>Not found</li>
                    )}
                  </ul>
                )}
              </div>

              <div className="col-12 col-md-3">
                <h6 className="fw-bold text-light">Range Of Amount</h6>
                <div className="d-flex align-items-center">
                  <input
                    className="form-control"
                    type="number"
                    value={minAmount}
                    autoComplete="off"
                    onChange={handleMinAmount}
                    placeholder="Min Amt"
                    style={{
                      border: "0.5px solid black",
                      borderRadius: "6px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                    required
                    min={1}
                  />
                  <h6 className="fw-bold text-light px-2">To</h6>
                  <input
                    className="form-control"
                    type="number"
                    value={maxAmount === 0 ? 5000 : maxAmount}
                    autoComplete="off"
                    onChange={handleMaxAmount}
                    placeholder="Max Amt"
                    style={{
                      border: "0.5px solid black",
                      borderRadius: "6px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                    required
                    min={1}
                  />
                </div>
              </div>

              <div className="col-12 col-md-3">
                <h6 className="fw-bold text-light">Date Range</h6>
                <div className="d-flex align-items-center">
                  <Datetime
                    value={startDatevalue}
                    onChange={handleStartDatevalue}
                    dateFormat="DD-MM-YYYY"
                    timeFormat="HH:mm"
                    inputProps={{
                      style: {
                        border: "0.5px solid black",
                        borderRadius: "6px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      },
                    }}
                  />
                  <h6 className="fw-bold text-light px-2">To</h6>
                  <Datetime
                    value={endDatevalue}
                    onChange={handleEndDatevalue}
                    dateFormat="DD-MM-YYYY"
                    timeFormat="HH:mm"
                    inputProps={{
                      style: {
                        border: "0.5px solid black",
                        borderRadius: "6px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        right: "50px",
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="row g-2 mt-3">
              <div className="col-12 d-flex justify-content-center flex-wrap">
                <button
                  type="button"
                  className="btn btn-dark mx-2"
                  onClick={handleDataChange}
                  style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
                >
                  Filter
                </button>
                <button
                  type="button"
                  className="btn btn-dark mx-2"
                  onClick={handleReset}
                  style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
                >
                  Reset
                </button>
                {toggle ? (
                  <CSVLink
                    data={documentView}
                    className="btn btn-success mx-2"
                  >
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
        </SingleCard>
      </SingleCard>

      <SingleCard className="card card-body rounded-8px mt-2">
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
                    <th
                      scope="col"
                      className="text-info"
                      style={{ backgroundColor: "#e6f7ff" }}
                    >
                      Balance
                    </th>
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
                              <p
                                className={`col fs-6 text-break ${["Manual-Website-Deposit", "Deposit"].includes(
                                  data.transactionType
                                )
                                  ? "text-success" // Green for deposits
                                  : [
                                    "Manual-Website-Withdraw",
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

                          <td>{data.balance ? data.balance : "N .A"}</td>
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
                              {data?.Transaction_Id && <FontAwesomeIcon
                                icon={faTrash}
                                onClick={(e) => {
                                  handleDelete(e, data?.Transaction_Id, data?.transactionType);
                                }}
                              />}
                              {data?.websiteTransactionId && <FontAwesomeIcon
                                icon={faTrash}
                                onClick={(e) => {
                                  handleDelete(e, data?.websiteTransactionId, data?.transactionType);
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
            <NewPagination
              currentPage={page}
              totalPages={totalPage}
              handlePageChange={selectPageHandler}
              startIndex={startIndex}
              endIndex={endIndex}
              totalData={totalData}
            />
          ) : null}

        </SingleCard>
      </SingleCard>
    </div>
  );
};

export default WebsiteStatement;
