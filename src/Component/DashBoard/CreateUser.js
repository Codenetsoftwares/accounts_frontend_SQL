import React, { useState } from "react";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import { FaUser, FaEnvelope } from "react-icons/fa";
import PasswordCU from "./PasswordCU";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateUser = () => {
  const auth = useAuth();
  const [formData, setFormData] = useState({
    yourName: "",
    yourSurname: "",
    yourEmail: "",
    yourPassword: "",
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
    const data = {
      firstname: formData.yourName,
      lastname: formData.yourSurname,
      email: formData.yourEmail,
      password: formData.yourPassword,
      roles: checkedItems,
    };
    
    //Api Fetching
    AccountService.createuser(data, auth.user)
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          toast.success("User Created Successfully");
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
    console.log(data);
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
        background: 'linear-gradient(90deg, rgba(23,183,184,1) 0%, rgba(23,184,155,0.9668242296918768) 100%)',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="d-flex align-items-center justify-content-center">
         
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
                        <label htmlFor="your-name" className="form-label">
                          <FaUser /> First name
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="your-name"
                          name="yourName"
                          value={formData.yourName}
                          onChange={handleChange}
                          placeholder=" Enter your first name"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="your-surname" className="form-label">
                          <FaUser /> Last name
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="your-surname"
                          name="yourSurname"
                          value={formData.yourSurname}
                          onChange={handleChange}
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="" className="form-label">
                          <FaEnvelope /> Email
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="your-email"
                          name="yourEmail"
                          value={formData.yourEmail}
                          onChange={handleChange}
                          placeholder="Enter your e-mail"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <PasswordCU
                          setFormData={setFormData}
                          value={formData.yourPassword}
                          name={"yourPassword"}
                        />
                      </div>

                      <form htmlFor="your-password" className="form-label">
                        <h5>
                          <p
                            className=" d-flex justify-content-center"
                            disabled
                          >
                            <div
                              className="badge badge-secondary"
                              style={{
                                WebkitUserSelect: "none" /* Safari */,
                                msUserSelect: "none" /* IE 10 and IE 11 */,
                                userSelect: "none" /* Standard syntax */,
                              }}
                            >
                              Give Access Of :
                            </div>
                          </p>
                        </h5>
                      </form>

                      <div className="row  w-75 m-auto">
                        <div className="col-md-6">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Dashboard"
                              checked={checkedItems.includes("Dashboard")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Dashboard
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="BankView"
                              checked={checkedItems.includes("BankView")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Bank View
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="CreateSubAdmin"
                              checked={checkedItems.includes("CreateSubAdmin")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Create SubAdmin
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 align-items-end">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="WebsiteView"
                              checked={checkedItems.includes(
                                "WebsiteView"
                              )}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Website View
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Profile"
                              checked={checkedItems.includes("Profile")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Profile
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="EditRequest"
                              checked={checkedItems.includes("EditRequest")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                             Edit Request
                            </label>
                          </div>
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

export default CreateUser;
