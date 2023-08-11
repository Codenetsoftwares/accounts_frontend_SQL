import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router';

const WebsiteDetails = () => {
  const { id } = useParams();
  const auth = useAuth();
  const [website, setWebsite] = useState("");
  const [getWebsite, setGetWebsite] = useState([]);

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
    window.location.reload();
  };

  
  const handeldeletewebsite = (e) => {
    e.preventDefault();
    const reversegetWebsite =  [getWebsite.reverse()];
    const data = {
      WebsiteName:reversegetWebsite,
    }
      
    // console.log( data)
    AccountService.deletewebsite(id, data, auth.user)
        .then((res) => {
            // console.log(response.data);
            if (res.status === 200) {
              alert( "Website name removed successfully!" );
            }            
        })
        .catch((error) => {
            console.error(error);
            alert.error("e.message");
        })    
         
};


  // get api  fetch
  useEffect(() => {
    AccountService.website(auth.user).then((res) => setGetWebsite(res.data));
  }, [auth]);
  console.log("Website", getWebsite);




  return (
    <>
      <div class="card text-center mt-2 mr-5 ml-5">
        <div class="card-header">Website Details</div>
        <div class="card-body">
          <input
            class="form-control mb-2"
            id="inputPassword2"
            placeholder="Name"
            onChange={handlewebsite}
          />
          <a href="#" class="btn btn-primary" onClick={handleSubmit}>
            Add Website
          </a>
        </div>
        <div class="card-footer text-muted">
          <div class="card-body">
            {getWebsite.length > 0 &&
              getWebsite.map((data, index) => {
                return (
                  <div className="d-flex flex-row">
                    <p className="col ">{data.name}</p>

                    <FontAwesomeIcon icon={faEdit} className="edit-icon mr-2" />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="delete-icon"
                      onClick={handeldeletewebsite}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default WebsiteDetails;
