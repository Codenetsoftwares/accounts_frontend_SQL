import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
import { useAuth } from "../../Utils/Auth";
import { useParams } from "react-router";
import AccountService from "../../Services/AccountService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFilter } from "react-icons/fa";

const WebsiteStatement = () => {

  const { id } = useParams();
  const auth = useAuth();
  const [Manualstmnt, SetManualstmnt] = useState([]);
  const [Userstmnt, SetUserstmnt] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [documentView, setDocumentView] = useState([]);
  const [documentFilter, setDocumentFilter] = useState([]);
  const [outerSelect, setOuterSelect] = useState(true);
  console.log("This is Website Name",id);
 


  const handleDate = () => {
    setOuterSelect(false);
    const sdate = new Date(startDate);
    const edate = new Date(endDate);
    edate.setHours(23, 59, 59);

    const filteredDocuments = documentView.filter((data) => {
      const transactionDate = new Date(data.createdAt);
      return transactionDate >= sdate && transactionDate <= edate;
    });

    setDocumentFilter(filteredDocuments);
  };

  const handlereset = () => {
    setOuterSelect(true);
  };
 
 
 
 
 
 
 
 
  useEffect(() => {
    AccountService.GetWebsiteStateMent(id, auth.user).then((res) =>
    SetManualstmnt(res.data)
    );
  }, [id, auth]);

  useEffect(() => {
    AccountService.GetWebsiteSmmry(id, auth.user).then((res) =>
      SetUserstmnt(res.data)
    );
  }, [id, auth]);

  console.log("Website Names Manual =>>>", Manualstmnt);
  console.log("Website Names User =>>>", Userstmnt);
  return (
    <div className="container-fuid">
    <div className="container mt-5">
      <div className="d-flex mt-2 pl-5 justify-content-center">
        <p className="fw-bold fs-6 text-nowrap mt-1">
          <FaFilter />
        </p>
        <div className="d-flex gap-2 justify-content-center w-50 ms-5">
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
            className="form-control datepicker-with-icon input-group input-group-sm"
            placeholderText="End Date"
            dateFormat="dd/MM/yyyy"
          />
          <div>
            <button
              type="button"
              className="btn btn-dark"
              style={{
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
              }}
              onClick={handleDate}
            >
              Filter
            </button>
            <button
              type="button"
              className="btn btn-dark"
              style={{
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
              }}
              onClick={handlereset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

          <div className="card-body">
            <div className="row">
              <h4 className="col fs-6">Date</h4>
              <h4 className="col fs-6">Before Balance</h4>
              <h4 className="col fs-6">Current Balance</h4>
              <h4 className="col fs-6">Name</h4>
              <h4 className="col fs-6">CreatedBy</h4>
              <h4 className="col fs-6">SubAdmin ID</h4>
              <h4 className="col fs-6">subAdminName</h4>
              <h4 className="col fs-6">Transaction Type</h4>
              <h4 className="col fs-6">withdrawAmount</h4>
            </div>
          </div>
          {outerSelect ? (
          <>
            {documentView.length > 0 ? (
              documentView.map((data, i) => (
                <div
                  key={i}
                  className="accordion mb-2"
                  style={{
                    transition: "transform 0.3s",
                    transform: "scale(1)",
                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
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
                        {new Date(data.createdAt).toLocaleString("default", {
                          month: "long",
                        })}{" "}
                        {new Date(data.createdAt).getDate()}
                      </p>
                      <p className="col fs-4">₹&nbsp;{data.Date}</p>
                      <p className="col fs-6 text-break">
                        {data.transactionID}
                      </p>
                      <p className="col fs-6">{data.paymentMethod}</p>
                      <p className="col fs-6 text-break">{data.subAdminId}</p>
                      <p className="col fs-6">{data.userId}</p>
                      <p className="col fs-6">{data.bankName}</p>
                      <p className="col fs-6">{data.websiteName}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-center">No Transaction Found</h1>
            )}
          </>
        ) : (
          <>
            {documentFilter.length > 0 ? (
              documentFilter.map((data, i) => (
                <div
                  key={i}
                  className="accordion mb-2"
                  style={{
                    transition: "transform 0.3s",
                    transform: "scale(1)",
                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
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
                        {new Date(data.createdAt).toLocaleString("default", {
                          month: "long",
                        })}{" "}
                        {new Date(data.createdAt).getDate()}
                      </p>
                      <p className="col fs-6">₹&nbsp;{data.amount}</p>
                      <p className="col fs-6 text-break">
                        {data.transactionID}
                      </p>
                      <p className="col fs-6">{data.paymentMethod}</p>
                      <p className="col fs-6 text-break">{data.subAdminId}</p>
                      <p className="col fs-6">{data.userId}</p>
                      <p className="col fs-6">{data.bankName}</p>
                      <p className="col fs-6">{data.websiteName}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-center">No Transaction Found</h1>
            )}
          </>
        )}


        </div>
      </div>
    
  );
};

export default WebsiteStatement;
