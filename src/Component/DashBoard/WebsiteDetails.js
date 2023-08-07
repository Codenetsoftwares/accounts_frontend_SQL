import React, { useState } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";

const WebsiteDetails = () => {
  const auth = useAuth();
  const [website, setWebsite] = useState("");
  console.log("Auth", auth);
  const handlewebsite = (event) => {
    setWebsite(event.target.value);
  };
  console.log(website);

  const handleSubmit = (e) => {
    e.preventDefault();

    AccountService.websitedetails(
      {
        name: website,
      },
      auth.user
    )
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          alert("Website registered successfully!");
        } else {
          alert("Please give a website name to add");
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
    <div>
      <input
        type="email"
        className="form-control"
        aria-describedby="emailHelp"
        placeholder="Enter website"
        onChange={handlewebsite}
      />
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Add Website
      </button>
    </div>
  );
};

export default WebsiteDetails;
