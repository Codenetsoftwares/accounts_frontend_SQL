import React, { useState } from "react";
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
    yourIntroducerId: "",
    yourContact: "",
    yourUserId: "",
  });
  const [checkedItems, setCheckedItems] = useState([]);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(checkedItems);

    const data = {
      firstname: formData.yourFirstName,
      lastname: formData.yourLastname,
      userName: formData.yourUserName,
      password: formData.yourEnterPassword,
      contactNumber: formData.yourContact,
      introducerId: formData.yourIntroducerId,
      introducerPercentage: formData.yourIntroducerPercentage,
      userId: formData.yourUserId,
    };
    if (formData.yourEnterPassword === formData.yourConfirmPassword) {
      AccountService.createActualuser(data, auth.user)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            alert("User Created Sucessfully");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.res.data) {
            alert("Something Went Wrong");
            console.log(err.res.data.message);
          }
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
                          <FaMobile /> Enter Your Contact No.
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="contact-number"
                          name="yourContact"
                          value={formData.yourContact}
                          onChange={handleChange}
                          placeholder="Enter your Contact Number"
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
                          <FaIdCard /> Introducer ID
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="text"
                          name="yourIntroducerId"
                          value={formData.yourIntroducerId}
                          onChange={handleChange}
                          placeholder="Enter Introducer ID"
                          required
                        />
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

                      <div className="col">
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
                      </div>
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
