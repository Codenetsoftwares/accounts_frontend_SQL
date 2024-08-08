import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from "../Utils/Auth"
import TransactionSercvice from '../Services/TransactionSercvice'
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { CSVLink } from "react-csv";
import AccountService from '../Services/AccountService';
import { toast } from 'react-toastify';
import SingleCard from '../common/singleCard';
import { debounce } from 'lodash';

const FilterMainTransaction = ({ purpose, handleData, setPage, handlePage, handleTotalData, FilterData, page, setTotalPage, setDocumentFilter }) => {
    const auth = useAuth();
    const [subAdminlist, setSubAdminlist] = useState([]);
    const [subAdmin, setSubAdmin] = useState("");
    const [bank, setBank] = useState("");
    const [introducerList, setIntroducerList] = useState([]);
    const [introducer, setIntroducer] = useState("");
    const [websiteList, setWebsiteList] = useState([]);
    const [website, setWebsite] = useState("");
    const [select, setSelect] = useState("");
    const [startDatevalue, SetStartDatesetValue] = useState(new Date() - 1 * 24 * 60 * 60 * 1000);
    const [endDatevalue, setEndDateValue] = useState(new Date());
    const [documentView, setDocumentView] = useState([]);
    const [minAmount, setMinAmount] = useState(0);
    const [maxAmount, setMaxAmount] = useState(0);
    const [bankList, setBankList] = useState([]);
    const [filteredBankOptions, setFilteredBankOptions] = useState([]);
    const [isBankDropdownVisible, setIsBankDropdownVisible] = useState(false);
    const [activeBankIndex, setActiveBankIndex] = useState(-1);
    const [filteredSubAdminOptions, setFilteredSubAdminOptions] = useState([]);
    const [isSubAdminDropdownVisible, setIsSubAdminDropdownVisible] = useState(false);
    const [activeSubAdminIndex, setActiveSubAdminIndex] = useState(-1);
    const [filteredIntroducerOptions, setFilteredIntroducerOptions] = useState([]);
    const [isIntroducerDropdownVisible, setIsIntroducerDropdownVisible] = useState(false);
    const [activeIntroducerIndex, setActiveIntroducerIndex] = useState(-1);
    const [filteredWebsiteOptions, setFilteredWebsiteOptions] = useState([]);
    const [isWebsiteDropdownVisible, setIsWebsiteDropdownVisible] = useState(false);
    const [activeWebsiteIndex, setActiveWebsiteIndex] = useState(-1);
    const [searchByTransactionId, setSearchByTransactionId] = useState("");

    const handleFilter = () => {
        const data = {
            "filters": {
                transactionType: select,
                introducerUserName: introducer,
                subAdminId: subAdmin,
                bankName: bank,
                websiteName: website,
                // sdate: moment(startDatevalue).toDate(),
                // edate: moment(endDatevalue).toDate(),
                // maxAmount: maxAmount,
                // minAmount: minAmount
            }
        }
        TransactionSercvice.filterTransaction(data, page, auth.user).then((res) => {
            return (
                console.log(res.data.pagination),
                setDocumentFilter(res.data.data),
                setPage(res.data.pagination.page),
                setTotalPage(res.data.pagination.totalPages),
                handleTotalData(res.data.pagination.totalItems)
            )
        }).catch((err) => {
            return (
                handleData(""),
                toast.error(err.response.data.message)
            )
        });
    }

    const handleReset = () => {
        setSelect("");
        setSubAdmin("");
        setBank("");
        setWebsite("");
        SetStartDatesetValue(new Date() - 1 * 24 * 60 * 60 * 1000);
        setEndDateValue(new Date());
        setIntroducer("");
        handleFilter();
        handlePage(1)
        window.location.reload();
    };
    useEffect(() => {
        handleFilter();
    }, []);

    useEffect(() => {
        handleFilter();
    }, [page, select, introducer, subAdmin, bank,website]);

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

    console.log(websiteList)
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

    const handleIntroducer = (e) => {
        const value = e.target.value;
        setIntroducer(value);
    };

    const handleBank = (e) => {
        const value = e.target.value;
        setBank(value);
        handleSearchBank(value); // Ensure this is called here
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

    const handleSearchByTransactionId = (e) => {
        const value = e.target.value;
        setSearchByTransactionId(value);
    };

    // Debounced function for searching banks
    const handleSearchBank = useCallback(
        debounce((value) => {
            console.log('Debounced function called with:', value); // Debug log
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
        }, 1300),
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


    const handleWebsiteSearch = useCallback(
        debounce((value) => {
            if (value) {
                const filteredItems = websiteList.filter((item) =>
                    item.websiteName.toLowerCase().includes(value.toLowerCase())
                );
                setFilteredWebsiteOptions(filteredItems);
                setIsWebsiteDropdownVisible(true);
            } else {
                setFilteredWebsiteOptions([]);
                setIsWebsiteDropdownVisible(false);
            }
        }, 1300),
        [websiteList]
    );

    const handleWebsiteChange = (e) => {
        const value = e.target.value;
        setWebsite(value);
        handleWebsiteSearch(value);
    };

    const handleWebsiteKeyDown = (e) => {
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
        } else if ((e.key === "Enter" || e.key === "Tab") && activeWebsiteIndex >= 0) {
            setWebsite(filteredWebsiteOptions[activeWebsiteIndex].websiteName);
            setIsWebsiteDropdownVisible(false);
            setActiveWebsiteIndex(-1);
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


    const handleIntroducerSearch = useCallback(
        debounce((value) => {
            if (value) {
                const filteredItems = introducerList.filter((item) =>
                    item.userName.toLowerCase().includes(value.toLowerCase())
                );
                setFilteredIntroducerOptions(filteredItems);
                setIsIntroducerDropdownVisible(true);
            } else {
                setFilteredIntroducerOptions([]);
                setIsIntroducerDropdownVisible(false);
            }
        }, 1300),
        [introducerList]
    );

    const handleIntroducerChange = (e) => {
        const value = e.target.value;
        setIntroducer(value);
        handleIntroducerSearch(value);
    };

    const handleIntroducerKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            setActiveIntroducerIndex((prevIndex) =>
                (prevIndex + 1) % filteredIntroducerOptions.length
            );
        } else if (e.key === "ArrowUp") {
            setActiveIntroducerIndex(
                (prevIndex) =>
                    (prevIndex - 1 + filteredIntroducerOptions.length) %
                    filteredIntroducerOptions.length
            );
        } else if ((e.key === "Enter" || e.key === "Tab") && activeIntroducerIndex >= 0) {
            setIntroducer(filteredIntroducerOptions[activeIntroducerIndex].userName);
            setIsIntroducerDropdownVisible(false);
            setActiveIntroducerIndex(-1);
        }
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


                    {purpose === "mainStatement" && (
                        <>
                            <div className="col-md-4 col-lg-3">
                                <h6 className="fw-bold text-nowrap">Introducer List</h6>
                                <input
                                    className="form-control"
                                    value={introducer || ""}
                                    placeholder="Introducer Name"
                                    type="text"
                                    autoComplete="off"
                                    onChange={handleIntroducerChange}
                                    onKeyDown={handleIntroducerKeyDown}
                                    onFocus={() => setIsIntroducerDropdownVisible(true)}
                                    onBlur={() => setIsIntroducerDropdownVisible(false)}
                                    style={{ border: "0.5px solid black", borderRadius: "6px" }}
                                />
                                {isIntroducerDropdownVisible && (
                                    <ul
                                        className="dropdown-menu show w-100"
                                        style={{ maxHeight: "150px", overflowY: "auto" }}
                                    >
                                        {filteredIntroducerOptions.length > 0 ? (
                                            filteredIntroducerOptions.map((option, index) => (
                                                <li
                                                    key={index}
                                                    className={`dropdown-item ${index === activeIntroducerIndex ? "active" : ""}`}
                                                    onMouseDown={() => {
                                                        setIntroducer(option.userName);
                                                        setIsIntroducerDropdownVisible(false);
                                                        setActiveIntroducerIndex(-1);
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
                                {isBankDropdownVisible && (
                                    <ul
                                        className="dropdown-menu show w-100"
                                        style={{ maxHeight: "150px", overflowY: "auto" }}
                                    >
                                        {filteredBankOptions.length > 0 ? (
                                            filteredBankOptions.map((option, index) => (
                                                <li
                                                    key={index}
                                                    className={`dropdown-item ${index === activeBankIndex ? "active" : ""}`}
                                                    onMouseDown={() => {
                                                        setBank(option.bankName);
                                                        setIsBankDropdownVisible(false);
                                                        setActiveBankIndex(-1);
                                                    }}
                                                >
                                                    {option.bankName}
                                                </li>
                                            ))
                                        ) : (
                                            <li style={{ padding: "8px" }}>Not found</li>
                                        )}
                                    </ul>
                                )}

                            </div>
                        </>
                    )}

                    <div className="col-md-4 col-lg-3">
                        <h6 className="fw-bold text-nowrap">Websites List</h6>
                        <input
                            className="form-control"
                            value={website || ""}
                            placeholder="Website Name"
                            type="text"
                            autoComplete="off"
                            onChange={handleWebsiteChange}
                            onKeyDown={handleWebsiteKeyDown}
                            onFocus={() => setIsWebsiteDropdownVisible(true)}
                            onBlur={() => setIsWebsiteDropdownVisible(false)}
                            style={{ border: "0.5px solid black", borderRadius: "6px" }}
                        />
                        {isWebsiteDropdownVisible && (
                            <ul
                                className="dropdown-menu show w-100"
                                style={{ maxHeight: "150px", overflowY: "auto" }}
                            >
                                {filteredWebsiteOptions.length > 0 ? (
                                    filteredWebsiteOptions.map((option, index) => (
                                        <li
                                            key={index}
                                            className={`dropdown-item ${index === activeWebsiteIndex ? "active" : ""}`}
                                            onMouseDown={() => {
                                                setWebsite(option.websiteName);
                                                setIsWebsiteDropdownVisible(false);
                                                setActiveWebsiteIndex(-1);
                                            }}
                                        >
                                            {option.websiteName}
                                        </li>
                                    ))
                                ) : (
                                    <li style={{ padding: "8px" }}>Not found</li>
                                )}
                            </ul>
                        )}
                    </div>


                    {(purpose === "introducerReport" || purpose === "mainStatement") && (
                        <div className="col-md-4 col-lg-3">
                            <h6 className="fw-bold text-nowrap">Range Of Amount</h6>
                            <div className="d-flex justify-content-between">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Min Amount"
                                    value={minAmount || ""}
                                    onChange={handleMinAmount}
                                    style={{ border: "0.5px solid black", borderRadius: "6px" }}
                                />
                                <h6 className="fw-bold mx-2">To</h6>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Max Amount"
                                    value={maxAmount || ""}
                                    onChange={handleMaxAmount}
                                    style={{ border: "0.5px solid black", borderRadius: "6px" }}
                                />
                            </div>
                        </div>
                    )}

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
    )
}

export default FilterMainTransaction