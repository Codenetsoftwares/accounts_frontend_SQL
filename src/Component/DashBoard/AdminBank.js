import React, { useState, useEffect } from "react";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faPlus,
  faFileAlt,
  faMinus,
  faEye,
  faStar,
  faTimes,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import InnerBank from "../InnerBank";
import { Link, useNavigate } from "react-router-dom";
import ModalAddBl from "../Modal/ModalAddBl";
import ModalWthBl from "../Modal/ModalWthBl";
import ModalBkdl from "../Modal/ModalBkdl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubAdminBank from "../Modal/SubAdminBank";
import Pagination from "../Pagination";
import ShimmerEffect from "../ShimmerEffect";
import RenewBankPermission from "../Modal/RenewBankPermission";
import GridCard from "../../common/gridCard";
import SingleCard from "../../common/singleCard";
import "./AdminBank.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { customErrorHandler } from "../../Utils/helper";
// import { useParams } from "react-router";
const AdminBank = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [bankName, setBankName] = useState("");
  const [getbankName, setGetBankName] = useState([]);
  const [Id, setId] = useState();
  const [SId, setSId] = useState();
  const [IdWithdraw, setIdWithdraw] = useState();
  const [SubAdmins, setSubAdmins] = useState([]);
  const [documentView, setDocumentView] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState(""); // usestate for search state
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [response, setResponse] = useState({});

  console.log("========>>>> bankName details", getbankName);

  // const { id } = useParams();

  const handleCardClick = (id) => {
    setActiveCard(id);
    setTimeout(() => setActiveCard(null), 300); // Reset the animation class after animation duration
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    AccountService.addbank(
      {
        name: bankName,
      },
      auth.user
    )
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          toast.success("Bank registered successfully!");
          Window.location.reload();
        } else {
          toast.error("Something Went Wrong!!");
        }
      })

      .catch((err) => {
        if (!err.response) {
          alert(err.message);
          return;
        }
      });
    window.location.reload();
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (!event.target.value) {
      setGetBankName([]);
    }
  };

  const handlebankname = (event) => {
    setBankName(event.target.value);
  };

  const handelEditbank = (e, _id) => {
    navigate(`/editbank/${_id}`);
  };

  const handelstatement = (e, accountNumber) => {
    console.log("first", accountNumber);
    navigate(`/bankstatement/${accountNumber}`);
  };

  const handleDeleteBank = (e, id) => {
    e.preventDefault();

    const userConfirmed = window.confirm(
      "Are You Sure You Want to Delete This Bank?"
    );

    if (userConfirmed) {
      // console.log(data)
      AccountService.deletebank({ requestId: id }, auth.user)
        .then((res) => {
          console.log("res", res);
          if (res.status === 201) {
            toast.success(res.data.data.message);
            // setResponse(res.data);
          }
        })
        .catch((error) => {
          toast.error(customErrorHandler(error));
          console.log(error);
          // toast.error(error);
          // alert.error("e.message");
        });
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await AccountService.getbank(auth.user, page, search);
      setGetBankName(
        search.length > 0
          ? res.data.data
          : (prev) => [...prev, ...res.data.data]
      );
      setHasMore(page < res.data.pagination.totalPages);
      setTotalPage(res.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handelId = (id) => {
    setId(id);
  };

  const handelSubAdmin = (SubAdmins, ID) => {
    setSubAdmins(SubAdmins);
    setSId(ID);
  };

  // const handelWithdrawId = (id) => {
  //   setIdWithdraw(id);
  // };

  const handelactive = (ID) => {
    const flag = true;
    const data = {
      isActive: flag,
    };
    AccountService.activeInactiveBank(ID, data, auth.user)
      .then((response) => {
        toast.success(response.data.message);
        const getbankNameUpdated = JSON.parse(JSON.stringify(getbankName))
        getbankNameUpdated.forEach(bank => {
          if (bank.bankId === ID) {
            bank.isActive = !bank.isActive

          }
        })
        setGetBankName(getbankNameUpdated)
      })
      .catch((error) => {
        toast.error(customErrorHandler(error));
      });
  };

  const handelinactive = (ID) => {
    const flag = false;
    const data = {
      isActive: flag,
    };
    AccountService.activeInactiveBank(ID, data, auth.user)
      .then((response) => {
        toast.success(response.data.message);
        const getbankNameUpdated = JSON.parse(JSON.stringify(getbankName))
        getbankNameUpdated.forEach(bank => {
          if (bank.bankId === ID) {
            bank.isActive = !bank.isActive

          }
        })
        setGetBankName(getbankNameUpdated)
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setGetBankName([]);
    fetchData();
  }, [search, response]);

  // for search input field handled from frontend   to be done by serverside
  const fetchMoreData = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment page number
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchData(); // Fetch more data when page changes
    }
  }, [page]);

  console.log("SubAdmins", SubAdmins);

  console.log("getbankName", getbankName);
  return (
    <div className="bg-white">
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
          }}
        >
          <div className="card-header-pill text-bold d-flex ">
            <div className="flex-grow-1 ">
              <input
                type="text"
                className="form-control rounded-pill shadow"
                placeholder="Search Bankname"
                value={search}
                onChange={handleSearch}
              />
            </div>
            <div className="flex-grow-1 d-flex justify-content-end position-relative">
              <h5
                className="mr-5"
                style={{
                  color: "#B0A295", // Matching the background color of the button
                  fontSize: "1.5rem", // Adjust the size to fit well within the header
                  margin: "0", // Remove default margin
                  lineHeight: "2.5rem", // Align vertically with the button
                  fontWeight: "bold", // Make the text thicker
                  fontFamily: "'Abril Fatface', serif ",
                }}
              >
                ADD BANK
              </h5>
              <div
                className="input-icon-web-add position-absolute top-50 translate-middle-y d-flex align-items-center justify-content-center rounded-circle"
                // onClick={handleSubmit}
                data-bs-toggle="modal"
                data-bs-target="#innerbnk"
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  backgroundColor: "#4682b4",
                  color: "#fff",
                  cursor: "pointer",
                  borderRadius: "50%",
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>
          </div>
        </SingleCard>
        <div className="card-body  mt-2 mb-3">
          <SingleCard className="mb-2 p-4">
            <InfiniteScroll
              dataLength={getbankName.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              height={650}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>No more data to load</b>
                </p>
              }
            >
              <br></br>
              <GridCard columns={2}>
                {getbankName.map((data) => (
                  <div
                    key={data.bankId}
                    className="col d-flex justify-content-center align-items-center "
                    onMouseEnter={() => setHoveredCard(data.bankId)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      className={`card d-flex justify-content-between ${hoveredCard === data.bankId ? "card-hover-shadow" : ""
                        }`}
                      style={{
                        borderRadius: "20px",
                        height: "200px",
                        width: "100%",
                        position: "relative",
                      }}
                      onClick={() => handleCardClick(data.bankId)}
                    >
                      <div className="card-body">
                        <p
                          className="font-weight-bold fs-4"
                          style={{ color: "#708090" }}
                        >
                          {data.bankName}
                          <br />
                          <span className="fs-5" style={{ color: "#A9A9A9" }}>
                            Balance: {data.balance}
                          </span>
                        </p>
                        <div className="container">
                          <div className="row g-1 justify-content-center mt-5">
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className={`btn btn-steel-blue btn-sm btn-hover-zoom ${data.isWithdraw ? "" : "avoid-clicks"
                                  }`} // Handling the css from Index css for disable if don't have permission
                                data-bs-toggle="modal"
                                data-bs-target="#modalWthbl"
                                onClick={() => {
                                  handelId(data.bankId);
                                }}
                                title="Withdraw"
                              >
                                <FontAwesomeIcon
                                  icon={faMinus}
                                  className="add-icon"
                                />
                              </button>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className={`btn btn-steel-blue btn-sm btn-hover-zoom ${data.isDeposit ? "" : "avoid-clicks"
                                  }`}
                                data-bs-toggle="modal"
                                data-bs-target="#modalAdbl"
                                onClick={() => {
                                  handelId(data.bankId);
                                }}
                                title="Deposit"
                              >
                                <FontAwesomeIcon
                                  icon={faPlus}
                                  className="add-icon"
                                />
                              </button>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                onClick={(e) => {
                                  handelstatement(e, data.bankId);
                                }}
                                title="Statement"
                              >
                                <FontAwesomeIcon
                                  icon={faFileAlt}
                                  className="add-icon"
                                />
                              </button>
                            </div>

                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className={`btn btn-steel-blue btn-sm btn-hover-zoom ${data.isEdit ? "" : "avoid-clicks"
                                  }`}
                                onClick={(e) => {
                                  handelEditbank(e, data.bankId);
                                }}
                                title="Edit Bank"
                                data-toggle="modal"
                                data-target="#exampleModalCenter"
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                />
                              </button>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className={`btn btn-steel-blue btn-sm btn-hover-zoom ${data.isDelete ? "" : "avoid-clicks"
                                  }`}
                                onClick={(e) => {
                                  handleDeleteBank(e, data.bankId);
                                }}
                                title="Delete"
                              >
                                <FontAwesomeIcon
                                  icon={faTrashAlt}
                                  className="delete-icon"
                                />
                              </button>
                            </div>

                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className={`btn btn-steel-blue btn-sm btn-hover-zoom ${data.isRenew ? "" : "avoid-clicks"
                                  }`}
                                data-toggle="modal"
                                data-target="#RenewBankPermission"
                                onClick={() => {
                                  handelSubAdmin(data.subAdmins, data.bankId);
                                }}
                                title="Renew Permission"
                              >
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className="permission"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card-position-top-right">
                        {data.isActive === true ? (
                          <span
                            type="button"
                            className="badge-pill badge-success   btn-hover-scale   "
                            title="Click To Inactive"
                            onClick={() => {
                              handelinactive(data.bankId);
                            }}
                          >
                            Active
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className="active-icon ms-1"
                            />
                            <span className="position-absolute top-0 start-100 translate-middle"></span>
                          </span>
                        ) : (
                          <span
                            type="button"
                            className="badge-pill badge-secondary  btn-hover-scale"
                            title="Click To Active"
                            onClick={() => {
                              handelactive(data.bankId);
                            }}
                          >
                            Inactive
                            <FontAwesomeIcon
                              icon={faTimesCircle}
                              className="active-icon ms-1"
                            />
                            <span className="dot-merged position-absolute top-0 start-100 translate-middle"></span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </GridCard>
            </InfiniteScroll>
          </SingleCard>
        </div>

        <ModalAddBl ID={Id} renderParent={setResponse} getbankName={getbankName} setGetBankName={setGetBankName} />
        <ModalWthBl ID={Id} renderParent={setResponse} getbankName={getbankName} setGetBankName={setGetBankName} />
        <InnerBank />
        {/* <SubAdminBank ID={Id} /> */}
        <RenewBankPermission SubAdmins={SubAdmins} ID={SId} getbankName={getbankName} setGetBankName={setGetBankName} />
      </div>
    </div>
  );
};

export default AdminBank;
