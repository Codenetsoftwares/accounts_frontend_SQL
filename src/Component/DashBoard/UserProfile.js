import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { useNavigate, Link } from "react-router-dom";

const UserProfile = () => {
  const auth = useAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  // const handelinnerprofile =()=>{
  //   navigate(`/innerprofile/${users._id}`);
  // }

  useEffect(() => {
    AccountService.userprofile(auth.user).then((res) => setUsers(res.data));
  }, [auth]);
  console.log("users", users);
  return (
    <div>
      <h1 className="d-flex justify-content-center">User Profile</h1>
      <ul>
        {users.map((users) => (
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

export default UserProfile;
