import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import { useNavigate } from "react-router-dom";
import {
  Table,
  ProgressBar,
  Card,
  Button,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
 import { FaArrowRight } from "react-icons/fa";

const InnerIntroducer = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [client, SetClient] = useState([]);
  const [q, setQ] = useState("");

  const { id } = useParams();

  useEffect(() => {
    AccountService.introducerUsersingleProfile(id, auth.user)
      .then((res) => {
        SetClient(res.data.data);
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
    <div className="container pt-4">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search User by Name"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </InputGroup>
      <h5 className="text-center mb-3">List of Users</h5>
      {filteredUsers && filteredUsers.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr align="center">
              <th>User Name</th>
              <th>Name</th>
              <th>Percentage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr key={user._id} align="center">
                <td>{user.userName}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>
                  <div
                    className="progress"
                    style={{ height: "30px", backgroundColor: "#e9ecef" }}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${(user.introducerPercentage || 0) * 10}%`,
                        background: `linear-gradient(90deg, #00c6ff, #0072ff)`,
                        color: "white",
                        fontWeight: "bold",
                        transition: "width 0.5s ease",
                      }}
                      aria-valuenow={(user.introducerPercentage || 0) * 10}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {user.introducerPercentage || 0}%
                    </div>
                  </div>
                </td>
               
                <td>
                  <Button
                    onClick={(e) =>
                      handelShowPercentage(e, user.transactionDetail, user._id)
                    }
                    style={{
                      backgroundColor: "#17a2b8",
                      borderColor: "#17a2b8",
                      padding: "10px 20px",
                      borderRadius: "30px",
                      color: "white",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Show Transactions <FaArrowRight />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="warning">No Network Found</Alert>
      )}
    </div>
  );
};

export default InnerIntroducer;
