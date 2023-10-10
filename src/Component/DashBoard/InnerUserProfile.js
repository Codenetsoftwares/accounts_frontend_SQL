import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UserResetPass from "../Modal/UserResetPass";
import { Alert } from "react-bootstrap";

const InnerUserProfile = () => {
  const { id } = useParams();
  const auth = useAuth();
  console.log("User ID==>>", id);
  const [users, setUsers] = useState([]);
  const [foundObject, setFoundObject] = useState([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // State for accordion open/close
  const [isEditing, setIsEditing] = useState(false); // Track which field is being edited
  const [editedData, setEditedData] = useState({}); // Store edited data
  const [username, setUsername] = useState([]);
  const [IntroducerName, setIntroducerName] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  // Calling Single Introducer Name API
  useEffect(() => {
    AccountService.IntroducerUserId(auth.user).then((res) =>
      setIntroducerName(res.data)
    );
  }, [auth]);
  console.log("=>>>Introname", IntroducerName);
  console.log(auth)
  useEffect(() => {
    AccountService.userprofile(auth.user)
      .then((res) => {
        setUsers(res.data);
        const userWithId = res.data.find((user) => user._id === id);
        setFoundObject(userWithId);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching user data:", error);
      });
  }, [auth, id]);
  // console.log("This is User Deatils===>>",foundObject);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };
  const handleToggleEdit = (e) => {
    e.preventDefault();

    setIsEditing(!isEditing);
    setEditedData([]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleResetPassword = (e, username) => {
    setUsername(username);
  };
  console.log("password ========>", username);

  const handleSave = (field) => {
    setIsEditing(false);
    setEditedData({ ...editedData, [field]: "" });
    const data = {
      firstname: editedData.firstname,
      lastname: editedData.lastname,
      email: editedData.email,
      contactnumber: editedData.contactNumber,
      userName: editedData.userName,
      introducerPercentage: editedData.introducerPercentage,
      introducersUserName: searchTerm,
      websitedetail: editedData.websitedetail,
      bankDetail: {}, // Initialize empty bankDetail
      upiDetail: {}, // Initialize empty upiDetail
    };

    // Check if bankDetail exists in editedData
    if (editedData.hasOwnProperty("bankDetail")) {
      // Iterate through properties of bankDetail
      Object.keys(editedData.bankDetail).forEach((key) => {
        data.bankDetail[key] = editedData.bankDetail[key];
      });
    }

    // Check if upiDetail exists in editedData
    if (editedData.hasOwnProperty("upiDetail")) {
      // Iterate through properties of upiDetail
      Object.keys(editedData.upiDetail).forEach((key) => {
        data.upiDetail[key] = editedData.upiDetail[key];
      });
    }

    // put Api Fetching
    AccountService.inneruserprofile(id, data, auth.user)
      .then((res) => {
        console.log("res", res);
        if (res.status === 201) {
          window.location.reload();
          alert("Profile updated");
        } else {
          toast.error("Failed");
        }
      })

      .catch((err) => {
        if (!err.response) {
          toast.error(err.message);
          return;
        }
      });
  };
  console.log("User Deatils", foundObject);

  const handleIntroducerChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter the options based on the input value

    const filtered = value
      ? IntroducerName.filter((data) =>
        data.userName.toLowerCase().includes(value.toLowerCase())
      )
      : [];

    setFilteredOptions(filtered);
  };
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchTerm(option.userName);
    setFilteredOptions([]); // Clear the filtered options when an option is selected
  };
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        background:
          "linear-gradient(90deg, rgba(23,183,184,1) 0%, rgba(23,184,155,0.9668242296918768) 100%)",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div className="container">
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
              User Profile
            </h1>
            <div className="row justify-content-center">
              <div className="card">
                <div className="card-body">
                  {foundObject && (
                    <>
                      <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                          name="firstname"
                          value={
                            isEditing
                              ? editedData.firstname
                              : foundObject.firstname
                          }
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                          name="lastname"
                          value={
                            isEditing
                              ? editedData.lastname
                              : foundObject.lastname
                          }
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Contact Number</label>
                        <input
                          name="contactNumber"
                          value={
                            isEditing
                              ? editedData.contactNumber
                              : foundObject.contactNumber
                          }
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                      </div>
                      {/* <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          name="email"
                          value={
                            isEditing ? editedData.email : foundObject.email
                          }
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                      </div> */}
                      {/* <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                          name="userName"
                          value={
                            isEditing
                              ? editedData.userName
                              : foundObject.userName
                          }
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                      </div> */}
                      <div className="mb-3">
                        <label className="form-label">
                          Introducer Percentage{" "}
                        </label>
                        <input
                          name="introducerPercentage"
                          value={
                            isEditing
                              ? editedData.introducerPercentage
                              : foundObject.introducerPercentage
                          }
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                      </div>

                      {/* Show Intro Name disabled Always and Change Intro */}
                      {isEditing ? (
                        <div>
                          <label className="form-label">
                            Change Introducer
                          </label>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="fa fa-user id"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search by Introducer Name"
                              value={searchTerm}
                              onChange={handleIntroducerChange}
                            />
                          </div>
                          {filteredOptions.length > 0 && (
                            <div className="list-group">
                              {filteredOptions.map((option, index) => (
                                <button
                                  key={index}
                                  className="list-group-item list-group-item-action"
                                  onClick={() => handleOptionSelect(option)}
                                >
                                  {option.userName}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="mb-3">
                          <label className="form-label">Introducer Name </label>
                          <input
                            name="introducerPercentage"
                            value={foundObject.introducersUserName}
                            className="form-control"
                            disabled
                          />
                        </div>
                      )}

                      <div className="mb-3">
                        <label className="form-label">website Details</label>
                        <input
                          name="WebsiteDetails"
                          value={
                            isEditing
                              ? editedData.WebsiteDetails
                              : foundObject.WebsiteDetails
                          }
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                      </div>
                      <button
                        className="btn btn-link"
                        onClick={toggleAccordion}
                      >
                        Payment Details
                      </button>

                      <Link
                        to={`/transactiondetails/${id}`}
                        className="btn btn-link"
                      >
                        Transaction Details
                      </Link>
                      {isAccordionOpen && (
                        <div className="accordion">
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className="accordion-button"
                                type="button"
                                onClick={toggleAccordion}
                              >
                                Bank Details
                              </button>
                            </h2>
                            <div className="accordion-collapse collapse show">
                              <div className="accordion-body">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label
                                        htmlFor="bankName"
                                        className="form-label"
                                      >
                                        Bank Name:
                                        {/* {editedData.bankDetail} */}
                                      </label>
                                      <input
                                        type="text"
                                        id="bankName"
                                        className="form-control"
                                        value={
                                          isEditing
                                            ? editedData.bankDetail &&
                                            editedData.bankDetail.bankName // Check if bankName exists in editedData.bankDetail
                                            : foundObject.bankDetail &&
                                            foundObject.bankDetail.bankName // Check if bankName exists in foundObject.bankDetail}
                                        }
                                        disabled={!isEditing}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label
                                        htmlFor="accountNumber"
                                        className="form-label"
                                      >
                                        Account Number:
                                      </label>
                                      <input
                                        type="text"
                                        id="accountNumber"
                                        className="form-control"
                                        value={
                                          isEditing
                                            ? editedData.bankDetail &&
                                            editedData.bankDetail
                                              .accountNumber // Check if accountNumber exists in editedData.bankDetail
                                            : foundObject.bankDetail &&
                                            foundObject.bankDetail
                                              .accountNumber // Check if accountNumber exists in foundObject.bankDetail
                                        }
                                        disabled={!isEditing}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label
                                        htmlFor="ifscCode"
                                        className="form-label"
                                      >
                                        IFSC Code:
                                      </label>
                                      <input
                                        type="text"
                                        id="ifscCode"
                                        className="form-control"
                                        value={
                                          isEditing
                                            ? editedData.bankDetail &&
                                            editedData.bankDetail.ifscCode // Check if ifscCode exists in editedData.bankDetail
                                            : foundObject.bankDetail &&
                                            foundObject.bankDetail.ifscCode
                                        }
                                        disabled={!isEditing}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label
                                        htmlFor="accountHolderName"
                                        className="form-label"
                                      >
                                        Account Holder Name:
                                      </label>
                                      <input
                                        type="text"
                                        id="accountHolderName"
                                        className="form-control"
                                        value={
                                          isEditing
                                            ? editedData.bankDetail &&
                                            editedData.bankDetail
                                              .accountHolderName // Check if accountHolderName exists in editedData.bankDetail
                                            : foundObject.bankDetail &&
                                            foundObject.bankDetail
                                              .accountHolderName
                                        }
                                        disabled={!isEditing}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label
                                        htmlFor="Upi"
                                        className="form-label"
                                      >
                                        UPI Application:
                                      </label>
                                      <input
                                        type="text"
                                        id="upiApp"
                                        className="form-control"
                                        value={
                                          isEditing
                                            ? editedData.bankDetail &&
                                            editedData.bankDetail.upiApp
                                            : foundObject.bankDetail &&
                                            foundObject.bankDetail.upiApp
                                        }
                                        disabled={!isEditing}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label
                                        htmlFor="Upi"
                                        className="form-label"
                                      >
                                        UPI ID:
                                      </label>
                                      <input
                                        type="text"
                                        id="upiId"
                                        className="form-control"
                                        value={
                                          isEditing
                                            ? editedData.bankDetail &&
                                            editedData.bankDetail.upiId
                                            : foundObject.bankDetail &&
                                            foundObject.bankDetail.upiId
                                        }
                                        disabled={!isEditing}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label
                                        htmlFor="Upi"
                                        className="form-label"
                                      >
                                        UPI Number:
                                      </label>
                                      <input
                                        type="text"
                                        id="upiNumber"
                                        className="form-control"
                                        value={
                                          isEditing
                                            ? editedData.bankDetail &&
                                            editedData.bankDetail.upiNumber
                                            : foundObject.bankDetail &&
                                            foundObject.bankDetail.upiNumber
                                        }
                                        disabled={!isEditing}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {isEditing ? (
                        <button
                          className="btn btn-success mx-1"
                          onClick={handleSave}
                        >
                          <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                      ) : (
                        <>
                          <button
                            className="btn btn-info mx-1"
                            onClick={handleToggleEdit}
                          >
                            <FontAwesomeIcon icon={faEdit} /> Edit
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>

                <button
                  class="btn btn-primary"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  onClick={(e) => {
                    handleResetPassword(e, foundObject.userName);
                  }}
                >
                  Reset password
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserResetPass UserName={username} />
      </div>
    </div>
  );
};

export default InnerUserProfile;
