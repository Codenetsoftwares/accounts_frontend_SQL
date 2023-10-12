import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { useNavigate, Link } from "react-router-dom";
import Pagination from "../Pagination";

const UserProfile = () => {
  const auth = useAuth();
  const [users, setUsers] = useState([]);

  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState("");
  const [totalData, setTotalData] = useState(0);
  const RawFilterData = [];
  const navigate = useNavigate();
  console.log("page", page);
  console.log("user", users);

  const Handelinnerprofile = (id) => {
    navigate(`/innerprofile`, { state: { page: page, id: id } });
  };

  useEffect(() => {
    AccountService.userprofile(page, auth.user).then(
      (res) => (
        setUsers(res.data.SecondArray),
        setPageNumber(res.data.pageNumber),
        setTotalData(res.data.allIntroDataLength)
      )
    );
  }, [auth, page]);
  console.log("users", users);

  // Data for Filter
  for (let i = 0; i < users.length; i++) {
    RawFilterData.push({
      userName: users[i].userName,
      _id: users[i]._id,
    });
  }

  console.log(RawFilterData.userName);

  const handlePage = (page) => {
    setPage(page);
  };

  // const filteredUsers = RawFilterData.filter((users) => {
  //   const fullName = users.firstname.toLowerCase();
  //   return fullName.includes(q.toLowerCase());
  // });

  const filteredUsers = RawFilterData.filter((user) => {
    const lowerCaseUserName = user.userName.toLowerCase();
    const lowerCaseQuery = q.toLowerCase();
    return lowerCaseUserName.includes(lowerCaseQuery);
  });

  console.log(filteredUsers);

  return (
    <div className="m-3">
      <h1 className="d-flex justify-content-center">User Profile</h1>
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
        {filteredUsers.map((user, index) => (
          <div className="card container-fluid w-75" key={index}>
            <div className="card-body">
              <p
                onClick={() => {
                  Handelinnerprofile(user._id);
                }}
              >
                {filteredUsers[index].userName}
              </p>
            </div>
          </div>
        ))}
      </ul>
      {/* <div className="text-center">
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
      </div> */}
      <Pagination
        handlePage={handlePage}
        page={page}
        totalPage={pageNumber}
        totalData={totalData}
      />
    </div>
  );
};

export default UserProfile;
