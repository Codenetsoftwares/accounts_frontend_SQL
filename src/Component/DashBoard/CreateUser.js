import React, { useState } from "react";
// import "./CreateUser.css";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";

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
        alert("User Created Sucsessfully");
      } else {
        alert("Failed");
      }
    })
    .catch((err) => {
      if (!err.response) {
        alert(err.message);
        return;
      }
    });
  };
  return (
    <div className="bg-light"   style={{}} > 
   
      {/* <div
        className="animated-bg"
        style={{
          background: "linear-gradient(45deg, #87cefa, #ff69b4, #ffa500)",
          backgroundSize: "200% 200%",
          animation: "gradient-animation 10s ease infinite",
        }}
      ></div> */}
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="row justify-content-center">
              <div className="card">
                <div className="card-body">
                  <form >
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="your-name" className="form-label">
                          First name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="your-name"
                          name="yourName"
                          value={formData.yourName}
                          onChange={handleChange}
                          placeholder="first name"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="your-surname" className="form-label">
                          Last name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="your-surname"
                          name="yourSurname"
                          value={formData.yourSurname}
                          onChange={handleChange}
                          placeholder="last name"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="your-email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="your-email"
                          name="yourEmail"
                          value={formData.yourEmail}
                          onChange={handleChange}
                          placeholder="Email"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="your-password" className="form-label">
                          password
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="your-password"
                          name="yourPassword"
                          value={formData.yourPassword}
                          onChange={handleChange}
                          placeholder="password"
                          required
                        />
                      </div>
                      <label htmlFor="your-password" className="form-label">
                        <h5>
                          <span class="badge badge-secondary">
                            Give Access Of :
                          </span>
                        </h5>
                      </label>
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
                          {" "}
                          create user{" "}
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
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Create Transaction"
                          checked={checkedItems.includes("Create Transaction")}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          for="flexSwitchCheckDefault"
                        >
                          Create Transaction
                        </label>
                      </div>

                      <div className="col-12">
                        <div className="row">
                          <div className="col-md-6  submit-button">
                            <button
                            onClick={handleSubmit}
                              className="btn btn-dark w-100 fw-bold"
                            >
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
