import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../Utils/Auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AccountService from "../../Services/AccountService";
import FullScreenLoader from "../FullScreenLoader";

const EditProfileSubadmin = () => {
  const { id } = useParams();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [foundObject, setFoundObject] = useState([]);
  const [isRerender, setIsRerender] = useState(null); // State for accordion open/close
  const [isEditing, setIsEditing] = useState(false); // Track which field is being edited
  const [editedData, setEditedData] = useState({
    firstName: "",
    lastName: "",
  }); // Store edited data
  console.log(id);
  useEffect(() => {
    AccountService.getSingleAdmin(id, auth.user).then((res) => {
      console.log(res.data);
      setFoundObject(res.data.data);
    });
  }, [isRerender]);

  console.log("This is User Deatils===>>", foundObject);

  const handleToggleEdit = (e) => {
    e.preventDefault();

    setIsEditing(!isEditing);
    setEditedData([]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((editedData) => ({ ...editedData, [name]: value }));
  };

  const handleSave = () => {
    console.log("edited data", editedData);
    setIsEditing(false);
    const data = {
      firstName: editedData.firstName || foundObject.firstName,
      lastName: editedData.lastName || foundObject.lastName,
    };
    if (
      data.firstName === foundObject.firstName &&
      data.lastName === foundObject.lastName
    ) {
      toast.info("At Least one field must be changed");
      return;
    }
    setIsLoading(true);
    // put Api Fetching
    AccountService.editsubadminprofile(id, data, auth.user)
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          toast.success("Profile updated");
          setIsRerender(res);
        } else {
          toast.error("Failed");
        }
        setIsLoading(false);
      })

      .catch((err) => {
        setIsLoading(false);
        if (!err.response) {
          toast.error(err.message);
          return;
        }
      });
  };
  console.log("User Deatils", foundObject);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        background:
          "linear-gradient(90deg, rgba(23,183,184,1) 0%, rgba(23,184,155,0.9668242296918768) 100%)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <FullScreenLoader show={isLoading} />
      <div className="container pt-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h1
              className="text-center mb-4"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bold",
                fontStyle: "italic",
                color: "black",
              }}
            >
              SubAdmin Data
            </h1>
            <div className="row justify-content-center">
              <div className="card">
                <div className="card-body">
                  {foundObject && (
                    <>
                      <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                          name="firstName"
                          value={
                            isEditing
                              ? editedData.firstName
                              : foundObject.firstName
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
                              : foundObject.lastName
                          }
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                      </div>

                      {isEditing ? (
                        <button
                          className="btn btn-success mx-1"
                          onClick={handleSave}
                        >
                          <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                      ) : (
                        <button
                          className="btn btn-info mx-1"
                          onClick={handleToggleEdit}
                        >
                          <FontAwesomeIcon icon={faEdit} /> Edit
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileSubadmin;
