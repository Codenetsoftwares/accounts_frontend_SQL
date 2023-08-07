import React, { useState, useEffect  } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";

const WebsiteDetails = () => {
  const auth = useAuth();
  const [website, setWebsite] = useState("");
  const [getWebsite, setGetWebsite] = useState("");

  console.log("Auth", auth);
  const handlewebsite = (event) => {
    setWebsite(event.target.value);
  };
  console.log(website);

  const handleSubmit = (e) => {
    e.preventDefault();

  // post api fetch 

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

// get api  fetch 
useEffect(() => {
  AccountService.website(auth.user).then((res) => setGetWebsite(res.data));
}, [auth]);
console.log("Website", getWebsite);


 
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

      {getWebsite.length > 0 &&
        getWebsite.map((data, index) => {
          return (
            <div>
              <p className="col">{data.name}</p>
            </div>
          );
        })}
    </div>
  );
};

export default WebsiteDetails;
