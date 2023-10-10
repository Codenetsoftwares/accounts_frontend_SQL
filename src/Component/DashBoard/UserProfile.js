import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { useNavigate, Link } from "react-router-dom";

const UserProfile = () => {
  const auth = useAuth();
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1)
  const [pageNumber, setPageNumber] = useState("")
  const navigate = useNavigate();
  // const handelinnerprofile =()=>{
  //   navigate(`/innerprofile/${users._id}`);
  // }

  useEffect(() => {
    AccountService.userprofile(page, auth.user).then((res) => (setUsers(res.data.SecondArray), setPageNumber(res.data.pageNumber)));
  }, [auth]);
  console.log("users", users);

  const handlePage = (page) => {
    setPage(page);
  }

  const filteredUsers = users.filter((affiliate) => {
    const fullName = affiliate.firstname.toLowerCase();
    return fullName.includes(q.toLowerCase());
  });

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
        {filteredUsers.map((users) => (
          <div className="card container-fluid w-75">
            <div className="card-body">
              <Link
                to={`/innerprofile/${users._id}`}
              >
                {users.userName}
              </Link>
            </div>
          </div>
        ))}
      </ul>
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

export default UserProfile;
