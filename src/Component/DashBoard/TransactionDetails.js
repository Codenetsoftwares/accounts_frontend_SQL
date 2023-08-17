import React, { useState , useEffect} from "react";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import { useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFilter } from "react-icons/fa";
const TransactionDetails = () => {
    // const [transaction , setTransaction] = useState([]);
  
    const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [documentView, setDocumentView] = useState([]);
  const [documentFilter, setDocumentFilter] = useState([]);
    const [users, setUsers] = useState([]);
    const [outerSelect, setOuterSelect] = useState(true);
    const { id } = useParams();

    const auth = useAuth();

    const handleDate = () => {
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
    
    
        setDocumentFilter(filteredDocuments);
     
        // console.log(outerSelect);
   
    }
    const handlereset=()=>{
setOuterSelect(true);
    }
        useEffect(() => {
        AccountService.userprofile(auth.user)
          .then((res) => {
            setUsers(res.data);
            const userWithId = res.data.find((user) => user._id === id);
            setDocumentView(userWithId.transactionDetail);
          })
          .catch((error) => {
            // Handle error
            console.error("Error fetching user data:", error);
          });
      }, [auth, id]);

    
    //   const TransactionDetails=[foundObject.transactionDetail]

return (
    <div className="container-fuid">
        <div className="  container mt-5"></div>
          <div className="d-flex mt-2 pl-5 justify-content-center">
          <p className="fw-bold fs-6 text-nowrap mt-1">
            <FaFilter />
          </p>

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

            <div>
              {" "}
              <button
                type="button"
                className="btn btn-dark"
                style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
                onClick={handleDate}
              >
                Filter
              </button>
              <button
                type="button"
                className="btn btn-dark"
                style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
                onClick={handlereset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
       
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
                      <h4 className="col fs-6">Transaction Id</h4>
                      <h4 className="col fs-6">Gateway</h4>
                      <h4 className="col fs-6">Transaction Type</h4>
                      {/* <h4 className="col fs-6">CreatedBy</h4> */}
                      {/* <h4 className="col fs-6">User Id</h4> */}
                      {/* <h4 className="col fs-6">Bank</h4> */}
                      {/* <h4 className="col fs-6">Website</h4> */}
                    </div>
                  </div>
                  </div>
        

        {outerSelect?( <>
        {documentView.length > 0 ? (
                  documentView.map((data, i) => {
                    return (
                      <div
                        className="card rounded-2"
                        style={{
                          transition: "transform 0.3s",
                          transform: "scale(1)",
                          boxShadow: "20px 3px 22px 1px rgba(0, 0, 0, 0.36)",
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
                            <p className="col fs-6">₹&nbsp;{data.amount}</p>
                            <p className="col fs-6 text-break">
                              {data.transactionID}
                            </p>
                            <p className="col fs-6">{data.paymentMethod}</p>
                            <p className="col fs-6 text-break">
                              {data.subAdminId}
                            </p>
                            <p className="col fs-6">{data.userId}</p>
                            <p className="col fs-6">{data.bankName}</p>
                            <p className="col fs-6">{data.websiteName}</p>
                          </div>
                          {/* <Link to={`/admindash/${data._id}`} className="col">
                            <button type="button" className="btn btn-primary">
                              <FontAwesomeIcon
                                icon={faEdit}
                                data-toggle="modal"
                                data-target="#exampleModalCenter"
                              />
                            </button>
                          </Link> */}
                        </div>
                      </div>
                     
                        
                    );
                   
                  })
               
                ) : (
                  <h1 className="text-center">No Transaction Found</h1>
                )}
                </>):(<> {documentFilter.length > 0 ? (
                  documentFilter.map((data, i) => {
                    return (
                      <div
                        className="card rounded-2"
                        style={{
                          transition: "transform 0.3s",
                          transform: "scale(1)",
                          boxShadow: "20px 3px 22px 1px rgba(0, 0, 0, 0.36)",
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
                            <p className="col fs-6">₹&nbsp;{data.amount}</p>
                            <p className="col fs-6 text-break">
                              {data.transactionID}
                            </p>
                            <p className="col fs-6">{data.paymentMethod}</p>
                            <p className="col fs-6 text-break">
                              {data.subAdminId}
                            </p>
                            <p className="col fs-6">{data.userId}</p>
                            <p className="col fs-6">{data.bankName}</p>
                            <p className="col fs-6">{data.websiteName}</p>
                          </div>
                          {/* <Link to={`/admindash/${data._id}`} className="col">
                            <button type="button" className="btn btn-primary">
                              <FontAwesomeIcon
                                icon={faEdit}
                                data-toggle="modal"
                                data-target="#exampleModalCenter"
                              />
                            </button>
                          </Link> */}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h1 className="text-center">No Transaction Found</h1>
                )}</>)}
         
 
    </div>
  );
};

export default TransactionDetails;
