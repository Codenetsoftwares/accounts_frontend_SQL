import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CardFd } from "./CardFd";
import { CardFdT } from "./CardFdT";
import { useAuth } from "../../Utils/Auth";
import TransactionSercvice from "../../Services/TransactionSercvice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import CalenderService from "../../Services/CalenderService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FaFilter } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import  './AdminDash.css';
import TopNavbar from "../Sidebar/TopNavbar";

const AdminDash = () => {
  const auth = useAuth();
  const nav = useNavigate();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [documentView, setDocumentView] = useState([]);
  const [withdrawView, setWithdrawView] = useState([]);
  const [documentFilter, setDocumentFilter] = useState([]);
  const [withdrawFilter, setWithdrawFilter] = useState([]);
  const [select, setSelect] = useState("deposit");
  const [outerSelect, setOuterSelect] = useState(true);
  const [totalDeposit, setTotalDeposit] = useState("");
  const [totalWithdraw, setTotalWithdraw] = useState("");
  // const handelDate=()=>{
  //   //This is start Date
  //   const sdate = new Date(startDate);
  //   const syear = sdate.getFullYear();
  //   const smonth = String(sdate.getMonth() + 1).padStart(2, '0');
  //   const sday = String(sdate.getDate()).padStart(2, '0');
  //   const formattedsDate = `${syear}-${smonth}-${sday}`;

  //   //This is end Date
  //   const edate = new Date(endDate);
  //   const eyear = edate.getFullYear();
  //   const emonth = String(edate.getMonth() + 1).padStart(2, '0');
  //   const eday = String(edate.getDate()).padStart(2, '0');
  //   const formattedeDate = `${eyear}-${emonth}-${eday}`;

  // CalenderService.celenderdepositTransaction({startDate:formattedsDate,
  //   endDate: formattedeDate}, auth.user)
  //   .then((res) => {
  //     setDocumentView(res.data)
  //     }
  //   )
  //   .catch((err) => {
  //       alert(err.message)
  //   });

  //   CalenderService.celenderwithdrawTransaction({startDate:formattedsDate,
  //     endDate: formattedeDate}, auth.user)
  //     .then((res) => {
  //       setWithdrawView(res.data)
  //       }
  //     )
  //     .catch((err) => {
  //         alert(err.message)
  //     });
  // }

  const handelDate = () => {
    setOuterSelect(false);
    const sdate = new Date(startDate);
    console.log("sdate", sdate);
    const edate = new Date(endDate);
    edate.setHours(23, 59, 59);
    console.log("ldate", edate);

    const filteredDocuments = documentView.filter((data) => {
      const transactionDate = new Date(data.createdAt);
      // console.log('st', transactionDate)
      return transactionDate >= sdate && transactionDate <= edate;
    });

    const filteredWithdraws = withdrawView.filter((data) => {
      const transactionDate = new Date(data.createdAt);
      // console.log('end', transactionDate)
      return transactionDate >= sdate && transactionDate <= edate;
    });

    setDocumentFilter(filteredDocuments);
    setWithdrawFilter(filteredWithdraws);
    console.log(outerSelect);
  };

  useEffect(() => {
    TransactionSercvice.depositView(auth.user).then((res) =>(
      setDocumentView(res.data.deposits),
      setTotalDeposit(res.data.totalDeposits)
    )
     
    );
    TransactionSercvice.withdrawView(auth.user).then((res) =>(
      setWithdrawView(res.data.withdraws),
      setTotalWithdraw(res.data.totalWithdraws)
    )
    );
  }, [auth]);
  
  console.log("Deposit", documentView);
  console.log("totalDeposit", totalDeposit);
  console.log("Withdraw", withdrawView);
  console.log("TotalWithdraw", totalWithdraw);
  console.log("This is Auth=====> ", auth);

  const TotalBlance=totalDeposit-totalWithdraw;
  const handleLogout = () => {
    const response = true;
    if (response) {
      toast.success("Logout successfully");
      auth.logout();
      nav("/");
    }

    console.log("Logged out");
  };
  

  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);
    setOuterSelect(true);
    console.log(outerSelect);
  };

  return (
    <div className="main">
      {/* Top Div */}
      {/* <nav className="navbar navbar-light bg-light">00
        <div className="container-fluid">
          <a class="navbar-brand">
            <b>Total Balance:</b>
            <b style={{
    textShadow: '2px 2px 4px #3f5efb',
    transform: 'translateZ(0)',
    display: 'inline-block',
    display: 'inline-block',
    color: '#ff0034'
    
  }}>&nbsp;₹&nbsp;{TotalBlance}</b>
          </a>
          <form className="d-flex">
            <span
              className="input-group-text"
              style={{ backgroundColor: "transparent", border: "0"}}
            >
              <FontAwesomeIcon icon={faUser} />
            </span>
            <span
              className="input-group-text mr-1"
              style={{ backgroundColor: "transparent", border: "0"}}
            >
              Hi! Administrator
            </span>
            <button
              className=" btn btn-danger"
              type="submit"
              onClick={handleLogout}
            >
              Logout
            </button>
          </form>
        </div>
      </nav> */}
      
      {/* This is the Main Card */}
      <div
        className="card card-body rounded-1 main "
        // style={{ backgroundImage: gradient }}
      >
        <div className="d-flex mt-5 mt-5 ml-5 pt-5 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2"> View <FaEye /></h6>
          <select
            className="form-control mx-3 w-25"
            value={select || ""}
            autoComplete="off"
            onChange={handleChange}
            style={{
              boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
              border: "0.5px solid black",
              borderRadius: "6px",
            }}
          >
            <option className="d-flex" value="deposit"><b>Deposit</b></option>
            <option className="d-flex" value="withdraw"><b>Withdraw</b></option>
          </select>
        </div>
        <div className="d-flex mt-2 pl-5 justify-content-center">
          <p className="fw-bold fs-6 text-nowrap mt-1"><FaFilter /></p>

          <div className="d-flex gap-2 justify-content-center w-25 ms-5">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="form-control datepicker-with-icon input-group input-group-sm"
              placeholderText="Start Date"
              dateFormat="dd/MM/yyyy"
            />


            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="form-control datepicker-with-icon input-group input-group-sm "
              placeholderText="End Date"
              dateFormat="dd/MM/yyyy"
            />

            <div >
              {" "}
              <button
                type="button"
                className="btn btn-dark"
                style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
                onClick={handelDate}
              >
                Filter
              </button>
            </div>
          </div>
        </div>

        {outerSelect ? (
          <>
            {" "}
            {select === "deposit" ? (
              <div className=" container mt-5">
                {/* This is for Deposit Card Normal View */}
                <div
                  className="card  rounded-2 mb-2"
                  style={{
                    boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
                    backgroundImage:
                      "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
                  }}
                >
                  <div className="card-body">
                    <div className="row">
                      <h4 className="col fs-6">Date</h4>
                      <h4 className="col fs-6">Amount</h4>
                      <h4 className="col fs-6"> Id</h4>
                      <h4 className="col fs-6">Gateway</h4>
                    </div>
                  </div>
                </div>

                {documentView.length > 0 ? (
                 documentView.map((data, i) => {
                   
                    return (
                      <div
                        className="card rounded-2"
                        style={{
                          transition: "transform 0.3s",
                          transform: "scale(1)",
                          boxShadow: "20px 3px 22px 1px rgba(0, 0, 0, 0.36)"
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.01)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }} 
                      >
                        <div className="card-body">
                          <div className="row">
                            <p className="col fs-6">
                              {new Date(data.createdAt).toLocaleString(
                                "default",
                                {
                                  month: "long",
                                }
                              )}{" "}
                              {new Date(data.createdAt).getDate()}
                            </p>
                            <p className="col fs-6">₹&nbsp;{data.depositAmount}</p>
                            <p className="col fs-6 text-break">
                              {data.transactionID}
                            </p>
                            <p className="col fs-6">{data.paymentMethod}</p>
                          </div>
                          <Link to={`/admindash/${data._id}`} className="col">
                            <button type="button" className="btn btn-primary">
                              <FontAwesomeIcon
                                icon={faEdit}
                                data-toggle="modal"
                                data-target="#exampleModalCenter"
                              />
                            </button>
                          </Link>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h1 className="text-center">No Transaction Found</h1>
                )}
              </div>
            ) : (
              // This is for Withdraw Card Normal View

              <div className="container mt-5">
                <div
                  className="card  rounded-2 mb-2"
                  style={{
                    boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
                    backgroundImage:
                      "linear-gradient(90deg, rgba(251,60,60,1) 0%, rgba(246,171,243,1) 50%, rgba(251,60,60,1) 100%)",
                  }}
                >
                 <div className="card-body">
                    <div className="row">
                      <h4 className="col fs-6">Date</h4>
                      <h4 className="col fs-6">Amount</h4>
                      <h4 className="col fs-6"> Id</h4>
                      <h4 className="col fs-6">Gateway</h4>
                    </div>
                  </div>
                </div>

                {withdrawView.length > 0 ? (
                  withdrawView.map((data, i) => {
                    return (
                      <div
                        className="card rounded-2"
                        style={{
                          transition: "transform 0.3s",
                          transform: "scale(1)",
                          boxShadow: "20px 3px 22px 1px rgba(0, 0, 0, 0.36)"
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.01)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        <div className="card-body">
                          <div className="row">
                            <p className="col fs-6">
                              {new Date(data.createdAt).toLocaleString(
                                "default",
                                {
                                  month: "long",
                                }
                              )}{" "}
                              {new Date(data.createdAt).getDate()}
                            </p>
                            <p className="col fs-6">₹&nbsp;{data.withdrawAmount}</p>
                            <p className="col fs-6 text-break">{data.transactionID}</p>
                            <p className="col fs-6 ">{data.paymentMethod}</p>
                          </div>
                          
                            <Link to={`/admindash/${data._id}`} className="col">
                              <button type="button" class="btn btn-primary">
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                />
                              </button>
                            </Link>
                         
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h1>No Transaction Found</h1>
                )}
                {withdrawView.length === 0 && (
                  <h1 className="text-center">No Withdraws Found</h1>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            {" "}
            {select === "deposit" ? (
              <div className="  container mt-5">
                {/* This is for Deposit Card Filter View */}
                <div
                  className="card  rounded-2 mb-2"
                  style={{
                    boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
                    backgroundImage:
                      "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
                  }}
                >
                  <div className="card-body">
                    <div className="row">
                      <h4 className="col fs-6">Date</h4>
                      <h4 className="col fs-6">Amount</h4>
                      <h4 className="col fs-6"> Id</h4>
                      <h4 className="col fs-6">Gateway</h4>
                    </div>
                  </div>
                </div>

                {documentFilter.length > 0 ? (
                  documentFilter.map((data, i) => {
                    return (
                      <div
                        className="card rounded-2"
                        style={{
                          transition: "transform 0.3s",
                          transform: "scale(1)",
                          boxShadow: "20px 3px 22px 1px rgba(0, 0, 0, 0.36)"
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.01)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        <div className="card-body">
                          <div className="row">
                            <p className="col fs-6 ">
                              {new Date(data.createdAt).toLocaleString(
                                "default",
                                {
                                  month: "long",
                                }
                              )}{" "}
                              {new Date(data.createdAt).getDate()}
                            </p>
                            <p className="col fs-6 ">₹&nbsp;{data.depositAmount}</p>
                            <p className="col fs-6 text-break ">{data.transactionID}</p>
                            <p className="col fs-6">{data.paymentMethod}</p>
                          </div>
                          
                            <Link to={`/admindash/${data._id}`} className="col">
                              <button type="button" class="btn btn-primary">
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                />
                              </button>
                            </Link>
                          
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h1 className="text-center">No Transaction Found</h1>
                )}
              </div>
            ) : (
              // This is for Withdraw Card Filter View

              <div className=" container mt-5">
                <div
                  className="card rounded-2 mb-2"
                  style={{
                    boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
                    backgroundImage:
                      "linear-gradient(90deg, rgba(251,60,60,1) 0%, rgba(246,171,243,1) 50%, rgba(251,60,60,1) 100%)",
                  }}
                >
                  <div className="card-body">
                    <div className="row">
                      <h4 className="col fs-6">Date</h4>
                      <h4 className="col fs-6">Amount</h4>
                      <h4 className="col fs-6"> Id</h4>
                      <h4 className="col fs-6">Gateway</h4>
                    </div>
                  </div>
                </div>

                {withdrawFilter.length > 0 ? (
                  withdrawFilter.map((data, i) => {
                    return (
                      <div
                        className="card rounded-2"
                        style={{
                          transition: "transform 0.3s",
                          transform: "scale(1)",
                          boxShadow: "20px 3px 22px 1px rgba(0, 0, 0, 0.36)"
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.01)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        <div className="card-body">
                          <div className="row">
                            <p className="col fs-6">
                              {new Date(data.createdAt).toLocaleString(
                                "default",
                                {
                                  month: "long",
                                }
                              )}{" "}
                              {new Date(data.createdAt).getDate()}
                            </p>
                            <p className="col fs-6 ">₹&nbsp;{data.withdrawAmount}</p>
                            <p className="col fs-6 text-break">{data.transactionID}</p>
                            <p className="col fs-6 ">{data.paymentMethod}</p>
                          </div>
                          
                            <Link to={`/admindash/${data._id}`} className="col">
                              <button type="button" class="btn btn-primary">
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                />
                              </button>
                            </Link>
                         
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h1  className="text-center">No Transaction Found</h1>
                )}
                {/* {withdrawFilter.length === 0 && (
                  <h1 className="text-center">No Withdraws Found</h1>
                )} */}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDash;
