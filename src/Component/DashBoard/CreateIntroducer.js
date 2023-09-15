import React, { useState } from "react";
import { useAuth } from "../../Utils/Auth";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaKey,
  FaIdCard,
  FaPercent,
} from "react-icons/fa";
import PasswordCU from "./PasswordCU";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountService from "../../Services/AccountService";

const CreateIntroducer = () => {
  const auth = useAuth();
  const [formData, setFormData] = useState({
    yourFirstName: "",
    yourLastname: "",
    UserName: "",
    yourEnterPassword: "",
    yourConfirmPassword: "",
    // yourIntroducerPercentage: "",
    yourIntroducerId: "",
    yourContact: "",
  });
  console.log("auth", auth);
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
    const data = {
      firstname: formData.yourFirstName,
      lastname: formData.yourLastname,
      userName: formData.UserName,
      password: formData.yourEnterPassword,
      // introducerId: formData.yourIntroducerId,
      // introducerPercentage: formData.yourIntroducerPercentage,
    };

    AccountService.createIntroducer(data, auth.user)
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.data.message);
      });
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
    <>
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
                            <FaEnvelope /> Introducer User Name
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="text"
                            name="UserName"
                            value={formData.yourEmail}
                            onChange={handleChange}
                            placeholder="UserName"
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
                            name="yourFirstName"
                            value={formData.yourFirstName}
                            onChange={handleChange}
                            placeholder=" First Name"
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
                            placeholder=" Last Name"
                            required
                          />
                        </div>
                        {/* <div className="col-md-6">
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
                            placeholder="Enter your Introducer ID"
                            required
                          />
                        </div> */}
                        {/* <div className="col-md-6">
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
                            placeholder="Enter your Introducer Percentage"
                            required
                          />
                        </div> */}

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
                            placeholder="Password"
                            required
                          />
                        </div>

                        {/* <div className="col-md-6">
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
                              Create Introducer
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
    </>
  );
};

export default CreateIntroducer;
