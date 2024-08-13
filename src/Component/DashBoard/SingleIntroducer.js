import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import { toast } from "react-toastify";
import IntroResetpassword from "../Modal/IntroResetpassword";
import { customErrorHandler } from "../../Utils/helper";

const SingleIntroducer = () => {
  const { id } = useParams();
  const auth = useAuth();
  const [foundObject, setFoundObject] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [username, setUsername] = useState("");

  useEffect(() => {
    AccountService.introducerProfile(id, auth.user).then((res) => {
      setFoundObject(res.data.data);
    });
  }, [auth, id]);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    setEditedData(isEditing ? {} : foundObject);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleResetPassword = () => {
    setUsername(foundObject.userName);
  };

  const handleSave = () => {
    const data = {
      firstname: editedData.firstName,
      lastname: editedData.lastName,
    };

    AccountService.introducerProfileEdit(data, id, auth.user)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setFoundObject(editedData);
        }
      })
      .catch((err) => {
        toast.error(customErrorHandler(err));
      });

    setIsEditing(false);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        background:
          "linear-gradient(90deg, rgba(23,183,184,1) 0%, rgba(23,184,155,0.97) 100%)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div className="container pt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="text-center mb-4 text-dark">Introducer Data</h1>
            <div className="card shadow">
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    name="firstName"
                    value={
                      isEditing
                        ? editedData.firstName
                        : foundObject.firstName || ""
                    }
                    onChange={handleInputChange}
                    className="form-control"
                    disabled={!isEditing}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    name="lastName"
                    value={
                      isEditing
                        ? editedData.lastName
                        : foundObject.lastName || ""
                    }
                    onChange={handleInputChange}
                    className="form-control"
                    disabled={!isEditing}
                  />
                </div>

                <div className="d-flex justify-content-between">
                  {isEditing ? (
                    <button className="btn btn-success" onClick={handleSave}>
                      <FontAwesomeIcon icon={faSave} /> Save
                    </button>
                  ) : (
                    <button className="btn btn-info" onClick={handleToggleEdit}>
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                  )}
                  <button
                    className="btn btn-primary"
                    data-toggle="collapse"
                    data-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                    onClick={handleResetPassword}
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
            <IntroResetpassword UserName={username} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleIntroducer;
