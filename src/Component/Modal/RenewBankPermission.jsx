import React, { useState, useEffect } from "react";
import CreateRequestNew from "../CreateRequestNew";
import AccountService from "../../Services/AccountService";
import EditServices from "../../Services/EditServices";
import { FaHandsHelping } from "react-icons/fa";
import SubAdminBank from "./SubAdminBank";
import { useAuth } from "../../Utils/Auth";
import TransactionSercvice from "../../Services/TransactionSercvice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const RenewBankPermission = ({ SubAdmins, ID }) => {
  const [toggle, setToggle] = useState(true);
  const [subAdmin, setSubAdmin] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState([]); // State for checkbox data
  const [checkboxIsDeposit, setCheckboxIsDeposit] = useState([]); // State for checkbox data
  const [checkboxIsWithdraw, setCheckboxIsWithdraw] = useState([]); // State for checkbox data
  const [checkboxIsEdit, setCheckboxIsEdit] = useState([]); // State for Edit checkbox data
  const [checkboxIsDelete, setCheckboxIsDelete] = useState([]); // State for Delete checkbox data
  const [checkboxIsRenew, setCheckboxIsRenew] = useState([]); // State for Renew checkbox data
  const [subAdminlist, setSubAdminlist] = useState([]);

  const auth = useAuth();
  useEffect(() => {
    if (auth.user) {
      TransactionSercvice.subAdminList(auth.user).then((res) => {
        setSubAdmin(res.data);
        setSubAdminlist(res.data.map((data) => data.userName));
      });
    }
  }, [auth]);

  const setData = () => {
    setCheckboxIsDeposit(arrDeposit);
    setCheckboxIsWithdraw(arrWithdraw);
    setCheckboxIsEdit(arrEdit);
    setCheckboxIsDelete(arrDelete);
    setCheckboxIsRenew(arrRenew);
    setCheckboxStates(newArray);
  };

  const handeltoggle = () => {
    setToggle(!toggle);
    setData();
  };

  const funtoggle = () => {
    setToggle(true);
    setData();
  };

  const mergedArray = [
    ...subAdmin.map((item) => ({
      subAdminId: item.userName,
      isDeposit: false,
      isWithdraw: false,
      isEdit: false,
      isRenew: false,
      isDelete: false,
      _id: item._id,
    })),
    ...SubAdmins,
  ];

  const uniqueMergedArray = [
    ...new Map(mergedArray.map((item) => [item.subAdminId, item])).values(),
  ];

  console.log(uniqueMergedArray);
  let arrDeposit = [];
  let arrWithdraw = [];
  let arrEdit = [];
  let arrRenew = [];
  let arrDelete = [];

  // var flag = 0;
  // for (let i = flag; i < uniqueMergedArray.length; i++) {
  //   for (let j = 0; j < SubAdmins.length; j++) {
  //     arrsubadmin.push(SubAdmins[j].subAdminId);
  //     flag = j;
  //   }
  //   arrsubadmin.push(uniqueMergedArray[flag].subAdminId);
  // }

  const newArray = new Array(uniqueMergedArray.length).fill(false);

  // Map subAdminId values to the corresponding indices
  SubAdmins.forEach((subAdmin) => {
    const index = uniqueMergedArray.findIndex(
      (item) => item.subAdminId === subAdmin.subAdminId
    );
    if (index !== -1) {
      newArray[index] = subAdmin.subAdminId;
    }
  });

  for (let i = 0; i < uniqueMergedArray.length; i++) {
    arrDeposit.push(uniqueMergedArray[i].isDeposit);
    arrWithdraw.push(uniqueMergedArray[i].isWithdraw);
    arrEdit.push(uniqueMergedArray[i].isEdit);
    arrRenew.push(uniqueMergedArray[i].isRenew);
    arrDelete.push(uniqueMergedArray[i].isDelete);
  }
  // console.log(mergedData);
  // const handelsave = () => {
  //   console.log("New Array=>>>", uniqueMergedArray);
  //   console.log("Is Deposit=>>>", arrDeposit);
  //   console.log("Is Withdraw=>>>", arrWithdraw);
  //   console.log("All Subadmin Name=>>>", subAdmin);
  //   console.log("Permited Subadmin Name=>>>", newArray);
  // };

  const handleCheckboxChange = (index) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
  };

  const handleCheckboxIsDepositChange = (index) => {
    const newCheckboxIsDeposit = [...checkboxIsDeposit];
    newCheckboxIsDeposit[index] = !newCheckboxIsDeposit[index];
    setCheckboxIsDeposit(newCheckboxIsDeposit);
  };
  const handleCheckboxIsWithdrawChange = (index) => {
    const newCheckboxIsWithdraw = [...checkboxIsWithdraw];
    newCheckboxIsWithdraw[index] = !newCheckboxIsWithdraw[index];
    setCheckboxIsWithdraw(newCheckboxIsWithdraw);
  };

  const handleCheckboxIsEditChange = (index) => {
    const newCheckboxIsEdit = [...checkboxIsEdit];
    newCheckboxIsEdit[index] = !newCheckboxIsEdit[index];
    setCheckboxIsEdit(newCheckboxIsEdit);
  };

  const handleCheckboxIsDeleteChange = (index) => {
    const newCheckboxIsDelete = [...checkboxIsDelete];
    newCheckboxIsDelete[index] = !newCheckboxIsDelete[index];
    setCheckboxIsDelete(newCheckboxIsDelete);
  };

  const handleCheckboxIsRenewChange = (index) => {
    const newCheckboxIsRenew = [...checkboxIsRenew];
    newCheckboxIsRenew[index] = !newCheckboxIsRenew[index];
    setCheckboxIsRenew(newCheckboxIsRenew);
  };

  // const handelsave = () => {
  //   console.log("Chcekboxstate", checkboxStates);
  //   console.log("ChcekboxDeposit", checkboxIsDeposit);
  //   console.log("ChcekboxWithdraw", checkboxIsWithdraw);
  // };
  const handelsave = () => {
    let arr = [];
    const handledata = () => {
      let data = {};
      for (let i = 0; i < subAdminlist.length; i++) {
        console.log("subAdminlist", subAdminlist[i]);
        if (
          checkboxStates[i] === true ||
          (typeof checkboxStates[i] === "string" &&
            checkboxStates[i].trim() !== "")
        ) {
          console.log("check", checkboxStates);
          data = {
            subAdminId: subAdminlist[i],
            isDeposit: checkboxIsDeposit[i],
            isWithdraw: checkboxIsWithdraw[i],
            isEdit: checkboxIsEdit[i],
            isDelete: checkboxIsDelete[i],
            isRenew: checkboxIsWithdraw[i],
          };
          arr.push(data);
        }
      }
      return arr;
    };
    handledata();
    console.log(arr);
    const data = {
      subAdmins: arr,
    };
    console.log(data);
    AccountService.permissionrenewBank(data, ID, auth.user)
      .then((response) => {
        console.log("res", response.data);
        alert(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  };

  const handelRevokePermision = (SubAdminID) => {
    AccountService.revokeAllPermissionBank(ID, SubAdminID, auth.user)
      .then((response) => {
        alert("All Permission Revoked For this SubAdmin");
        window.location.reload();
        console.log(response.data);
      })
      .catch((error) => {
        alert("Oh ho!! Something Went Wrong");
        console.error(error);
      });
  };

  return (
    <div
      class="modal fade"
      id="RenewBankPermission"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Previous Permissions
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={funtoggle}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            {toggle ? (
              <>
                {SubAdmins && SubAdmins.length > 0 ? (
                  <div>
                    <table className="table table-striped table-sm">
                      <thead>
                        <tr>
                          <th scope="col">SubAdmin</th>
                          <th scope="col">Deposit</th>
                          <th scope="col">Withdraw</th>
                          <th scope="col">Edit</th>
                          <th scope="col">Delete</th>
                          <th scope="col">Renew</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SubAdmins.map((subAdmin, index) => (
                          <tr key={subAdmin._id}>
                            <td> {subAdmin.subAdminId} </td>
                            <td>{subAdmin.isDeposit ? "Yes" : "No"}</td>
                            <td>{subAdmin.isWithdraw ? "Yes" : "No"}</td>
                            <td>{subAdmin.isEdit ? "Yes" : "No"}</td>
                            <td>{subAdmin.isDelete ? "Yes" : "No"}</td>
                            <td>{subAdmin.isRenew ? "Yes" : "No"}</td>
                           
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No permissions found</p>
                )}
              </>
            ) : (
              <>
                {subAdmin.map((subAdmin, index) => (
                  // console.log("=>>>>>>.",subAdmin.isDeposit)
                  <div
                    key={index}
                    className="form-check"
                    style={{ margin: "5px" }}
                  >
                    <div className="container">
                      <div class="row row-cols-auto align-items-center">
                        <div class="col-sm-8">
                          <input
                            type="checkbox"
                            className="form-check-input "
                            id={`checkbox${index}`}
                            // style={{ marginRight: "5px" }}
                            checked={checkboxStates[index]}
                            onChange={() => handleCheckboxChange(index)}
                            value={subAdmin.userName}
                          />
                          <label
                            className="form-check-label text-info"
                            htmlFor={`checkbox${index}`}
                            style={{ fontWeight: "bold" }}
                          >
                            {subAdmin.userName} &nbsp;&nbsp;&nbsp;&nbsp;
                            <FontAwesomeIcon
                              icon={faTimes}
                              title="Revoke All Permision"
                              className="bg-danger"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handelRevokePermision(subAdmin.userName);
                              }}
                            />
                          </label>
                        </div>

                        <div class="col-sm-8">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`checkbox${index}`}
                            // style={{ marginRight: "5px" }}
                            checked={checkboxIsDeposit[index]}
                            onChange={() =>
                              handleCheckboxIsDepositChange(index)
                            }
                            // value={subAdmin.userName}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`checkbox${index}`}
                          >
                            Deposit
                          </label>
                        </div>
                        <div class="col-sm-8">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`checkbox${index}`}
                            // style={{ marginRight: "5px" }}
                            checked={checkboxIsWithdraw[index]}
                            onChange={() =>
                              handleCheckboxIsWithdrawChange(index)
                            }
                            // value={subAdmin.userName}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`checkbox${index}`}
                          >
                            Withdraw
                          </label>
                        </div>
                        <div class="col-sm-8">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`checkbox${index}`}
                            // style={{ marginRight: "5px" }}
                            checked={checkboxIsEdit[index]}
                            onChange={() => handleCheckboxIsEditChange(index)}
                            // value={subAdmin.userName}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`checkbox${index}`}
                          >
                            Edit
                          </label>
                        </div>
                        <div class="col-sm-8">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`checkbox${index}`}
                            // style={{ marginRight: "5px" }}
                            checked={checkboxIsDelete[index]}
                            onChange={() => handleCheckboxIsDeleteChange(index)}
                            // value={subAdmin.userName}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`checkbox${index}`}
                          >
                            Delete
                          </label>
                        </div>
                        <div class="col-sm-8">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`checkbox${index}`}
                            checked={checkboxIsRenew[index]}
                            onChange={() => handleCheckboxIsRenewChange(index)}
                            // value={subAdmin.userName}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`checkbox${index}`}
                          >
                            Renew
                          </label>
                        </div>
                      </div>
                    </div>
                    {index < subAdminlist.length - 1 && (
                      <hr style={{ margin: "5px 0", borderColor: "black" }} />
                    )}
                  </div>
                ))}

             
              </>
            )}
          </div>

          <div class="modal-footer">
            {toggle ? (
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={funtoggle}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                class="btn btn-success"
                // data-toggle="modal"
                // data-target="#exampleModal"
                onClick={handelsave}
              >
                Save
              </button>
            )}

            {toggle ? (
              <button
                type="button"
                class="btn btn-primary"
                // data-toggle="modal"
                // data-target="#exampleModal"
                onClick={handeltoggle}
              >
                Renew
              </button>
            ) : (
              <button
                type="button"
                class="btn btn-primary"
                // data-toggle="modal"
                // data-target="#exampleModal"
                onClick={handeltoggle}
              >
                Back
              </button>
            )}
          </div>
        </div>
      </div>
      {/* <SubAdminBank ID={ID} /> */}
    </div>
  );
};

export default RenewBankPermission;
