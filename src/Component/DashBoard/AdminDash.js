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
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

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
    TransactionSercvice.depositView(auth.user).then((res) =>
      setDocumentView(res.data.deposits)
    );
    TransactionSercvice.withdrawView(auth.user).then((res) =>
      setWithdrawView(res.data.withdraws)
    );
  }, [auth]);

  console.log("Deposit", documentView);
  console.log("Withdraw", withdrawView);
  console.log("This is Auth=====> ", auth);

  const handleLogout = () => {
    const response = true;
    if (response) {
      toast.success("Logout successfully");
      auth.logout();
      nav("/");
    }

    console.log("Logged out");
  };
  const gradient =
    " linear-gradient(279deg, rgba(255,114,53,1) 0%, rgba(250,255,53,1) 52%, rgba(255,114,53,1) 100%)";

  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);
    setOuterSelect(true);
    console.log(outerSelect);
  };

  return (
    <div className="main" >
      {/* Top Div */}
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <p class="navbar-brand">Welcome</p>
          <form className="d-flex">
            <span
              className="input-group-text"
              style={{ backgroundColor: "transparent", border: "0" }}
            >
              <FontAwesomeIcon icon={faUser} />
            </span>
            <span
              className="input-group-text mr-1"
              style={{ backgroundColor: "transparent", border: "0" }}
            >
              Hi! Administrator
            </span>
            <button
              className="btn btn-info "
              type="submit"
              onClick={handleLogout}
            >
              Logout
            </button>
          </form>
        </div>
      </nav>
      {/* This is the Main Card */}
      <div
        className="card card-body rounded-1 "
        style={{ backgroundImage: gradient }}
      >
        <div className="d-flex mt-5">
          <h6 className="fw-bold">Select View Mode:</h6>
          <select
            className="form-control"
            value={select || ""}
            autoComplete="off"
            onChange={handleChange}
            style={{boxShadow:' 17px 15px 27px -9px rgba(0,0,0,0.41)', border:'0.5px solid black', borderRadius:'6px'}}
          >
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>
        </div>
        <div className="d-flex mt-2">
          <h6 className="fw-bold">Filter By Date:</h6>


<div className="d-flex  ms-4" >
<div className="input-group input-group-sm" style={{boxShadow:'17px 15px 27px -9px rgba(0, 0, 0, 0.41)', border:'0.5px solid black', borderRadius:'6px'}}>
  
  <DatePicker
    selected={startDate}
    onChange={(date) => setStartDate(date)}
    className="form-control datepicker-with-icon"
    placeholderText="Start Date"
    dateFormat="dd/MM/yyyy"
  />
</div>

<div className="input-group input-group-sm ml-1" style={{boxShadow:'17px 15px 27px -9px rgba(0, 0, 0, 0.41)' , border:'0.5px solid black', borderRadius:'6px'}} >
  <DatePicker
    selected={endDate}
    onChange={(date) => setEndDate(date)}
    className="form-control datepicker-with-icon"
    placeholderText="End Date"
    dateFormat="dd/MM/yyyy"
  />
</div>

            <button
              type="button"
              className="btn btn-outline-dark ml-1"
              style={{boxShadow:'17px 15px 27px -9px rgba(0, 0, 0, 0.41)'}}
              onClick={handelDate}
            >
              <small>Filter</small>
            </button>
          </div>
        </div>

        {outerSelect ? (
          <>
            {" "}
            {select === "deposit" ? (
              <div className=" mt-5">
                {/* This is for Deposit Card Normal View */}
                <div
                  className="card  rounded-2 mb-2"
                  style={{
                    boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
                    backgroundColor: '#C9FC92'
                   
                  }}
                >
                  <div className="card-body">
                    <div className="row" >
                      <h4 className="col">Date</h4>
                      <h4 className="col">Amount</h4>
                      <h4 className="col">Transaction Id</h4>
                    </div>
                  </div>
                </div>

                {documentView.length > 0 ? (
                  documentView.map((data, i) => {
                    console.log("Data Id",data._id);
                    return (
                      <div
                        className="card rounded-2"
                        style={{
                          transition: "transform 0.3s",
                          transform: "scale(1)",
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
                            <p className="col ">
                              {new Date(data.createdAt).toLocaleString(
                                "default",
                                {
                                  month: "long",
                                }
                              )}{" "}
                              {new Date(data.createdAt).getDate()}
                            </p>
                            <p className="col ">{data.depositAmount}</p>
                            <p className="col ">{data.transactionID}</p>   
                          </div>
                          <div className="col" >
                          <Link to={`/admindash/${data._id}`} className="col">
                              <button type="button" class="btn btn-primary">
                              <FontAwesomeIcon icon={faEdit} data-toggle="modal" data-target="#exampleModalCenter"/>
                              </button>
                         </Link>
                         </div>
                        </div>
                       
                      </div>
                    );
                  })
                ) : (
                  <h1>No Transaction Found</h1>
                )}
              </div>
            ) : (
              // This is for Withdraw Card Normal View

              <div className="  mt-5">
                <div className="card rounded-2 mb-2" style={{
                    boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
                    backgroundColor:'#E6BE8F'
                  }}>
                  <div className="card-body">
                    <div className="row">
                      <h4 className="col">Date</h4>
                      <h4 className="col">Amount</h4>
                      <h4 className="col">Transaction Id</h4>
                    </div>
                  </div>
                </div>

                {withdrawView.length > 0 ? (
                  withdrawView.map((data, i) => {
                    return (
                      <div className="card rounded-2" 
                      style={{
                        transition: "transform 0.3s",
                        transform: "scale(1)",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.01)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}>
                        <div className="card-body">
                          <div className="row">
                            <p className="col ">
                              {new Date(data.createdAt).toLocaleString(
                                "default",
                                {
                                  month: "long",
                                }
                              )}{" "}
                              {new Date(data.createdAt).getDate()}
                            </p>
                            <p className="col">{data.withdrawAmount}</p>
                            <p className="col">{data.transactionID}</p>
                            <Link to={`/admindash/${data._id}`} className="col">
                              <button type="button" class="btn btn-primary">
                                Edit
                              </button>
                            </Link>
                          </div>
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
              <div className=" mt-5">
               {/* This is for Deposit Card Filter View */}
                <div
                  className="card  rounded-2 mb-2"
                  style={{
                    boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
                    backgroundColor: '#C9FC92'
                   
                  }}
                >
                  <div className="card-body">
                    <div className="row" >
                      <h4 className="col">Date</h4>
                      <h4 className="col">Amount</h4>
                      <h4 className="col">Transaction Id</h4>
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
                          <p className="col ">
                              {new Date(data.createdAt).toLocaleString(
                                "default",
                                {
                                  month: "long",
                                }
                              )}{" "}
                              {new Date(data.createdAt).getDate()}
                            </p>
                            <p className="col ">{data.depositAmount}</p>
                            <p className="col ">{data.transactionID}</p>
                            <Link to={`/admindash/${data._id}`} className="col">
                              <button type="button" class="btn btn-primary">
                                Edit
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h1>No Transaction Found</h1>
                )}
              </div>
            ) : (
              // This is for Withdraw Card Filter View 

              <div className="  mt-5">
                <div className="card rounded-2 mb-2" style={{
                    boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
                    backgroundColor:'#E6BE8F'
                  }}>
                  <div className="card-body">
                    <div className="row">
                      <h4 className="col">Date</h4>
                      <h4 className="col">Amount</h4>
                      <h4 className="col">Transaction Id</h4>
                    </div>
                  </div>
                </div>

                {withdrawFilter.length > 0 ? (
                  withdrawFilter.map((data, i) => {
                    return (
                      <div className="card rounded-2" 
                      style={{
                        transition: "transform 0.3s",
                        transform: "scale(1)",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.01)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}>
                        <div className="card-body">
                          <div className="row">
                            <p className="col ">
                              {new Date(data.createdAt).toLocaleString(
                                "default",
                                {
                                  month: "long",
                                }
                              )}{" "}
                              {new Date(data.createdAt).getDate()}
                            </p>
                            <p className="col ">{data.withdrawAmount}</p>
                            <p className="col ">{data.transactionID}</p>
                            <Link to={`/admindash/${data._id}`} className="col">
                              <button type="button" class="btn btn-primary">
                                Edit
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h1>No Transaction Found</h1>
                )}
                {withdrawFilter.length === 0 && (
                  <h1 className="text-center">No Withdraws Found</h1>
                )}
              </div>
            )}
          </>
        )}
      </div>
      
    </div>
  );
};

export default AdminDash;
