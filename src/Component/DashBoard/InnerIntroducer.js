import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import { useNavigate } from "react-router-dom";

const InnerIntroducer = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [client, SetClient] = useState([]);
  const [q, setQ] = useState("");
  
  const { id } = useParams();

  useEffect(() => {
    AccountService.introducerUsersingleProfile(id, auth.user)
      .then((res) => {
        SetClient(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [auth.user, id]);

  const filteredUsers = client.filter((affiliate) => {
    const fullName = affiliate.userName.toLowerCase();
    return fullName.includes(q.toLowerCase());
  });

  const handelShowPercentage = (e, Transaction) => {
    console.log("T=>>>>>", Transaction);
    
    navigate("/showpercentageintroducer", { state: { Transaction } });
  };

 

  return (
    <div className="d-flex justify-content-center mt-1 flex-column">
      <div class="input-group input-group-md ">
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
      <h5 className="d-flex justify-content-center">
        This are the list Of Users{" "}
      </h5>
      {filteredUsers.map((user) => (
        <div class="card container ">
          <div class="card-body text-bg-success">
            <p>
              <b>User Name</b> :&nbsp;{user.userName}
            </p>
            <hr />
            <p>
              <b>Name</b> :&nbsp;{user.firstname}&nbsp;{user.lastname}
            </p>
            <hr />
            <p>
              <b>Percentage For This User</b> :&nbsp;{user.introducerPercentage}{" "}
              %
            </p>
            <hr />
            <p>
              <button
                type="button"
                class="btn btn-primary"
                // data-toggle="modal"
                // data-target=".InnerIntroducerShowTransaction"
                onClick={(e) =>
                  handelShowPercentage(e, user.transactionDetail, user._id)
                }
              >
                Show Transactions
              </button>
            </p>
          </div>
        </div>
      ))}

      {/* <ShowPercentage ID={id} /> */}
      {/* <InnerIntroducerShowTransaction Transaction={TransactionDetails} /> */}
    </div>
  );
};

export default InnerIntroducer;
