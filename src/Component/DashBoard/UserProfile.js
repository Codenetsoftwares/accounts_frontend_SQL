import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { useNavigate, Link } from "react-router-dom";
import Pagination from "../Pagination";
import "./UserProfile.css";
const UserProfile = () => {
  const auth = useAuth();
  const [users, setUsers] = useState([]);

  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState("");
  const [totalData, setTotalData] = useState(0);

  const navigate = useNavigate();
  console.log("page", page);
  console.log("user", users);

  const Handelinnerprofile = (id) => {
    navigate(`/innerprofile`, { state: { page: page, id: id, q: q } });
  };

  useEffect(() => {
    AccountService.userprofile(page, q, auth.user).then((res) => {
      console.log("res", res.data.SecondArray);

      // Filter out null values from the array
      const filteredData = res.data.SecondArray.filter((item) => item !== null);
      setUsers(filteredData);
      setPageNumber(res.data.pageNumber);
      setTotalData(res.data.allIntroDataLength);
    });
  }, [auth, page, q]);

  console.log("users", users);

  const handlePage = (page) => {
    setPage(page);
  };

  return (
    <div className="m-3">
      <h1 className="d-flex justify-content-center">User Profile</h1>
      <div class="input-group input-group-sm ">
        <button type="button" class="btn btn-primary">
          <i class="fas fa-search"></i>
        </button>
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
        {users.map((user, index) => (
          <div
            className="card container-fluid w-75 mt-2 border-dark"
            key={index}
          >
            <div className="card-body">
              <p
                onClick={() => {
                  Handelinnerprofile(user._id);
                }}
                style={{ color: "blue", cursor: "pointer" }}
              >
                <span
                  className="d-flex justify-content-center"
                  title="Click here to know User details "
                >
                  <b>{users[index].userName}</b>
                </span>
                <span
                  className="d-flex justify-content-center text-warning "
                  style={{ fontSize: "25px" }}
                >
                  &#8679;
                </span>
                <span className="d-flex justify-content-center text-success blinking-text">
                  Click UserName to know User details
                </span>
              </p>
            </div>
          </div>
        ))}
      </ul>

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
