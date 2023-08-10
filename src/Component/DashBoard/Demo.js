import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";

const WebsiteDetails = () => {
  const auth = useAuth();
  const [website, setWebsite] = useState("");
  const [getWebsite, setGetWebsite] = useState([]);

  const handleWebsite = (event) => {
    setWebsite(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Post API fetch
    if (website.trim() !== "") {
      AccountService.websitedetails(
        {
          name: website,
        },
        auth.user
      )
        .then((res) => {
          if (res.status === 200) {
            setGetWebsite([...getWebsite, { name: website }]);
            setWebsite("");
            alert("Website registered successfully!");
          }
        })
        .catch((err) => {
          if (!err.response) {
            alert(err.message);
            return;
          }
        });
    } else {
      alert("Please provide a website name to add");
    }
  };

  const handleDelete = (index) => {
    const newWebsiteList = [...getWebsite];
    newWebsiteList.splice(index, 1);
    setGetWebsite(newWebsiteList);
    // You can also call an API here to delete on the server
  };

  const handleEdit = (index) => {
    const updatedWebsiteList = [...getWebsite];
    const newName = prompt("Enter the new website name:", updatedWebsiteList[index].name);

    if (newName !== null && newName.trim() !== "") {
      updatedWebsiteList[index].name = newName;
      setGetWebsite(updatedWebsiteList);
      // You can also call an API here to update the website name on the server
    } else if (newName !== null) {
      alert("Please provide a valid website name");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "300px" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter website"
            value={website}
            onChange={handleWebsite}
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-sm btn-primary" onClick={handleSubmit}>
            <i className="fas fa-globe"></i> Add
          </button>
        </div>
        
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {getWebsite.length > 0 &&
            getWebsite.map((data, index) => (
              <div key={index} className="website-item">
                <p className="col">{data.name}</p>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WebsiteDetails;
