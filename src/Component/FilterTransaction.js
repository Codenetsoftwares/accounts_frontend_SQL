import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../Utils/Auth";
import TransactionSercvice from "../Services/TransactionSercvice";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { CSVLink } from "react-csv";
import AccountService from "../Services/AccountService";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const FilterTransaction = ({
  purpose,
  handleData,
  page,
  handlePage,
  handleTotalData,
  api,
  FilterData,
}) => {
  const { id } = useParams();
  const auth = useAuth();
  const [accountData, setAccountData] = useState([]);
  const [subAdminlist, setSubAdminlist] = useState([]);
  const [subAdmin, setSubAdmin] = useState("");
  const [bankList, setBankList] = useState([]);
  const [bank, setBank] = useState("");
  const [introducerList, setIntroducerList] = useState([]);
  const [introducer, setIntroducer] = useState("");
  const [websiteList, setWebsiteList] = useState([]);
  const [website, setWebsite] = useState("");
  const [select, setSelect] = useState("");
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 1);
  const [startDatevalue, SetStartDatesetValue] = useState(defaultStartDate);
  const [endDatevalue, setEndDateValue] = useState(new Date());
  const [documentView, setDocumentView] = useState([]);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [filteredBankOptions, setFilteredBankOptions] = useState([]);
  const [filteredWebsiteOptions, setFilteredWebsiteOptions] = useState([]);
  const [filteredSubAdminOptions, setFilteredSubAdminOptions] = useState([]);
  const [filteredIntroducerOptions, setFilteredIntroducerOptions] = useState([]);
  const [activeBankIndex, setActiveBankIndex] = useState(-1);
  const [activeWebsiteIndex, setActiveWebsiteIndex] = useState(-1);
  const [activeSubAdminIndex, setActiveSubAdminIndex] = useState(-1);
  const [activeIntroducerIndex, setActiveIntroducerIndex] = useState(-1);
  const [isBankDropdownVisible, setIsBankDropdownVisible] = useState(false);
  const [isWebsiteDropdownVisible, setIsWebsiteDropdownVisible] = useState(false);
  const [isSubAdminDropdownVisible, setIsSubAdminDropdownVisible] = useState(false);
  const [isIntroducerDropdownVisible, setIsIntroducerDropdownVisible] = useState(false);

  const handleFilter = () => {
    api(auth.user, id)
      .then((res) => {
        return (
          setDocumentView(res.data.data),
          handleData(res.data.data),
          setAccountData(res.data.data)
        );
      })
      .catch((err) => {
        return handleData(""), toast.error(err.response.data.message);
      });
  };

  const test = ["transactionType", "subAdminName", "websiteName", "bankName"];

  const handleClick = (key, value) => {
    let nArr = [...documentView];

    if (test.includes(key)) {
      nArr = nArr.filter((item) => item[key] === value);
    }
    // setDocumentView(nArr);
    handleData(nArr);
  };

  // useEffect(() => {
  //   handelData();
  // }, [documentView]);

  const handleReset = () => {
    setSelect("");
    setSubAdmin("");
    setBank("");
    setWebsite("");
    SetStartDatesetValue(new Date() - 1 * 24 * 60 * 60 * 1000);
    setEndDateValue(new Date());
    setIntroducer("");
    handleFilter();
    // handlePage(1);
    handleData(accountData);
    setMinAmount(0);
    setMaxAmount(0);
    // handlememo();
    // window.location.reload(); 
  };

  useEffect(() => {
    handleFilter();
    handelData();
  }, []);

  useEffect(() => {
    if (auth.user) {
      // Create an array of promises for the API calls
      const promises = [
        TransactionSercvice.subAdminList(auth.user),
        TransactionSercvice.bankList(auth.user),
        AccountService.website(auth.user),
        AccountService.introducerId(auth.user),
      ];

      // Use Promise.all to handle all promises concurrently
      Promise.all(promises)
        .then(([subAdminRes, bankRes, websiteRes, introducerRes]) => {
          // Handle the response for each API call
          setSubAdminlist(subAdminRes.data.data);
          setFilteredSubAdminOptions(subAdminRes.data.data);

          setBankList(bankRes.data.data);
          setFilteredBankOptions(bankRes.data.data);

          setWebsiteList(websiteRes.data.data);
          setFilteredWebsiteOptions(websiteRes.data.data);

          setIntroducerList(introducerRes.data.data);
          setFilteredIntroducerOptions(introducerRes.data.data);
        })
        .catch((error) => {
          // Handle any errors that occur during the API calls
          console.error("An error occurred while fetching data:", error);
        });
    }
  }, [auth]);

  const handleSearchBank = useCallback(
    debounce((value) => {
      if (value) {
        const filteredItems = bankOptions.filter((item) =>
          item.bankName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredBankOptions(filteredItems);
        setIsBankDropdownVisible(true);
      } else {
        setFilteredBankOptions([]);
        setIsBankDropdownVisible(false);
      }
    }, 1300),
    [bankOptions]
  );

  const handleSearchWebsite = useCallback(
    debounce((value) => {
      if (value) {
        const filteredItems = websiteOptions.filter((item) =>
          item.websiteName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredWebsiteOptions(filteredItems);
        setIsWebsiteDropdownVisible(true);
      } else {
        setFilteredWebsiteOptions([]);
        setIsWebsiteDropdownVisible(false);
      }
    }, 1300),
    [websiteOptions]
  );

  const handleBankKeyDown = (e, setFieldValue) => {
    if (e.key === "ArrowDown") {
      setActiveBankIndex((prevIndex) =>
        (prevIndex + 1) % filteredBankOptions.length
      );
    } else if (e.key === "ArrowUp") {
      setActiveBankIndex(
        (prevIndex) =>
          (prevIndex - 1 + filteredBankOptions.length) %
          filteredBankOptions.length
      );
    } else if ((e.key === "Enter" || e.key === "Tab") && activeBankIndex >= 0) {
      setFieldValue("bankName", filteredBankOptions[activeBankIndex].bankName);
      setIsBankDropdownVisible(false);
      setActiveBankIndex(-1);
    }
  };

  const handleWebsiteKeyDown = (e, setFieldValue) => {
    if (e.key === "ArrowDown") {
      setActiveWebsiteIndex((prevIndex) =>
        (prevIndex + 1) % filteredWebsiteOptions.length
      );
    } else if (e.key === "ArrowUp") {
      setActiveWebsiteIndex(
        (prevIndex) =>
          (prevIndex - 1 + filteredWebsiteOptions.length) %
          filteredWebsiteOptions.length
      );
    } else if (
      (e.key === "Enter" || e.key === "Tab") &&
      activeWebsiteIndex >= 0
    ) {
      setFieldValue(
        "websiteName",
        filteredWebsiteOptions[activeWebsiteIndex].websiteName
      );
      setIsWebsiteDropdownVisible(false);
      setActiveWebsiteIndex(-1);
    }
  };


  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);
    handleClick("transactionType", value);
    handlePage(1);
  };

  const handleSubAdmin = (e) => {
    const value = e.target.value;
    setSubAdmin(value);
    handleClick("subAdminName", value);
    handlePage(1);
  };

  const handleIntroducer = (e) => {
    const value = e.target.value;
    setIntroducer(value);
    handleClick("introducerId", value);
    handlePage(1);
  };

  const handleBank = (e) => {
    const value = e.target.value;
    setBank(value);
    handleClick("bankName", value);
    handlePage(1);
  };

  const handleWebsite = (e) => {
    const value = e.target.value;
    setWebsite(value);
    handleClick("websiteName", value);
    handlePage(1);
  };

  const handleMinAmount = (e) => {
    const value = e.target.value;
    setMinAmount(value);
  };
  const handleMaxAmount = (e) => {
    const value = e.target.value;
    setMaxAmount(value);
  };

  const handleStartDatevalue = (e) => {
    SetStartDatesetValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  const handleEndDatevalue = (e) => {
    setEndDateValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  const handelData = () => {
    const sdate = moment(startDatevalue, "DD-MM-YYYY HH:mm").toDate();
    const edate = moment(endDatevalue, "DD-MM-YYYY HH:mm").toDate();
    let filteredDocuments = FilterData.filter((data) => {
      const transactionDate = new Date(data.createdAt);
      return transactionDate >= sdate && transactionDate <= edate;
    });

    if (minAmount !== 0 || maxAmount !== 0) {
      filteredDocuments = filteredDocuments.filter((transaction) => {
        return (
          (Math.round(transaction.withdrawAmount) >= minAmount &&
            Math.round(transaction.withdrawAmount) <= maxAmount) ||
          (Math.round(transaction.depositAmount) >= minAmount &&
            Math.round(transaction.depositAmount) <= maxAmount) ||
          (Math.round(transaction.amount) >= minAmount &&
            Math.round(transaction.amount) <= maxAmount)
        );
      });
    }
    handleData(filteredDocuments);
    handlePage(1);
  };

  return (
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

        <div className="d-flex col pt-3 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2"> SubAdminlist</h6>
          <select
            className="form-control mx-3 w-50"
            value={subAdmin || ""}
            autoComplete="off"
            onChange={handleSubAdmin}
            style={{
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

        {/* when props pass mainstatement from parent component*/}
        {purpose === "mainStatement" && (
          <>
            <div className="d-flex col pt-3 justify-content-center">
              <h6 className="fw-bold text-nowrap pt-2"> Introducerlist</h6>
              <select
                className="form-control mx-3 w-50"
                value={introducer || ""}
                autoComplete="off"
                onChange={handleIntroducer}
                style={{
                  border: "0.5px solid black",
                  borderRadius: "6px",
                }}
                required
              >
                <option selected>Select Introducer</option>
                {introducerList.map((data) => {
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
              <h6 className="fw-bold text-nowrap pt-2">WebsitesList</h6>
              <select
                className="form-control mx-3 w-50"
                value={website || ""}
                autoComplete="off"
                onChange={handleWebsite}
                style={{
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
          </>
        )}
        {/* when props pass mainstatement  from parent component*/}

        {/* when props pass bankstatement from parent component*/}
        {/* {purpose === "bankStatement" && <div className="d-flex col pt-3 justify-content-center"  >
                    <h6 className="fw-bold text-nowrap pt-2"> BankNameList</h6>
                    <select
                        className="form-control mx-3 w-50"
                        value={bank || ""}
                        autoComplete="off"
                        onChange={handleBank}
                        style={{
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
                </div>} */}
        {/* when props pass bankstatement from parent component*/}

        {/* when props pass websitestatement from parent component*/}
        {/* {purpose === "websiteStatement" && <div className="d-flex col pt-3 justify-content-center" >
                    <h6 className="fw-bold text-nowrap pt-2"> WebsitesList</h6>
                    <select
                        className="form-control mx-3 w-50"
                        value={website || ""}
                        autoComplete="off"
                        onChange={handleWebsite}
                        style={{
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
                </div>} */}
        {/* when props pass websitestatement from parent component*/}

        {/* when props pass introducerTransactionStatement & userTransactionStatement from parent component*/}
        {purpose ===
          ("introducerTransactionStatement" || "userTransactionStatement") && (
            <>
              <div className="d-flex col pt-3 justify-content-center">
                <h6 className="fw-bold text-nowrap pt-2"> BankNameList</h6>
                <select
                  className="form-control mx-3 w-50"
                  value={bank || ""}
                  autoComplete="off"
                  onChange={handleBank}
                  style={{
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
            </>
          )}
        {/* when props pass introducerTransactionStatement & userTransactionStatement from parent component*/}

        <div className="d-flex col pt-3 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2"> Range Of Amount</h6>
          <input
            className="form-control mx-3 w-25"
            type="number"
            value={minAmount || ""}
            autoComplete="off"
            onChange={handleMinAmount}
            placeholder="Min Amt"
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
            type="number"
            value={maxAmount || ""}
            autoComplete="off"
            onChange={handleMaxAmount}
            placeholder="Max Amt"
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
                onClick={handelData}
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
              {FilterData !== undefined && (
                <CSVLink data={FilterData} className="btn btn-success">
                  Download Data
                </CSVLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTransaction;
