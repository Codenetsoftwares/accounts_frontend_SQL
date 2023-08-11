import React, { useState, useEffect } from "react";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router';
const AdminBank = () => {
  const auth = useAuth();
  const [bankName, setBankName] = useState("");
  const [getbankName, setGetBankName] = useState([{}]);
  const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log();

    AccountService.addbank(
      {
        name: bankName,
      },
      auth.user
    )
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          alert("Bank registered successfully!");
        } else {
          alert("Please give a bank name to add");
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

  const handlebankname = (event) => {
    setBankName(event.target.value);
  };



const handeldeletebank = (e) => {
    e.preventDefault();
    const data = {
      name:getbankName ,
    }
      
    // console.log( data)
    AccountService.deletebank(id, data, auth.user)
        .then((res) => {
            // console.log(response.data);
            if (res.status === 200) {
              alert("Bank Deleted successfully!");
            }            
        })
        .catch((error) => {
            console.error(error);
            alert.error("e.message");
        })    
         
};



  useEffect(() => {
    AccountService.getbank(auth.user).then((res) => setGetBankName(res.data));
  }, [auth]);
  console.log("Bank Names", getbankName);
  return (
    <div>
      <div class="card text-center card text-center mt-2 mr-5 ml-5">
        <div class="card-header">BankDetails</div>
        <div class="card-body">
          <input
            class="form-control mb-2"
            id="inputPassword2"
            placeholder="Name"
            onChange={handlebankname}
          />
          <a href="#" class="btn btn-primary" onClick={handleSubmit}>
            Add Bank
          </a>
        </div>
        <div class="card-footer text-muted">
          <div class="card-body">
            {getbankName.length > 0 &&
              getbankName.map((data, index) => {
                return (
                  <div className="d-flex flex-row">
                    <p className="col">{data.name}</p>
                    <FontAwesomeIcon icon={faEdit} className="edit-icon mr-2" />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="delete-icon"
                      onClick={handeldeletebank}
                     
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};



export default AdminBank;
