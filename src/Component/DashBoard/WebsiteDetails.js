import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  faEdit,
  faTrashAlt,
  faPlus,
  faFileAlt,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import ModalAdWbl from "../Modal/ModalAdWbl";
import ModalWbdl from "../Modal/ModalWbdl";
import ModalWthWbl from "../Modal/ModalWthWbl";
import { toast } from "react-toastify";
import EditWebsite from "../Modal/EditWebsite";
import ShimmerEffect from "../ShimmerEffect";
import Pagination from "../Pagination";
const WebsiteDetails = () => {
  // const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const [website, setWebsite] = useState("");
  const [getWebsite, setGetWebsite] = useState([]);
  const [name, setName] = useState([]);
  const [Id, setId] = useState("");
  const [WebId, setWebId] = useState("");
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [totalData, setTotalData] = useState(0)
  const [isLoading, setIsLoading] = useState(false);

  // console.log("Auth", auth);
  const handlewebsite = (event) => {
    setWebsite(event.target.value);
  };
  // console.log(website);

  const handleSubmit = (e) => {
    e.preventDefault();

    // post api fetch

    AccountService.websitedetails(
      {
        websiteName: website,
      },
      auth.user
    )
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          alert(res.data.message);
          window.location.reload();
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err);
      });
    // window.location.reload();
  };

  const handlePage = (page) => {
    setPage(page);
  }

  const handelName = (id) => {
    setName(id);
  };
  console.log("This is Name==>>>", name);

  const handelId = (id) => {
    setId(id);
  };

  console.log("ide", Id);

  const handeldeletewebsite = (id) => {
    // e.preventDefault();

    const userConfirmed = window.confirm(
      "Are You Sure You Want to Delete This Bank?"
    );

    if (userConfirmed) {
      // console.log(data)
      AccountService.deletewebsite({ requestId: id }, auth.user)
        .then((res) => {
          // console.log(response.data);
          if (res.status === 200) {
            alert("Website Deleted approval sent!");
            window.location.reload();
          }
        })
        .catch((error) => {
          toast.error(error);
          // alert.error("e.message");
        });
    }
  };

  const handelWebsiteEdit = (id) => {
    setWebId(id);
  };

  // get api  fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AccountService.website(auth.user, page);
        setGetWebsite(res.data.paginatedResults);
        setTotalData(res.data.allIntroDataLength);
        setTotalPage(res.data.pageNumber);
        setIsLoading(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(true);
      }
    };
    fetchData();
  }, [auth]);
  console.log("Website", getWebsite);

  const handelstatement = (e, name) => {
    navigate(`/websitestatement/${name}`);
  };
  return (
    <>
      {isLoading ? <div>
        <div class="card text-center mt-2 mr-5 ml-5">
          <div class="card-header fs-3 text-bold">WEBSITE DETAILS</div>

          <div class="card-body">
            {getWebsite.length > 0 &&
              getWebsite.map((data, index) => {
                {
                  localStorage.setItem("IdWeb", data._id);
                }
                return (
                  <div class="card d-flex justify-content-between">
                    <div class="card-body ">
                      <p className="col font-weight-bold">
                        {data.websiteName}<br /><p className="text-success">Balance:{data.balance}</p>
                      </p>
                      <div className=" d-flex justify-content-center gap-1">
                        <button
                          type="button"
                          class="btn btn-danger  btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#modalWthwbl"
                          onClick={() => {
                            handelId(data._id);
                          }}
                        >
                          <FontAwesomeIcon icon={faMinus} className="add-icon" />
                        </button>
                        <button
                          type="button"
                          class="btn btn-success  btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#modalAdWbl"
                          onClick={() => {
                            handelId(data._id);
                          }}
                        >
                          <FontAwesomeIcon icon={faPlus} className="add-icon" />
                        </button>
                        <button
                          type="button"
                          class="btn btn-info  btn-sm"
                          onClick={(e) => {
                            handelstatement(e, data.websiteName);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faFileAlt}
                            className="add-icon"
                          />
                        </button>
                        <button
                          type="button"
                          class="btn btn-warning  btn-sm"
                          onClick={() => {
                            handelWebsiteEdit(data._id, data.websiteName);
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#editwebsite"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>

                        <button type="button" class="btn btn-danger  btn-sm">
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="delete-icon"
                            onClick={() => {
                              handeldeletewebsite(data._id);
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div class="card-footer text-muted ">
            <input
              class="form-control mb-2 text-center"
              id="inputPassword2"
              placeholder=" Enter your Website Name Here"
              onChange={handlewebsite}
              required
            />
            <a href="#" class="btn btn-primary" onClick={handleSubmit}>
              Add Website
            </a>

          </div>
          <ModalWthWbl ID={Id} />
          <ModalAdWbl ID={Id} />
          <ModalWbdl name={name} />
          <EditWebsite ID={WebId} />
        </div>
        {getWebsite.length > 0 &&
          <Pagination handlePage={handlePage} page={page} totalPage={totalPage} totalData={totalData} perPagePagination={4} />
        }
      </div> : <div className="container"><ShimmerEffect /></div>}

    </>
  );
};

export default WebsiteDetails;
