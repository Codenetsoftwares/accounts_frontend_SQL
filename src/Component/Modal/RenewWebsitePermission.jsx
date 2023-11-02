import React from "react";
import CreateRequestNew from "../CreateRequestNew";
import AccountService from "../../Services/AccountService";
import EditServices from "../../Services/EditServices";
import { FaHandsHelping } from "react-icons/fa";
import SubAdminBank from "./SubAdminBank";

const RenewWebsitePermission = ({ SubAdmins, ID }) => {
  const handelsave = () => {
    console.log(SubAdmins);
    console.log(ID);
  };
  return (
    <div
      class="modal fade"
      id="RenewWebsitePermission"
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
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {SubAdmins && SubAdmins.length > 0 ? (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">SubAdmin</th>
                    <th scope="col">Deposit</th>
                    <th scope="col">Withdraw</th>
                  </tr>
                </thead>
                <tbody>
                  {SubAdmins.map((subAdmin, index) => (
                    <tr key={subAdmin._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{subAdmin.subAdminId}</td>
                      <td>{subAdmin.isDeposit ? "Yes" : "No"}</td>
                      <td>{subAdmin.isWithdraw ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No permissions found</p>
            )}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            {/* <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Renew
            </button> */}
          </div>
        </div>
      </div>
      {/* <SubAdminBank ID={ID} /> */}
    </div>
  );
};

export default RenewWebsitePermission;



