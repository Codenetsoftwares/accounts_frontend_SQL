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
    yourEmail: "",
    yourEnterPassword: "",
    yourConfirmPassword: "",
    yourIntroducerPercentage: "",
    yourIntroducerId: "",
    yourContact: "",
  });
  const [checkedItems, setCheckedItems] = useState([]);

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
    // const data = {
    //   firstname: formData.yourName,
    //   lastname: formData.yourSurname,
    //   email: formData.yourEmail,
    //   password: formData.yourPassword,
    //   roles: checkedItems,
    // };

    // //Api Fetching
    // AccountService.createuser(data, auth.user)
    //   .then((res) => {
    //     console.log("res", res);
    //     if (res.status === 200) {
    //       toast.success("User Created Successfully");
    //     } else {
    //       toast.error("Failed");
    //     }
    //   })

    //   .catch((err) => {
    //     if (!err.response) {
    //       toast.error(err.message);
    //       return;
    //     }
    //   });
    // console.log(data);
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
            <h1
              className="text-center mb-4"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bold",
                fontStyle: "italic",
                color: "black",
              }}
            >
              Welcome Administrator!
            </h1>
            <div className="row justify-content-center">
              <div className="card">
                <div className="card-body">
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="Your-email" className="form-label">
                          <FaEnvelope /> Enter Your E-mail
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="E-mail"
                          name="E-mail"
                          value={formData.yourEmail}
                          onChange={handleChange}
                          placeholder=" Enter your E-mail"
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
                          name="Contact"
                          value={formData.yourContact}
                          onChange={handleChange}
                          placeholder="Enter your Contact Number"
                          required
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
                          name="FirstName"
                          value={formData.yourName}
                          onChange={handleChange}
                          placeholder="Enter your First Name"
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
                          name="FirstName"
                          value={formData.LastName}
                          onChange={handleChange}
                          placeholder="Enter your Last Name"
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
                          name="IntroducerID"
                          value={formData.IntroducerID}
                          onChange={handleChange}
                          placeholder="Enter your Introducer ID"
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
                          name="IntroducerPercentage"
                          value={formData.IntroducerPercentage}
                          onChange={handleChange}
                          placeholder="Enter your Introducer Percentage"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="" className="form-label">
                          <FaLock /> Password
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="text"
                          name="Password"
                          value={formData.EnterPassword}
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
                          name="Confirm Password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm Password"
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
