import React, { useState, useEffect, useCallback } from "react";
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
  faUserEdit,
  faMinus,
  faPlus,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import LiveBalanceIntroducer from "../Modal/LiveBalanceIntroducer";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";
import TransactionSercvice from "../../Services/TransactionSercvice";
import IntroducerTransaction from "../Modal/IntroducerTransaction";
import IntroducerPayment from "./IntroducerPayment";
import Pagination from "../Pagination";
import SingleCard from "../../common/singleCard";
import GridCard from "../../common/gridCard";
import { debounce } from "lodash";

import IntroducerDepositTransaction from "../Modal/IntroducerDepositTransaction";
import IntroducerWithdrawTransaction from "../Modal/IntroducerWithdrawTransaction";
import "./IntroducerProfile.css";
import IntroducerProfileView from "../Modal/IntroducerProfileView";

import { Oval } from "react-loader-spinner"; // Import the Oval spinner
import InfiniteScroll from "react-infinite-scroll-component";
import NewPagination from "../NewPagination";
import FullScreenLoader from "../FullScreenLoader";

const IntroducerProfile = ({ data }) => {
  const auth = useAuth();
  const [users, setUsers] = useState([]);
  const [ID, setID] = useState([]);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const [introducerName, setIntroducerName] = useState("");
  const [txType, setTxType] = useState("");
  const [search, setSearch] = useState("");
  // const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [txType1, setTxType1] = useState("");
  const [profileView, setProfileView] = useState("");
  const RawFilterData = [];
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const pageLimit = 9;

  const selectPageHandler = (selectedPage) => {
    console.log(selectedPage);
    setPage(selectedPage);
  };

  const startIndex = Math.min((page - 1) * pageLimit + 1);
  const endIndex = Math.min(page * pageLimit, totalData);

  console.log("====>>>> line 52", introducerName);
  console.log("=========>>> line 53", users);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (!event.target.value) {
      setUsers([]);
    }
  };

  const handleIntroducerTx = (e, data, id) => {
    console.log(data);
    // console.log(IntroducerName);
    setTxType1(data);
    setID(id);

    // Find the introducerName based on the introId
    const selectedUser = users.find((user) => user.introId === id);
    if (selectedUser) {
      setIntroducerName(selectedUser.userName);
    }
  };

  const handelstatement = (e, id) => {
    navigate(`/introducerstatement/${id}`);
  };
  const fetchData = async (searchTerm = search, newPage = page) => {
    setIsLoading(true);
    try {
      const res = await AccountService.Introducerprofile(
        newPage,
        searchTerm,
        pageLimit,
        auth.user
      );

      const filteredData = res.data.data.filter((item) => item !== null);
      const usernames = filteredData.map((item) => item.userName);

      console.log("=====>> line 80", usernames);

      setIntroducerName((prevNames) =>
        searchTerm.length > 0 ? usernames : [...prevNames, ...usernames]
      );

      setUsers(res?.data?.data);

      setTotalData(res?.data?.pagination?.totalItems);
      setTotalPage(res?.data?.pagination?.totalPages);
      setHasMore(newPage < res.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLiveBl = (e, ID) => {
    e.preventDefault();
    setID(ID);
  };

  // Debounced search handler using lodash
  const debouncedSearchHandler = useCallback(
    debounce((searchTerm) => {
      setPage(1); // Reset page to 1 on new search
      fetchData(searchTerm, 1);
    }, 1000),
    [search] // Empty dependency array ensures stable function
  );

  useEffect(() => {
    debouncedSearchHandler(search);

    // Cleanup function to cancel debounce on unmount or change
    return () => {
      debouncedSearchHandler.cancel();
    };
  }, [search, debouncedSearchHandler]);

  const fetchMoreData = () => {
    if (hasMore) {
      const nextPage = page + 1;
      setPage(nextPage); // Increment page number
      fetchData(search, nextPage);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleCardClick = (id) => {
    setActiveCard(id);
    setTimeout(() => setActiveCard(null), 300); // Reset the animation class after animation duration
  };

  const handelUserEdit = (e, id) => {
    navigate(`/singleintroducer/${id}`);
  };

  const handelNetwork = (e, id) => {
    navigate(`/innerintroducer/${id}`);
  };

  const handleProfileView = (id) => {
    const selectedUser = users.find((user) => user.introId === id);
    setProfileView(selectedUser);
  };

  return (
    <div className="bg-white">
      <FullScreenLoader show={isLoading} />
      <div
        className="card text-center mt-2 mr-5 ml-5"
        style={{
          backgroundColor: "#e6f7ff",
          position: "relative",
        }}
      >
        {/* <h1 className="d-flex justify-content-center fs-3 text-bold">INTRODUCER PROFILE</h1> */}
        <SingleCard
          style={{
            backgroundColor: "#e6f7ff",
            position: "relative",
            width: "100%",
          }}
        >
          <div className="card-header-pill text-bold d-flex">
            <div className="flex-grow-1  ml-4 mr-5">
              <input
                type="search"
                className="form-control rounded-pill shadow"
                placeholder="Search User by Name"
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>
        </SingleCard>
        <div className="card-body  mt-2 mb-3">
          <SingleCard className="mb-2 p-4">
            <GridCard columns={3}>
              {users && users.length > 0 ? (
                users.map((user, index) => (
                  <div
                    key={user.introId}
                    className="col d-flex justify-content-center align-items-center"
                    onMouseEnter={() => setHoveredCard(user.introId)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      className={`card d-flex justify-content-between ${hoveredCard === user.introId ? "card-hover-shadow" : ""
                        }`}
                      style={{
                        borderRadius: "20px",
                        height: "200px",
                        width: "95%",
                        position: "relative",
                      }}
                      onClick={() => handleCardClick(user.introId)}
                    >
                      <div className="card-body">
                        <button
                          type="button"
                          className="btn btn-steel-blue btn-sm btn-hover-zoom fs-4"
                          data-toggle="modal"
                          data-target="#introducerProfile"
                          onClick={() => {
                            handleProfileView(user.introId);
                          }}
                        >
                          <FontAwesomeIcon icon={faUser} className="add-icon" />
                        </button>
                        <p
                          className="font-weight-bold fs-4 text-truncate mt-3"
                          style={{ color: "#708090" }}
                        >
                          {user.userName}
                        </p>
                        <div className="container">
                          <div className="row g-1 justify-content-center mt-3">
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                title=" NetWork"
                                data-toggle="modal"
                                data-target="#withdrawModal"
                                onClick={(e) => {
                                  handleIntroducerTx(
                                    e,
                                    "Withdraw",
                                    user.introId
                                  );
                                }}
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </button>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                title=" NetWork"
                                data-toggle="modal"
                                data-target="#depositModal"
                                onClick={(e) => {
                                  handleIntroducerTx(
                                    e,
                                    "Deposit",
                                    user.introId
                                  );
                                }}
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                title=" NetWork"
                                onClick={(e) => {
                                  handelstatement(e, user.introId);
                                }}
                              >
                                <FontAwesomeIcon icon={faFileAlt} />
                              </button>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                title=" Edit Profile"
                                onClick={(e) => {
                                  handelUserEdit(e, user.introId);
                                }}
                              >
                                <FontAwesomeIcon icon={faUserEdit} />
                              </button>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                title=" NetWork"
                                onClick={(e) => {
                                  handelNetwork(e, user.introId);
                                }}
                              >
                                <FontAwesomeIcon icon={faNetworkWired} />
                              </button>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                data-toggle="modal"
                                data-target="#LiveBalance"
                                title="Total Profit Lifetime"
                                onClick={(e) => {
                                  handleLiveBl(e, user.introId);
                                }}
                              >
                                <FontAwesomeIcon icon={faBalanceScale} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 d-flex justify-content-center align-items-center">
                  <p className="fs-4" style={{ color: "#708090" }}>
                    No Introducer Found
                  </p>
                </div>
              )}
            </GridCard>
            {users.length > 0 && <NewPagination
              currentPage={page}
              totalPages={totalPage}
              handlePageChange={selectPageHandler}
              startIndex={startIndex}
              endIndex={endIndex}
              totalData={totalData}
            />}

          </SingleCard>
        </div>
        {ID && !!ID.length && <LiveBalanceIntroducer ID={ID} />}
        <IntroducerTransaction
          TxType={txType}
          IntroducerName={introducerName}
        />
        {txType1 === "Deposit" && (
          <IntroducerDepositTransaction
            IntroducerName={introducerName}
            ID={ID}
          />
        )}
        {txType1 === "Withdraw" && (
          <IntroducerWithdrawTransaction
            IntroducerName={introducerName}
            ID={ID}
          />
        )}
        {profileView && <IntroducerProfileView data={profileView} />}
      </div>
    </div>
  );
};

export default IntroducerProfile;
