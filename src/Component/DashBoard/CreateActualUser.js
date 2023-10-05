import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaMobile,
  FaKey,
  FaIdCard,
  FaPercent,
} from "react-icons/fa";
import PasswordCU from "./PasswordCU";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountService from "../../Services/AccountService";

const CreateActualUser = () => {
  const auth = useAuth();
  const [formData, setFormData] = useState({
    yourFirstName: "",
    yourLastname: "",
    yourUserName: "",
    yourEnterPassword: "",
    yourConfirmPassword: "",
    yourIntroducerPercentage: "",
    yourIntroducerName: "",
    yourContact: "",
    // yourUserId: "",
  });
  const [checkedItems, setCheckedItems] = useState([]);
  const [IntroducerId, setIntroducerId] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  console.log("This is FromData=>>>", formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, value]);
    } else {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== value)
      );
    }
  };

  useEffect(() => {
    AccountService.IntroducerUserId(auth.user).then((res) =>
      setIntroducerId(res.data)
    );
  }, [auth]);

  // console.log("Introducer Id", IntroducerId);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(checkedItems);
    if (
      formData.yourIntroducerPercentage > 100 ||
      formData.yourIntroducerPercentage < 0
    ) {
      toast.error("Percentage should not be more than 100 or Negetive");
      return;
    }
    const data = {
      firstname: formData.yourFirstName,
      lastname: formData.yourLastname,
      userName: formData.yourUserName,
      password: formData.yourEnterPassword,
      contactNumber: formData.yourContact,
      introducersUserName: searchTerm,
      introducerPercentage: formData.yourIntroducerPercentage,
      // userId: formData.yourUserId,
    };
    if (formData.yourEnterPassword === formData.yourConfirmPassword) {
      AccountService.createActualuser(data, auth.user)
        .then((res) => {
          console.log("res", res);
          alert(res.data.message);
          window.location.reload();
        })
        .catch((err) => {
          console.log("error", err.response.data.message);
          toast.error(err.response.data.message);
          return;
        });
    }
  };

  const styles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  };
  // console.log("====>>>>", formData.yourIntroducerId);

  const handleIntroducerChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter the options based on the input value

    const filtered = value
      ? IntroducerId.filter((data) =>
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
      style={{
        ...styles,
        background:
          "linear-gradient(90deg, rgba(23,183,184,1) 0%, rgba(23,184,155,0.9668242296918768) 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="d-flex align-items-center justify-content-center"
    >
      <div className="container pt-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="row justify-content-center">
              <div className="card">
                <div className="card-body">
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="Your-email" className="form-label">
                          <FaEnvelope /> User Name
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="your-UserName"
                          name="yourUserName"
                          value={formData.yourUserName}
                          onChange={handleChange}
                          placeholder="Enter User Name"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="your-surname" className="form-label">
                          <FaMobile /> Enter Contact No.
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="contact-number"
                          name="yourContact"
                          value={formData.yourContact}
                          onChange={handleChange}
                          placeholder=" Contact Number"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="" className="form-label">
                          <FaUser /> First Name
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="text"
                          name="yourFirstName"
                          value={formData.yourFirstName}
                          onChange={handleChange}
                          placeholder="Enter First Name"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="" className="form-label">
                          <FaUser /> Last Name
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="text"
                          name="yourLastname"
                          value={formData.yourLastname}
                          onChange={handleChange}
                          placeholder="Enter Last Name"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="" className="form-label">
                          <FaIdCard /> Introducer Name
                          <span className="text-danger">*</span>
                        </label>
                        <div>
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
                        {/* <input
                          type="text"
                          className="form-control"
                          id="text"
                          name="yourIntroducerId"
                          value={formData.yourIntroducerId}
                          onChange={handleChange}
                          placeholder="Enter Introducer ID"
                          required
                        /> */}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="" className="form-label">
                          <FaPercent /> Introducer Percentage
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="text"
                          name="yourIntroducerPercentage"
                          value={formData.yourIntroducerPercentage}
                          onChange={handleChange}
                          placeholder="Enter Introducer Percentage"
                          required
                          max={100}
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="" className="form-label">
                          <FaLock /> Password
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="text"
                          name="yourEnterPassword"
                          value={formData.yourEnterPassword}
                          onChange={handleChange}
                          placeholder="Enter Password"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="" className="form-label">
                          <FaKey /> Confirm Password
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="text"
                          name="yourConfirmPassword"
                          value={formData.yourConfirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm Password"
                          required
                        />
                      </div>

                      {/* <div className="col">
                        <label
                          htmlFor=""
                          className="form-label d-flex justify-content-center"
                        >
                          <FaKey /> User Id
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          // id="yourUserId"
                          name="yourUserId"
                          value={formData.yourUserId}
                          onChange={handleChange}
                          placeholder="User Id"
                          required
                        />
                      </div> */}
                    </div>
                    <div className="col-12">
                      <div className="row justify-content-center mt-4">
                        <div className="col-md-6  submit-button">
                          <button
                            onClick={handleSubmit}
                            className="btn btn-dark w-100 fw-bold"
                          >
                            {" "}
                            Create User
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateActualUser;
