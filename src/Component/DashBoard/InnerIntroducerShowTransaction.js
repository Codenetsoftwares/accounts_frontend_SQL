import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
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
import {
  faDeleteLeft,
  faDownLeftAndUpRightToCenter,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FaFilter } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./AdminDash.css";
import TopNavbar from "../Sidebar/TopNavbar";
import AccountService from "../../Services/AccountService";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import EditTransaction from "../Modal/EditTransaction";
import { CSVLink } from "react-csv";

const InnerIntroducerShowTransaction = ({ Transaction }) => {
  console.log("TTT===>>>>>", Transaction);
  return (
    <div>
      <div
        class="modal fade bd-example-modal-lg InnerIntroducerShowTransaction"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                All Transactions
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="card-body">
               
                  <small>
                    <small>
                      {/* Normal View */}
                      <table class="table table-bordered  table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl w-auto">
                        {/* This is for Deposit Card Normal View */}
                        {/* <div
            className="card  rounded-2 mb-2"
            style={{
              boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
              backgroundImage:
                "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
            }}
          > */}
                        <thead className="table-success">
                          <tr align="center" bgcolor="green" className="fs-6">
                            <th scope="col fs-6" className="text-primary">
                              Date <br />&<br /> Time
                            </th>
                            <th
                              scope="col text-break fs-6"
                              className="text-primary"
                            >
                              Amount
                            </th>
                            <th
                              scope="col text-break fs-6"
                              className="text-primary"
                            >
                              Transaction Id
                            </th>
                            <th
                              scope="col text-break fs-6"
                              className="text-primary"
                            >
                              Transaction Type
                            </th>
                            <th scope="col fs-6" className="text-primary">
                              Gateway
                            </th>
                            <th scope="col fs-6" className="text-primary">
                              CreatedBy
                            </th>

                            <th scope="col" className="text-primary">
                              Bank
                            </th>
                            <th scope="col" className="text-primary">
                              Website
                            </th>
                            {/* <th scope="col text-break" className="text-primary">
                              Remarks
                            </th> */}
                          </tr>
                        </thead>
                        {/* </div> */}
                        <tbody>
                          {Transaction.length > 0 ? (
                            Transaction.map((data, i) => {
                              return (
                                <tr align="center" className="fs-6">
                                  <td>
                                    {" "}
                                    {new Date(data.createdAt).toLocaleString(
                                      "default"
                                    )}{" "}
                                  </td>
                                  <td className="text-break">
                                    {data.amount && (
                                      <p className="col fs-6">
                                        ₹&nbsp;{data.amount}
                                      </p>
                                    )}
                                    {data.depositAmount && (
                                      <p className="col fs-6">
                                        ₹&nbsp;{data.depositAmount}
                                      </p>
                                    )}
                                    {data.withdrawAmount && (
                                      <p className="col fs-6">
                                        ₹&nbsp;{data.withdrawAmount}
                                      </p>
                                    )}
                                  </td>
                                  <td>
                                    {data.transactionID && (
                                      <p className="col fs-6 text-break">
                                        {data.transactionID}
                                      </p>
                                    )}
                                    {data.depositAmount && (
                                      <p className="col fs-6 text-break">N.A</p>
                                    )}
                                    {data.withdrawAmount && (
                                      <p className="col fs-6 text-break">N.A</p>
                                    )}
                                  </td>
                                  <td>
                                    {data.transactionType && (
                                      <p className="col fs-6 text-break">
                                        {data.transactionType}
                                      </p>
                                    )}
                                  </td>
                                  <td>
                                    {data.paymentMethod && (
                                      <p className="col fs-6">
                                        {data.paymentMethod}
                                      </p>
                                    )}
                                    {data.depositAmount && (
                                      <p className="col fs-6 text-break">N.A</p>
                                    )}
                                    {data.withdrawAmount && (
                                      <p className="col fs-6 text-break">N.A</p>
                                    )}
                                  </td>
                                  <td className="text-break">
                                    {data.subAdminName}
                                  </td>

                                  <td>
                                    <p className="col fs-6">
                                      {data.bankName ? data.bankName : "N.A"}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="col fs-6 text-break">
                                      {data.websiteName
                                        ? data.websiteName
                                        : "N.A"}
                                    </p>
                                  </td>

                                  {/* <td>{data.remarks}</td> */}
                                </tr>
                              );
                            })
                          ) : (
                            <h1 className="text-center">
                              No Transaction Found
                            </h1>
                          )}
                        </tbody>
                      </table>
                    </small>
                  </small>
                
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              {/* <button type="button" class="btn btn-primary">Send message</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnerIntroducerShowTransaction;
