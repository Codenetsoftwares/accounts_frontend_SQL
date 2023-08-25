import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { useNavigate, Link } from "react-router-dom";

const IntroducerProfile = () => {
  const auth = useAuth();
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  // const handelinnerprofile =()=>{
  //   navigate(`/innerprofile/${users._id}`);
  // }

  useEffect(() => {
    AccountService.Introducerprofile(auth.user).then((res) =>
      setUsers(res.data)
    );
  }, [auth]);
  console.log("users", users);

  const filteredUsers = users.filter((affiliate) => {
    const fullName = affiliate.firstname.toLowerCase();
    return fullName.includes(q.toLowerCase());
  });

  return (
    <div className="m-3">
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
              <Link
                to={`/innerprofile/${users._id}`}
                style={{ cursor: "pointer" }}
              >
                {users.email}
              </Link>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default IntroducerProfile;
