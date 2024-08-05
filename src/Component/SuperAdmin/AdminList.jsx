import React, { useCallback, useEffect, useState } from "react";
import AccountService from "../../Services/AccountService";
import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../../Utils/Auth";
import Pagination from "../Pagination";
import { debounce } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import SubAdminProfileView from "../Modal/SubAdminProfileView";

import { Oval } from "react-loader-spinner";
import SingleCard from "../../common/SingleCard";
import GridCard from "../../common/GridCard";
import "./AdminList.css";



const AdminList = () => {

   const navigate = useNavigate();
  const [adminList, setAdminList] = useState([]);
  const [Erorr, setErorr] = useState(false);
  const [erorrData, setErorrData] = useState("");
  const auth = useAuth();

  const [pageNumber, setPageNumber] = useState("");
  const [totalData, setTotalData] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [profileView, setProfileView] = useState("");


  console.log('=====>>> sub list',adminList)

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (!event.target.value) {
      setAdminList([]);
    }
  };

  const handleCardClick = (id) => {
    setActiveCard(id);
    setTimeout(() => setActiveCard(null), 300); // Reset the animation class after animation duration
  };

  const fetchData = async (searchTerm = search, newPage = page) => {
    try {
      setIsLoading(true);
      const res = await AccountService.getAdminList(
        newPage,
        searchTerm,
        auth.user
      );
      console.log('======>>>>> response',res.data.data)
      const filteredData = res.data.data.filter((item) => item !== null);
      setAdminList((prevUsers) =>
        searchTerm.length > 0 ? filteredData : [...prevUsers, ...filteredData]
      );
      setHasMore(newPage < res.data.pageNumber);
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
    [] // Empty dependency array ensures stable function
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
    if (page > 1) {
      fetchData(); // Fetch more data when page changes
    }
  }, [page]);

  // useEffect(() => {
  //   if (auth.user) {
  //     AccountService.getAdminList(page, q, auth.user)
  //       .then((res) => {
  //         setAdminList(res.data.SecondArray);
  //         setPageNumber(res.data.pageNumber);
  //         setTotalData(res.data.allIntroDataLength);
  //       })
  //       .catch((err) => setAdminList([]));
  //   }
  // }, [auth, q, page]);
  // console.log("=>>>>>>>>>", adminList);

  // Data for Filter
  // for (let i = 0; i < adminList.length; i++) {
  //   RawFilterData.push({
  //     userName: adminList[i].userName,
  //     adminId: adminList[i].adminId,
  //   });
  // }

  // const filteredUsers = RawFilterData.filter((user) => {
  //   const lowerCaseUserName = user.userName.toLowerCase();
  //   const lowerCaseQuery = q.toLowerCase();
  //   return lowerCaseUserName.includes(lowerCaseQuery);
  // });
  // console.log(auth.user);

  const handleProfileView = (id) => {
    // console.log(d);
    const selectedUser = adminList.find((user) => user.adminId === id);
    console.log('selected user',selectedUser )
    setProfileView(selectedUser);
  };

  const handelDetails = (e, id) => {
    navigate(`/subadminedit/${id}`);
  };

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
            width: "100%",
          }}
        >
          <div className="card-header-pill text-bold d-flex">
            <div className="flex-grow-1  ml-4 mr-5">
              <input
                type="search"
                className="form-control rounded-pill shadow"
                placeholder="Search User by Name..."
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>
        </SingleCard>
        <div className="card-body  mt-2 mb-3">
          <SingleCard className="mb-2 p-4">
            <InfiniteScroll
              style={{ overflowX: "hidden" }}
              dataLength={adminList.length}
              next={fetchMoreData}
              hasMore={hasMore}
             loader={
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "80vh" }}
            >
              <Oval
                height={40}
                width={40}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          }
              height={600}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>No more data to load</b>
                </p>
              }
            >
              <GridCard columns={3}>
                {adminList.map((data, i) => (
                  <div
                    key={data?.adminId}
                    className="col d-flex justify-content-center align-items-center "
                    onMouseEnter={() => setHoveredCard(data.adminId)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      className={`card d-flex justify-content-between ${
                        hoveredCard === data?.adminId ? "card-hover-shadow" : ""
                      }`}
                      style={{
                        borderRadius: "20px",
                        height: "200px",
                        width: "95%",
                        position: "relative",
                      }}
                      onClick={() => handleCardClick(data?.adminId)}
                    >
                      <div className="card-body">
                        <button
                          type="button"
                          className="btn btn-steel-blue btn-sm btn-hover-zoom fs-4"
                          data-toggle="modal"
                          data-target="#subadminProfile"
                          onClick={() => {
                            handleProfileView(data.adminId);
                          }}
                        >
                          <FontAwesomeIcon icon={faUser} className="add-icon" />
                        </button>
                        <p
                          className="font-weight-bold fs-4 text-truncate mt-3"
                          style={{ color: "#708090" }}
                        >
                          {data?.userName}
                        </p>
                        <div className="container">
                          <div>
                       
                              <button
                                type="button"
                                className="btn btn-steel-blue btn-sm btn-hover-zoom font-weight-bold "
                                style={{ fontFamily: "'Abril Fatface', serif ", textDecoration: "underline",}}
                                onClick={(e) => {
                                  handelDetails(e, data.adminId);
                                }}
                              >
                                Click Here For More Details
                              </button>
                          
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </GridCard>
            </InfiniteScroll>
          </SingleCard>
        </div>
      </div>
      <SubAdminProfileView data={profileView}/>
    </div>

  );
};
export default AdminList;
