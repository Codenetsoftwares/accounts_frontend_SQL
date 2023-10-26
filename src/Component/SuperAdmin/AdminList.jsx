import React, { useEffect, useState } from "react";
import AccountService from "../../Services/AccountService";
import { Link } from "react-router-dom";
import { useAuth } from "../../Utils/Auth";
import Pagination from "../Pagination";

const AdminList = () => {
  const [adminList, setAdminList] = useState([]);
  const [Erorr, setErorr] = useState(false);
  const [erorrData, setErorrData] = useState("");
  const auth = useAuth();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState("");
  const [totalData, setTotalData] = useState(0);
  const RawFilterData = [];

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    if (auth.user) {
      AccountService.getAdminList(page, q, auth.user).then((res) => {
        setAdminList(res.data.SecondArray);
        setPageNumber(res.data.pageNumber);
        setTotalData(res.data.allIntroDataLength);
      }).catch(err => setAdminList([]))
    }
  }, [auth, q, page]);
  console.log("=>>>>>>>>>", adminList);

  // Data for Filter
  // for (let i = 0; i < adminList.length; i++) {
  //   RawFilterData.push({
  //     userName: adminList[i].userName,
  //     _id: adminList[i]._id,
  //   });
  // }

  // const filteredUsers = RawFilterData.filter((user) => {
  //   const lowerCaseUserName = user.userName.toLowerCase();
  //   const lowerCaseQuery = q.toLowerCase();
  //   return lowerCaseUserName.includes(lowerCaseQuery);
  // });
  // console.log(auth.user);

  return (
    <div className="card container">
      <div className="card-header border-transparent">
        <h3 className=" d-flex justify-content-center">List of Sub-Admin</h3>
      </div>
      <div className="input-group input-group-sm mb-3 p-3">
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          placeholder="Search User by Name"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
      {adminList.length > 0 ? (
        <>
          {adminList.map((data, i) => {
            return (
              <div className="card container" key={data?._id}>
                <div className="card-body ">
                  <div className="d-flex justify-content-between">
                    <div className=" text-left ">
                      <h5 className="fs-6 ">{i + 1}.</h5>
                    </div>
                    <div className="">
                      <h5 className="fs-5 text-nowrap">{data?.userName} </h5>
                    </div>
                    <div className="">
                      <button
                        className=""
                        style={{
                          height: "30px",
                          backgroundColor: "#0275d8",
                          border: "none",
                          borderRadius: "5px",
                        }}
                      >
                        <p>
                          <Link to={`/subadminedit/${data?._id}`}>
                            <button type="button" class="btn btn-info">
                              Details
                            </button>
                          </Link>
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <Pagination
            handlePage={handlePage}
            page={page}
            totalPage={pageNumber}
            totalData={totalData} />
        </>) : (<h1 className="text-center mt-4">No Users Founds</h1>)}

    </div>
  );
};
export default AdminList;
