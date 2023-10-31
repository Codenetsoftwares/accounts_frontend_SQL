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
  faEye,
  faStar,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import InnerBank from "../InnerBank";
import { Link, useNavigate } from "react-router-dom";
import ModalAddBl from "../Modal/ModalAddBl";
import ModalWthBl from "../Modal/ModalWthBl";
import ModalBkdl from "../Modal/ModalBkdl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubAdminBank from "../Modal/SubAdminBank";
import Pagination from "../Pagination";
import ShimmerEffect from "../ShimmerEffect";
// import { useParams } from "react-router";
const AdminBank = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [bankName, setBankName] = useState("");
  const [getbankName, setGetBankName] = useState([{}]);
  const [Id, setId] = useState();
  const [IdWithdraw, setIdWithdraw] = useState();
  const [AI, setAI] = useState(false);
  const [documentView, setDocumentView] = useState([]);
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [totalData, setTotalData] = useState(0)
  const [isLoading, setIsLoading] = useState(false);

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
          toast.success("Bank registered successfully!");
          Window.location.reload();
        } else {
          toast.error("Something Went Wrong!!");
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

  const handlePage = (page) => {
    setPage(page);
  }

  const handlebankname = (event) => {
    setBankName(event.target.value);
  };

  const handelEditbank = (e, _id) => {
    navigate(`/editbank/${_id}`);
  };

  const handelstatement = (e, accountNumber) => {
    navigate(`/bankstatement/${accountNumber}`);
  };

  const handleDeleteBank = (e, id) => {
    e.preventDefault();

    const userConfirmed = window.confirm(
      "Are You Sure You Want to Delete This Bank?"
    );

    if (userConfirmed) {
      // console.log(data)
      AccountService.deletebank({ requestId: id }, auth.user)
        .then((res) => {
          // console.log(response.data);
          if (res.status === 200) {
            alert(res.data.message);
            // alert("Bank Deleted approval sent!");
            window.location.reload();
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
          console.log(error);
          // toast.error(error);
          // alert.error("e.message");
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AccountService.getbank(auth.user, page);
        setGetBankName(res.data.paginatedResults);
        setTotalData(res.data.allIntroDataLength);
        setTotalPage(res.data.pageNumber);
        setIsLoading(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(true);
      }
    };
    fetchData();
  }, [page]);

  console.log("Bank Names", getbankName);
  console.log("first", isLoading)

  const handelId = (id) => {
    setId(id);
  };

  // const handelWithdrawId = (id) => {
  //   setIdWithdraw(id);
  // };

  const handelactiveinactive = () => {
    setAI(true);
  };

  console.log(Id);
  return (
    <>
      {isLoading ?
        <div>
        <div>
          <div class="card text-center card text-center mt-2 mr-5 ml-5">
            <div class="card-header fs-3 text-bold">PAYMENT DETAILS</div>
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
                        <div class="card-body ">
                          <p className="font-weight-bold">
                            {data.bankName}
                            <br />
                            <p className="text-success">Balance:{data.balance}</p>
                          </p>
                          <div className=" d-flex justify-content-center gap-1">
                            <button
                              type="button"
                              class="btn btn-danger btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#modalWthbl"
                              onClick={() => {
                                handelId(data._id);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faMinus}
                                className="add-icon"
                              />
                            </button>
                            <button
                              type="button"
                              class="btn btn-success btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#modalAdbl"
                              onClick={() => {
                                handelId(data._id);
                              }}
                            >
                              <FontAwesomeIcon icon={faPlus} className="add-icon" />
                            </button>
                            <button
                              type="button"
                              class="btn btn-info btn-sm"
                              onClick={(e) => {
                                handelstatement(e, data.bankName);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faFileAlt}
                                className="add-icon"
                              />
                            </button>
                            <button
                              type="button"
                              class="btn btn-warning btn-sm "
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
                            <button type="button" class="btn btn-danger  btn-sm">
                              <FontAwesomeIcon
                                icon={faTrashAlt}
                                className="delete-icon"
                                onClick={(e) => {
                                  handleDeleteBank(e, data._id);
                                }}
                              />
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary  btn-sm"
                              data-toggle="modal"
                              data-target="#exampleModal"
                              onClick={() => {
                                handelId(data._id);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faEye}
                                className="delete-icon"
                              />
                            </button>
                            {data.isActive === false ? (
                              <button
                                type="button"
                                class="btn btn-dark btn-sm"
                                title="Active"
                                onClick={handelactiveinactive}
                              >
                                <FontAwesomeIcon
                                  icon={faStar}
                                  className="active-icon"
                                />
                              </button>
                            ) : (
                              <button
                                type="button"
                                class="btn btn-dark btn-sm"
                                title="Inactive"
                                onClick={handelactiveinactive}
                              >
                                <FontAwesomeIcon
                                  icon={faTimes}
                                  className="active-icon"
                                />
                              </button>
                            )}
                          </div>
                          {/* Active,Inactive */}

                          {/* <div className="form-check form-switch mt-1">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Introducer-Profile-View"
                          onChange={handelactiveinactive}
                        />

                        <label
                          className="form-check-label"
                          for="flexSwitchCheckDefault"
                        >
                          Active
                        </label>
                      </div> */}
                          {/* End of Active,Inactive Part */}
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
            <ModalAddBl ID={Id} />
            <ModalWthBl ID={Id} />
            <InnerBank />
            <SubAdminBank ID={Id} />
          </div>
        </div>
        {getbankName.length > 0 &&
          <Pagination handlePage={handlePage} page={page} totalPage={totalPage} totalData={totalData} perPagePagination={4} />
        }
      </div> : <div className="container"><ShimmerEffect /></div>
      }

    </>
  );
};

export default AdminBank;
