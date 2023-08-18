import React, { useState, useEffect } from "react";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faPlus,
  faFileAlt,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import InnerBank from "../InnerBank";
import { Link, useNavigate } from "react-router-dom";
import ModalAddBl from "../Modal/ModalAddBl";
import ModalWthBl from "../Modal/ModalWthBl";
import ModalBkdl from "../Modal/ModalBkdl";

// import { useParams } from "react-router";
const AdminBank = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [bankName, setBankName] = useState("");
  const [getbankName, setGetBankName] = useState([{}]);
  // const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();

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

  const handelEditbank = (e, _id) => {
    navigate(`/editbank/${_id}`);
  };

  const handelstatement = () => {
    navigate("/bankstatement");
  };

  const handeldeletebank = (e, name) => {
    e.preventDefault();
    console.log(name);
    const data = {
      bankName: name,
    };

    // console.log( data)
    AccountService.deletebank(data, auth.user)
      .then((res) => {
        // console.log(response.data);
        if (res.status === 200) {
          alert("Bank Deleted successfully!");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
        // alert.error("e.message");
      });
  };

  useEffect(() => {
    AccountService.getbank(auth.user).then((res) => setGetBankName(res.data));
  }, [auth]);
  console.log("Bank Names", getbankName);
  return (
    <div>
      <div class="card text-center card text-center mt-2 mr-5 ml-5">
        <div class="card-header">Payment Details</div>
        <div class="card-body">
          {/* <input
            class="form-control mb-2"
            id="inputPassword2"
            placeholder="Name"
            onChange={handlebankname}
          /> */}
          <div class="card-body">
            {getbankName.length > 0 &&
              getbankName.map((data, index) => {
                return (
                  <div class="card d-flex justify-content-between">
                    <div class="card-body d-flex justify-content-between">
                      <p className="col">{data.bankName}</p>
                      <div className=" d-flex gap-2">
                        <button
                          type="button"
                          class="btn btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#modalWthbl"
                        >
                          <FontAwesomeIcon
                            icon={faMinus}
                            className="add-icon"
                          />
                        </button>
                        <button
                          type="button"
                          class="btn btn-success"
                          data-bs-toggle="modal"
                          data-bs-target="#modalAdbl"
                        >
                          <FontAwesomeIcon icon={faPlus} className="add-icon" />
                        </button>
                        <button
                          type="button"
                          class="btn btn-info"
                          onClick={handelstatement}
                        >
                          <FontAwesomeIcon
                            icon={faFileAlt}
                            className="add-icon"
                          />
                        </button>
                        <button
                          type="button"
                          class="btn btn-warning "
                          onClick={(e) => {
                            handelEditbank(e, data._id);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                          />
                        </button>

                        <button type="button" class="btn btn-danger">
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="delete-icon"
                            // onClick={(e) => {
                            //   handeldeletebank(e, data.bankName);
                            // }}
                            data-toggle="modal"
                            data-target="#modalBkdl"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div class="card-footer text-muted">
          {/* <div class="card-body">
            {getbankName.length > 0 &&
              getbankName.map((data, index) => {
                return (
                  <div class="card d-flex justify-content-between">
                    <div class="card-body d-flex justify-content-between">
                      <p className="col">{data.bankName}</p>
                      <div className=" d-flex gap-2">
                        <button
                          type="button"
                          class="btn btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#modalWthbl"
                        >
                          <FontAwesomeIcon
                            icon={faMinus}
                            className="add-icon"
                          />
                        </button>
                        <button
                          type="button"
                          class="btn btn-success"
                          data-bs-toggle="modal"
                          data-bs-target="#modalAdbl"
                        >
                          <FontAwesomeIcon icon={faPlus} className="add-icon" />
                        </button>
                        <button type="button" class="btn btn-info">
                          <FontAwesomeIcon
                            icon={faFileAlt}
                            className="add-icon"
                          />
                        </button>
                        <button
                          type="button"
                          class="btn btn-warning "
                          onClick={(e) => {
                            handelEditbank(e, data._id);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                          />
                        </button>

                        <button type="button" class="btn btn-danger">
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="delete-icon"
                            onClick={(e) => {
                              handeldeletebank(e, data.bankName);
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div> */}
          <button
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#innerbnk"
          >
            Add New Bank
          </button>
        </div>
        <ModalAddBl />
        <ModalWthBl />
        <InnerBank />
        <ModalBkdl />
      </div>
    </div>
  );
};

export default AdminBank;
