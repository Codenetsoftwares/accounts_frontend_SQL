import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import { useNavigate } from "react-router-dom";

const InnerIntroducer = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [client, SetClient] = useState([]);
  const [ID, SetID] = useState([]);
  const { id } = useParams();
  console.log("===>>>>", id);

  useEffect(() => {
    AccountService.introducerUsersingleProfile(id, auth.user)
      .then((res) => {
        console.log("res", res.data);
        SetClient(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [auth.user, id]);
  // console.log("Data====>>>", Client);

  const handelShowPercentage = (e, Transaction) => {
    console.log("T=>>>>>", Transaction);
    
    navigate("/showpercentageintroducer", { state: { Transaction } });
  };

 

  return (
    <div className="d-flex justify-content-center mt-1 flex-column">
      <h5 className="d-flex justify-content-center">
        This are the list Of Users{" "}
      </h5>
      {client.map((user) => (
        <div class="card container ">
          <div class="card-body text-bg-success">
            <p>User Id:&nbsp;{user.userId}</p>
            <p>User Name:&nbsp;{user.userName}</p>
            <p>
              Name:&nbsp;{user.firstname}&nbsp;{user.lastname}
            </p>
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
