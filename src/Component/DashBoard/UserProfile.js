import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";
import SingleCard from "../../common/singleCard";
import GridCard from "../../common/gridCard";

import "./UserProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBank,
  faEye,
  faFileAlt,
  faKey,
  faLock,
  faUser,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import UserProfileView from "../Modal/UserProfileView";
import UserResetPass from "../Modal/UserResetPass";
import UserBank from "../Modal/userBank";
import TransactionDetails from "./TransactionDetails";

import { Oval } from "react-loader-spinner"; // Import the Oval spinner
import FullScreenLoader from "../FullScreenLoader";
import NewPagination from "../NewPagination";

const UserProfile = () => {
  const auth = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  // const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [isHovered, setIsHovered] = useState(false); //for user edit icon
  const [profileView, setProfileView] = useState("");
  const [bankViewEdit, setBankViewEdit] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [renderMaster, setRenderMaster] = useState(null);
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

  console.log("======>>> data", users);

  const [username, setUsername] = useState([]); // for reset password
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    setActiveCard(id);
    setTimeout(() => setActiveCard(null), 300); // Reset the animation class after animation duration
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (!event.target.value) {
      setUsers([]);
    }
  };

  const fetchData = async (searchTerm = search, newPage = page) => {
    try {
      setIsLoading(true);
      const res = await AccountService.userprofile(
        newPage,
        pageLimit,
        searchTerm,
        auth.user
      );

      const filteredData = res.data.data.filter((item) => item !== null);

      setUsers(res?.data?.data);
      setHasMore(newPage < res.data.pagination.totalPages);
      setTotalData(res?.data?.pagination?.totalItems);
      setTotalPage(res?.data?.pagination?.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search handler using lodash
  const debouncedSearchHandler = useCallback(
    debounce((searchTerm) => {
      setPage(1); // Reset page to 1 on new search
      fetchData(searchTerm, 1);
    }, 1300),
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

    fetchData(); // Fetch more data when page changes

  }, [page, renderMaster]);

  const handleInnerProfile = (id) => {
    navigate(`/innerprofile`, { state: { page: page, id: id, q: search } });
  };

  const handleProfileView = (gg, d) => {
    console.log(d);

    setProfileView(d);
  };

  const handleResetPassword = (e, username) => {
    console.log("onclick username", username);
    setUsername(username);
  };

  const handleBankVIewEdit = (e, bankid, user) => {
    console.log("onclick of id", bankid);
    setBankViewEdit(bankid);
    setSelectedUser(user);
  };

  const handleTransaction = (e, userData, id) => {
    e.preventDefault();
    console.log("Transaction for user:", userData);

    navigate(`/transactiondetails/${id}`, {});
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
        <SingleCard
          style={{
            backgroundColor: "#e6f7ff",
            position: "relative",
            width: "100%",
          }}
        >
          <div className="card-header-pill text-bold d-flex">
            {/* <button type="button" className="btn btn-primary">

    <SingleCard>
      <div className="m-3">
        <SingleCard>
          <div className="input-group input-group-sm">
            <button type="button" className="btn btn-primary">

              <i className="fas fa-search"></i>
            </button>
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="form-control search-input"
              placeholder="Search User by Name"
              value={search}
              onChange={handleSearch}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
            /> */}

            <div className="flex-grow-1  ml-4 mr-5">
              <input
                type="search"
                className="form-control rounded-pill shadow"
                placeholder="Search User By Name..."
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
                    key={user.userId}
                    className="col d-flex justify-content-center align-items-center"
                    onMouseEnter={() => setHoveredCard(user.userId)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      className={`card d-flex justify-content-between ${hoveredCard === user.userId ? "card-hover-shadow" : ""
                        }`}
                      style={{
                        borderRadius: "20px",
                        height: "200px",
                        width: "95%",
                        position: "relative",
                      }}
                      onClick={() => handleCardClick(user.userId)}
                    >
                      <div className="card-body">
                        <button
                          type="button"
                          className="btn btn-steel-blue btn-sm btn-hover-zoom fs-4"
                          data-toggle="modal"
                          data-target="#exampleModalp"
                          onClick={() => {
                            handleProfileView(user.userId, user);
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
                                onClick={() => {
                                  handleInnerProfile(user.userId);
                                }}
                                title="Profile Edit"
                              >
                                <FontAwesomeIcon
                                  icon={faUserEdit}
                                  className="add-icon"
                                />
                              </button>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                data-toggle="modal"
                                data-target="#modalbank"
                                type="button"
                                className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                onClick={(e) => {
                                  handleBankVIewEdit(e, user.userId, user);
                                }}
                                title="Bank Details & Edit"
                              >
                                <FontAwesomeIcon
                                  icon={faBank}
                                  className="add-icon"
                                />
                              </button>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                onClick={(e) =>
                                  handleTransaction(e, user, user.userId)
                                }
                                title="Transaction Details"
                              >
                                <FontAwesomeIcon
                                  icon={faFileAlt}
                                  className="add-icon"
                                />
                              </button>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                data-toggle="modal"
                                data-target="#modalreset"
                                type="button"
                                className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                onClick={(e) => {
                                  handleResetPassword(e, user.userName);
                                }}
                                title="Reset Password"
                              >
                                <FontAwesomeIcon
                                  icon={faKey}
                                  className="add-icon"
                                />
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
                  <span className="fs-4" style={{ color: "#708090" }}>
                    No Users Found
                  </span>
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
        <UserProfileView user={profileView} />
        <UserResetPass UserName={username} />
        {selectedUser && (
          <UserBank
            bankDetail={selectedUser.Bank_Details}
            upiDetail={selectedUser.Upi_Details}
            paramsid={bankViewEdit}
            setRenderMaster={setRenderMaster}
            setUsers={setUsers}
            fetchData={fetchData}
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
