import React, { useState } from "react";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import { FaUser, FaEnvelope} from "react-icons/fa";
import PasswordCU from "./PasswordCU";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const CreateUser = () => {
  const auth = useAuth();
  const [formData, setFormData] = useState({
    yourName: "",
    yourSurname: "",
    yourEmail: "",
 
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

    //Api Fetching
    AccountService.createuser(
      {
        firstname: formData.yourName,
        lastname: formData.yourSurname,
        email: formData.yourEmail,
        password: formData.yourPassword,
        roles: checkedItems,
      },
      auth.user
    )
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          toast.success("User Created Successfully");
        }  else {
          
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

  return (
       <div className="bg-darkseagreen" style={{ backgroundColor: "#17A2B8"}}>
      <div className="container pt-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h1
              className="text-center mb-4"
              style={{  fontFamily: "Montserrat, sans-serif",
              fontWeight: "bold",
              fontStyle: "italic",
              color: "black",}}
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
                     <PasswordCU/>
                      </div>

                   


                      <form htmlFor="your-password" className="form-label">
                        <h5>
                          <p className=" d-flex justify-content-center" disabled>
                            <div className="badge badge-secondary" style={{
                       WebkitUserSelect: 'none', /* Safari */
                        msUserSelect: 'none', /* IE 10 and IE 11 */
                        userSelect: 'none' /* Standard syntax */
                      }}>
                              Give Access Of :
                            </div>
                          </p>
                        </h5>
                      </form>

                    


                      <div className="row  w-75 m-auto" >
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
                              value="create user"
                              checked={checkedItems.includes("create user")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Create SubAdmin
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Alert"
                              checked={checkedItems.includes("Alert")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Alert
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 align-items-end">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Create Transaction"
                              checked={checkedItems.includes(
                                "Create Transaction"
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
                              value="website details"
                              checked={checkedItems.includes("website details")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Website Details
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="bank details"
                              checked={checkedItems.includes("bank details")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Bank Details
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
