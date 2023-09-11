import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUser,
  faNetworkWired,
  faEdit,
  faBalanceScale
} from "@fortawesome/free-solid-svg-icons";
import LiveBalanceIntroducer from "../Modal/LiveBalanceIntroducer";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";


const IntroducerProfile = () => {
  const auth = useAuth();
  const [users, setUsers] = useState([]);
   const [ID, setID] = useState([]);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  // const handelinnerprofile =()=>{
  //   navigate(`/innerprofile/${users._id}`);
  // }

  useEffect(() => {
    AccountService.Introducerprofile(auth.user).then((res) =>
      setUsers(res.data)
    )
    
  }, [auth]);
  console.log("users", users);

  const filteredUsers = users.filter((affiliate) => {
    const fullName = affiliate.firstname.toLowerCase();
    return fullName.includes(q.toLowerCase());
  });
  const handleLiveBl = (e, ID) => {
    setID(ID);
   
    
  }
   console.log("Live Bl",ID);

  return (
    <div className="m-3">
      <ToastContainer/> 
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
              <p>
                {users.firstname}&nbsp;{users.lastname}
              </p>

              <Link
                to={`/innerintroducer/${users._id}`}
                style={{ cursor: "pointer" }}
              >
                <button type="button" class="btn btn-primary">
                  NetWork &nbsp;
                  <FontAwesomeIcon icon={faNetworkWired} />
                </button>
              </Link>
              <br />
              <Link
                to={`/singleintroducer/${users._id}`}
                style={{ cursor: "pointer" }}
              >
                <button type="button" class="btn btn-danger mt-2">
                  Edit Profile &nbsp;
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </Link>
              <br />
              <button
                type="button"
                class="btn btn-warning mt-2"
                data-toggle="modal"
                data-target="#LiveBalance"
                onClick={(e) => {
                  handleLiveBl(e, users._id);
                }}
              >
                Chcek Live Balance &nbsp;
                <FontAwesomeIcon icon={faBalanceScale} />
              </button>
            </div>
          </div>
        ))}
      </ul>
      <LiveBalanceIntroducer ID={ID} />
    </div>
  );
};

export default IntroducerProfile;
