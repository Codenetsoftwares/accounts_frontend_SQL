import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../Utils/Auth";
import TransactionSercvice from "../Services/TransactionSercvice";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { CSVLink } from "react-csv";
import AccountService from "../Services/AccountService";
import { toast } from "react-toastify";
import SingleCard from "../common/singleCard";
import GridCard from "../common/gridCard";
import { debounce } from "lodash";


const FilterMainTransaction = ({
  purpose,
  handleData,
  page,
  handlePage,
  handleTotalData,
}) => {
  const auth = useAuth();
  const [subAdminlist, setSubAdminlist] = useState([]);
  const [subAdmin, setSubAdmin] = useState("");
  const [bankList, setBankList] = useState([]);
  const [bank, setBank] = useState("");
  const [introducerList, setIntroducerList] = useState([]);
  const [introducer, setIntroducer] = useState("");
  const [websiteList, setWebsiteList] = useState([]);
  const [website, setWebsite] = useState("");
  const [select, setSelect] = useState("");
  const [startDatevalue, SetStartDatesetValue] = useState(
    new Date() - 1 * 24 * 60 * 60 * 1000
  );
  const [endDatevalue, setEndDateValue] = useState(new Date());
  const [documentView, setDocumentView] = useState([]);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [accountData, setAccountData] = useState([]);

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
  const [searchByTransactionId, setSearchByTransactionId] = useState("");


  const handleFilter = () => {
    const data = {
      transactionType: select,
      introducerList: introducer,
      subAdminList: subAdmin,
      BankList: bank,
      WebsiteList: website,
      sdate: moment(startDatevalue).toDate(),
      edate: moment(endDatevalue).toDate(),
      maxAmount: maxAmount,
      minAmount: minAmount,
      transactionID: searchByTransactionId,
    };
    TransactionSercvice.filterTransaction(data, page, auth.user)
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
  }, []);

  useEffect(() => {
    handleFilter();
  }, [page]);

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

  // const handleSearchBank = useCallback(
  //   debounce((value) => {
  //     if (value) {
  //       const filteredItems = bankOptions.filter((item) =>
  //         item.bankName.toLowerCase().includes(value.toLowerCase())
  //       );
  //       setFilteredBankOptions(filteredItems);
  //       setIsBankDropdownVisible(true);
  //     } else {
  //       setFilteredBankOptions([]);
  //       setIsBankDropdownVisible(false);
  //     }
  //   }, 1300),
  //   [bankOptions]
  // );

  // const handleSearchWebsite = useCallback(
  //   debounce((value) => {
  //     if (value) {
  //       const filteredItems = websiteOptions.filter((item) =>
  //         item.websiteName.toLowerCase().includes(value.toLowerCase())
  //       );
  //       setFilteredWebsiteOptions(filteredItems);
  //       setIsWebsiteDropdownVisible(true);
  //     } else {
  //       setFilteredWebsiteOptions([]);
  //       setIsWebsiteDropdownVisible(false);
  //     }
  //   }, 1300),
  //   [websiteOptions]
  // );

  // const handleBankKeyDown = (e, setFieldValue) => {
  //   if (e.key === "ArrowDown") {
  //     setActiveBankIndex((prevIndex) =>
  //       (prevIndex + 1) % filteredBankOptions.length
  //     );
  //   } else if (e.key === "ArrowUp") {
  //     setActiveBankIndex(
  //       (prevIndex) =>
  //         (prevIndex - 1 + filteredBankOptions.length) %
  //         filteredBankOptions.length
  //     );
  //   } else if ((e.key === "Enter" || e.key === "Tab") && activeBankIndex >= 0) {
  //     setFieldValue("bankName", filteredBankOptions[activeBankIndex].bankName);
  //     setIsBankDropdownVisible(false);
  //     setActiveBankIndex(-1);
  //   }
  // };

  // const handleWebsiteKeyDown = (e, setFieldValue) => {
  //   if (e.key === "ArrowDown") {
  //     setActiveWebsiteIndex((prevIndex) =>
  //       (prevIndex + 1) % filteredWebsiteOptions.length
  //     );
  //   } else if (e.key === "ArrowUp") {
  //     setActiveWebsiteIndex(
  //       (prevIndex) =>
  //         (prevIndex - 1 + filteredWebsiteOptions.length) %
  //         filteredWebsiteOptions.length
  //     );
  //   } else if (
  //     (e.key === "Enter" || e.key === "Tab") &&
  //     activeWebsiteIndex >= 0
  //   ) {
  //     setFieldValue(
  //       "websiteName",
  //       filteredWebsiteOptions[activeWebsiteIndex].websiteName
  //     );
  //     setIsWebsiteDropdownVisible(false);
  //     setActiveWebsiteIndex(-1);
  //   }
  // };



  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);
  };

  const handleSubAdmin = (e) => {
    const value = e.target.value;
    setSubAdmin(value);
  };
  const handleSearchByTransactionId = (e) => {
    const value = e.target.value;
    setSearchByTransactionId(value);
  };
  const handleIntroducer = (e) => {
    const value = e.target.value;
    setIntroducer(value);
  };

  const handleBank = (e) => {
    const value = e.target.value;
    setBank(value);
  };

  const handleMinAmount = (e) => {
    const value = e.target.value;
    setMinAmount(value);
  };
  const handleMaxAmount = (e) => {
    const value = e.target.value;
    setMaxAmount(value);
  };
  const handleWebsite = (e) => {
    const value = e.target.value;
    setWebsite(value);
  };

  return (
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
              <option value="All">All</option>
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
            <h6 className="fw-bold text-nowrap">SubAdmin List</h6>
            <select
              className="form-control"
              value={subAdmin || ""}
              autoComplete="off"
              onChange={handleSubAdmin}
              style={{ border: "0.5px solid black", borderRadius: "6px" }}
              required
            >
              <option value="">Select subAdmin</option>
              {subAdminlist.map((data) => (
                <option key={data._id} value={data.userName}>
                  {data.userName}
                </option>
              ))}
            </select>
          </div>

          {purpose === "mainStatement" && (
            <>
              <div className="col-md-4 col-lg-3">
                <h6 className="fw-bold text-nowrap">Introducer List</h6>
                <select
                  className="form-control"
                  value={introducer || ""}
                  autoComplete="off"
                  onChange={handleIntroducer}
                  style={{ border: "0.5px solid black", borderRadius: "6px" }}
                  required
                >
                  <option value="">Select Introducer</option>
                  {introducerList.map((data) => (
                    <option key={data._id} value={data.userName}>
                      {data.userName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 col-lg-3">
                <h6 className="fw-bold text-nowrap">Bank Name List</h6>
                <select
                  className="form-control"
                  value={bank || ""}
                  autoComplete="off"
                  onChange={handleBank}
                  style={{ border: "0.5px solid black", borderRadius: "6px" }}
                  required
                >
                  <option value="">Select Bank</option>
                  {bankList.map((data) => (
                    <option key={data._id} value={data.bankName}>
                      {data.bankName}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="col-md-4 col-lg-3">
            <h6 className="fw-bold text-nowrap">Websites List</h6>
            <select
              className="form-control"
              value={website || ""}
              autoComplete="off"
              onChange={handleWebsite}
              style={{ border: "0.5px solid black", borderRadius: "6px" }}
              required
            >
              <option value="">Select Website</option>
              {websiteList.map((data) => (
                <option key={data._id} value={data.websiteName}>
                  {data.websiteName}
                </option>
              ))}
            </select>
          </div>

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


          <div className="col-md-4 col-lg-3">
            <h6 className="fw-bold text-nowrap">Search By Transaction ID</h6>
            <input
              type="text"
              className="form-control"
              placeholder="Transaction ID"
              value={searchByTransactionId || ""}
              onChange={handleSearchByTransactionId}
              style={{ border: "0.5px solid black", borderRadius: "6px" }}
            />
          </div>

          <div className="col-md-4 col-lg-3">
            <h6 className="fw-bold text-nowrap">Date Range</h6>
            <div className="d-flex">
              <Datetime
                value={startDatevalue}
                // onChange={handleStartDatevalue}
                dateFormat="DD-MM-YYYY"
                timeFormat="HH:mm"
              />
              <h6 className="fw-bold text-nowrap">To</h6>
              <Datetime
                value={endDatevalue}
                // onChange={handleEndDatevalue}
                dateFormat="DD-MM-YYYY"
                timeFormat="HH:mm"
              />
            </div>
          </div>
          <div className="col-12 mt-3">
            <div className="d-flex justify-content-start gap-2">
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
        </div>
      </SingleCard>
    </SingleCard>
  );
};

export default FilterMainTransaction;
