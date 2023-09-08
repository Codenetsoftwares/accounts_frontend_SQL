import React, { useState, useEffect } from "react";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import { useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFilter } from "react-icons/fa";
import { CSVLink } from "react-csv";

const TransactionDetails = () => {
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
    AccountService.userprofile(auth.user)
      .then((res) => {
        setUsers(res.data);
        const userWithId = res.data.find((user) => user._id === id);
        setDocumentView(userWithId.transactionDetail);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [auth, id]);

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
              <CSVLink data={documentView} className="btn btn-success">
                Download Data
              </CSVLink>
            </div>
          </div>
        </div>


        <small>
          <table class="table table-bordered  table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl">

            <thead className="table-success">
              <tr align="center" bgcolor="green" className="fs-6">
                <th scope="col fs-6" className="text-primary">
                  Date
                </th>
                <th scope="col text-break fs-6" className="text-primary">
                  Amount
                </th>
                <th scope="col  fs-6" className="text-primary">
                  Transaction Id
                </th>
                <th scope="col text-break fs-6" className="text-primary">
                  Transaction Type
                </th>
                <th scope="col fs-6" className="text-primary">
                  Gateway
                </th>
                <th scope="col fs-6" className="text-primary">
                  CreatedBy
                </th>
                <th scope="col fs-6" className="text-primary">
                  User Id
                </th>
                <th scope="col" className="text-primary">
                  Bank
                </th>
                <th scope="col" className="text-primary">
                  Website
                </th>

              </tr>
            </thead>


            <tbody>
              {documentView.length > 0 ? (
                documentView.map((data, i) => {
                  return (
                    <tr align="center" className="fs-6">

                      <td >
                        {" "}
                        {new Date(data.createdAt).toLocaleString(
                          "default"
                        )}{" "}
                      </td>

                      <td className="text-break ">
                        {data.amount && (
                          <p className=" fs-4">₹&nbsp;{data.amount}</p>
                        )}
                      </td>
                      <td >
                        {data.transactionID && (
                          <p className=" fs-6 text-break">
                            {data.transactionID}
                          </p>
                        )}
                      </td>
                      <td>
                        {data.transactionType && (
                          <p className="col fs-6 text-break">
                            {data.transactionType}
                          </p>
                        )}
                      </td>

                      <td className="">
                        {data.paymentMethod && (
                          <p className=" fs-6">{data.paymentMethod}</p>
                        )}

                      </td>
                      <td className="">{data.subAdminName}</td>
                      <td className="">
                        {data.paymentMethod && (
                          <p className=" fs-6">{data.userId}</p>
                        )}

                      </td>
                      <td className="">
                        <p className=" fs-6">
                          {data.bankName}
                        </p>
                      </td>
                      <td className="">
                        <p className=" fs-6">
                          {data.websiteName}
                        </p>
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

      </div>
    </div>
  );
};

export default TransactionDetails;
