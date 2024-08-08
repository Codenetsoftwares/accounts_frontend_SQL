import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../Utils/Auth";
import TransactionSercvice from "../Services/TransactionSercvice";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { CSVLink } from "react-csv";
import AccountService from "../Services/AccountService";
import { toast } from "react-toastify";
import SingleCard from "../common/singleCard";
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
    handleData(accountData);
    setMinAmount(0);
    setMaxAmount(0);
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

  // Debounced function for searching banks
  const handleSearchBank = useCallback(
    debounce((value) => {
      if (value) {
        const filteredItems = bankList.filter((item) =>
          item.bankName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredBankOptions(filteredItems);
        setIsBankDropdownVisible(true);
      } else {
        setFilteredBankOptions([]);
        setIsBankDropdownVisible(false);
      }
    }, 300), // Adjust the debounce delay (in milliseconds) as needed
    [bankList]
  );

  const handleBankKeyDown = (e) => {
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
      setBank(filteredBankOptions[activeBankIndex].bankName);
      setIsBankDropdownVisible(false);
      setActiveBankIndex(-1);
    }
  };

  const handleStartDatevalue = (e) => {
    SetStartDatesetValue(moment(e));
  };

  const handleEndDatevalue = (e) => {
    setEndDateValue(moment(e));
  };

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
    handleSearchBank(value); // Call the debounced search function
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
              <option value="Manual-Cash-Withdraw">Manual Cash Withdraw</option>
              <option value="Manual-Cash-Deposit">Manual Cash Deposit</option>
              <option value="Bonus">Bonus</option>
              <option value="admin-Manual-Bank-Withdraw">
                Admin Manual Bank Withdraw
              </option>
            </select>
          </div>
          <div className="col-md-4 col-lg-3">
            <h6 className="fw-bold text-nowrap">Bank Name</h6>
            <input
              className="form-control"
              value={bank || ""}
              placeholder="Bank Name"
              type="text"
              autoComplete="off"
              onChange={handleBank}
              onKeyDown={handleBankKeyDown}
              onFocus={() => setIsBankDropdownVisible(true)}
              onBlur={() => setIsBankDropdownVisible(false)}
              style={{ border: "0.5px solid black", borderRadius: "6px" }}
            />
            {isBankDropdownVisible && filteredBankOptions.length > 0 && (
              <ul
                className="dropdown-menu show w-100"
                style={{ maxHeight: "150px", overflowY: "auto" }}
              >
                {filteredBankOptions.map((option, index) => (
                  <li
                    key={index}
                    className={`dropdown-item ${index === activeBankIndex ? "active" : ""
                      }`}
                    onMouseDown={() => {
                      setBank(option.bankName);
                      setIsBankDropdownVisible(false);
                      setActiveBankIndex(-1);
                    }}
                  >
                    {option.bankName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="col-md-4 col-lg-3">
            <h6 className="fw-bold text-nowrap">Website</h6>
            <input
              className="form-control"
              value={website || ""}
              placeholder="Website"
              type="text"
              autoComplete="off"
              onChange={handleWebsite}
              style={{ border: "0.5px solid black", borderRadius: "6px" }}
            />
          </div>
          <div className="col-md-4 col-lg-3">
            <h6 className="fw-bold text-nowrap">Introducer</h6>
            <select
              className="form-control"
              value={introducer || ""}
              onChange={handleIntroducer}
              autoComplete="off"
              style={{ border: "0.5px solid black", borderRadius: "6px" }}
            >
              <option value="">All</option>
              {introducerList.map((introducer, index) => (
                <option key={index} value={introducer}>
                  {introducer}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 col-lg-3">
            <h6 className="fw-bold text-nowrap">Sub-Admin</h6>
            <select
              className="form-control"
              value={subAdmin || ""}
              onChange={handleSubAdmin}
              autoComplete="off"
              style={{ border: "0.5px solid black", borderRadius: "6px" }}
            >
              <option value="">All</option>
              {subAdminlist.map((subAdmin, index) => (
                <option key={index} value={subAdmin}>
                  {subAdmin}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 col-lg-3">
            <h6 className="fw-bold text-nowrap">Start Date</h6>
            <Datetime
              closeOnSelect
              value={startDatevalue || ""}
              dateFormat="DD/MM/yyyy"
              timeFormat={false}
              onChange={handleStartDatevalue}
              className="form-control"
              style={{
                border: "0.5px solid black",
                borderRadius: "6px",
                width: "100%",
              }}
              inputProps={{
                style: {
                  width: "100%",
                  border: "0.5px solid black",
                  borderRadius: "6px",
                },
              }}
            />
          </div>
          <div className="col-md-4 col-lg-3">
            <h6 className="fw-bold text-nowrap">End Date</h6>
            <Datetime
              closeOnSelect
              value={endDatevalue || ""}
              dateFormat="DD/MM/yyyy"
              timeFormat={false}
              onChange={handleEndDatevalue}
              className="form-control"
              style={{
                border: "0.5px solid black",
                borderRadius: "6px",
                width: "100%",
              }}
              inputProps={{
                style: {
                  width: "100%",
                  border: "0.5px solid black",
                  borderRadius: "6px",
                },
              }}
            />
          </div>
          <div className="col-md-4 col-lg-3">
            <h6 className="fw-bold text-nowrap">Transaction ID</h6>
            <input
              className="form-control"
              value={searchByTransactionId || ""}
              placeholder="Transaction ID"
              type="text"
              autoComplete="off"
              onChange={handleSearchByTransactionId}
              style={{ border: "0.5px solid black", borderRadius: "6px" }}
            />
          </div>
          <div className="col-md-4 col-lg-3">
            <h6 className="fw-bold text-nowrap">Min Amount</h6>
            <input
              className="form-control"
              value={minAmount || ""}
              placeholder="Minimum Amount"
              type="text"
              autoComplete="off"
              onChange={handleMinAmount}
              style={{ border: "0.5px solid black", borderRadius: "6px" }}
            />
          </div>
          <div className="col-md-4 col-lg-3">
            <h6 className="fw-bold text-nowrap">Max Amount</h6>
            <input
              className="form-control"
              value={maxAmount || ""}
              placeholder="Maximum Amount"
              type="text"
              autoComplete="off"
              onChange={handleMaxAmount}
              style={{ border: "0.5px solid black", borderRadius: "6px" }}
            />
          </div>
          <div className="col-md-4 col-lg-3 d-flex align-items-end mb-3">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleFilter}
              style={{
                paddingLeft: "25px",
                paddingRight: "25px",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Filter
            </button>
            <button
              className="btn btn-secondary ms-2"
              type="button"
              onClick={handleReset}
              style={{
                paddingLeft: "25px",
                paddingRight: "25px",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </SingleCard>
    </SingleCard>
  );
};

export default FilterMainTransaction;
