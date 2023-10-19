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
      userName: formData.yourEmail,
      password: formData.yourPassword,
      roles: checkedItems,
    };

    //Api Fetching
    AccountService.createuser(data, auth.user)
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
                          placeholder="First name"
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
                          placeholder="Last name"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="" className="form-label">
                          <FaEnvelope /> User Name
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="your-email"
                          name="yourEmail"
                          value={formData.yourEmail}
                          onChange={handleChange}
                          placeholder="Enter UserName"
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
                              value="Dashboard-View"
                              checked={checkedItems.includes("Dashboard-View")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Dashboard View
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="report-all-txn"
                              checked={checkedItems.includes("report-all-txn")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Report-All Transaction
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="report-my-txn"
                              checked={checkedItems.includes("report-my-txn")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Report-My Transaction
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Create-Transaction"
                              checked={checkedItems.includes(
                                "Create-Transaction"
                              )}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Create Transaction
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Bank-View"
                              checked={checkedItems.includes("Bank-View")}
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
                              value="Create-User"
                              checked={checkedItems.includes("Create-User")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Create User
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Website-View"
                              checked={checkedItems.includes("Website-View")}
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
                              value="Introducer-Profile-View"
                              checked={checkedItems.includes(
                                "Introducer-Profile-View"
                              )}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Introducer Profile View
                            </label>
                          </div>

                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="RequestAdmin"
                              checked={checkedItems.includes("RequestAdmin")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Request
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 align-items-end">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Transaction-Edit-Request"
                              checked={checkedItems.includes(
                                "Transaction-Edit-Request"
                              )}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Transaction Edit Request
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Transaction-Delete-Request"
                              checked={checkedItems.includes(
                                "Transaction-Delete-Request"
                              )}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Transaction Delete Request
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="User-Profile-View"
                              checked={checkedItems.includes(
                                "User-Profile-View"
                              )}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              User Profile View
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Profile-View"
                              checked={checkedItems.includes("Profile-View")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Profile View
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Create-Withdraw-Transaction"
                              checked={checkedItems.includes(
                                "Create-Withdraw-Transaction"
                              )}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Create Withdraw Transaction
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Create-Deposit-Transaction"
                              checked={checkedItems.includes(
                                "Create-Deposit-Transaction"
                              )}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Create Deposit Transaction
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Create-Introducer"
                              checked={checkedItems.includes(
                                "Create-Introducer"
                              )}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Create Introducer
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
                              Create Sub-Admin
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
