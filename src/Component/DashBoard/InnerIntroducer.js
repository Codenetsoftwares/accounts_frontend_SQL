import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import ShowPercentage from "../Modal/ShowPercentage";
import InnerIntroducerShowTransaction from "./InnerIntroducerShowTransaction";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const InnerIntroducer = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [Client, SetClient] = useState([]);
  // const [transactionDetails, SetTransactionDetails] = useState([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    AccountService.userprofile(auth.user)
      .then((res) => {
        SetClient(res.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching user data:", error);
      });
  }, [auth, id]);
  console.log(Client);

  const handelShowPercentage = (e, Transaction) => {
    console.log("T=>>>>>",Transaction);
 
    navigate("/showpercentageintroducer", { state: { Transaction } });
  };


  return (
    <div className="d-flex justify-content-center mt-1 flex-column">
      <h5 className="d-flex justify-content-center">
        This are the list Of Users{" "}
      </h5>
      {Client.map((user) => (
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
                    handelShowPercentage(e, user.transactionDetail)
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
