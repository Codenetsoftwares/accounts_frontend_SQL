import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUser,
  faNetworkWired,
  faEdit,
  faBalanceScale,
} from "@fortawesome/free-solid-svg-icons";
import LiveBalanceIntroducer from "../Modal/LiveBalanceIntroducer";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";
import TransactionSercvice from "../../Services/TransactionSercvice";
import IntroducerTransaction from "../Modal/IntroducerTransaction";
import IntroducerPayment from "./IntroducerPayment";

const IntroducerProfile = () => {
  const auth = useAuth();
  const [users, setUsers] = useState([]);
  const [ID, setID] = useState([]);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const [introducerName, setIntroducerName] = useState("");
  const [txType, setTxType] = useState("");
  const [page, setPage] = useState(1)
  const [pageNumber, setPageNumber] = useState("")
  // const handelinnerprofile =()=>{
  //   navigate(`/innerprofile/${users._id}`);
  // }

  const handlePage = (page) => {
    setPage(page);
  }

  useEffect(() => {
    AccountService.Introducerprofile(page, auth.user).then((res) => (setUsers(res.data.SecondArray), setPageNumber(res.data.pageNumber))
    );
  }, [auth, page]);
  console.log("users", users);

  const filteredUsers = users.filter((affiliate) => {
    const fullName = affiliate.firstname.toLowerCase();
    return fullName.includes(q.toLowerCase());
  });
  const handleLiveBl = (e, ID) => {
    setID(ID);
  };
  console.log("Live Bl", ID);

  return (
    <div className="m-3">
      <ToastContainer />
      <h1 className="d-flex justify-content-center">Introducer Profile</h1>
      <div class="input-group input-group-sm ">
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input "
          placeholder="Search User by Name"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>

      <ul>
        {filteredUsers.map((users) => (
          <div className="card container-fluid w-75">
            <div className="card-body">
              <p className="text-bold">{users.userName}</p>
              <IntroducerPayment
                IntroducerName={users.userName}
                balance={users.balance.balance}
                duebalance={users.balance.currentDue}
                id={users._id}
              />
              <Link
                to={`/innerintroducer/${users._id}`}
                style={{ cursor: "pointer" }}
              >
                <button type="button" class="btn btn-primary">
                  NetWork &nbsp;
                  <FontAwesomeIcon icon={faNetworkWired} />
                </button>
              </Link>
              <br />
              <Link
                to={`/singleintroducer/${users._id}`}
                style={{ cursor: "pointer" }}
              >
                <button type="button" class="btn btn-info mt-2">
                  Edit Profile &nbsp;
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </Link>
              <br />
              {/* Deposit and Withdraw Part Start */}
              {/* <div>
                <button
                  type="button"
                  class="btn btn-success mt-2"
                  data-toggle="modal"
                  data-target="#IntroTx"
                  onClick={(e) => {
                    handleIntroducerTx(e, users.userName, "Deposit");
                  }}
                >
                  Deposit
                </button>
                &nbsp;&nbsp;
                <button
                  type="button"
                  class="btn btn-danger mt-2"
                  data-toggle="modal"
                  data-target="#IntroTx"
                  onClick={(e) => {
                    handleIntroducerTx(e, users.userName, "Withdraw");
                  }}
                >
                  Withdraw
                </button>
              </div> */}
              {/* Deposit and Withdraw Part End */}

              <button
                type="button"
                class="btn btn-warning mt-2"
                data-toggle="modal"
                data-target="#LiveBalance"
                onClick={(e) => {
                  handleLiveBl(e, users._id);
                }}
              >
                Total Profit Lifetime &nbsp;
                <FontAwesomeIcon icon={faBalanceScale} />
              </button>
            </div>
          </div>
        ))}
      </ul>
      <LiveBalanceIntroducer ID={ID} />
      <IntroducerTransaction TxType={txType} IntroducerName={introducerName} />

      <div className="text-center">
        <span className={`m-3 `}>
          <button
            className={`btn btn-primary rounded-pill ${page === 1 ? "disabled" : ""
              }`}
            onClick={() => {
              page > 1 && handlePage(page - 1);
            }}
          >
            Pre
          </button>
        </span>
        <span className="fs-4">{page}</span>
        <span className={`m-3 `}>
          <button
            className={`btn btn-primary rounded-pill ${page === pageNumber ? "disabled" : ""
              }`}
            onClick={() => {
              handlePage(page + 1);
            }}
          >
            Next
          </button>
        </span>
      </div>

    </div>
  );
};

export default IntroducerProfile;
