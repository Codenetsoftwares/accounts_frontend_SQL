import React from "react";
import CreateRequestNew from "../CreateRequestNew";
import AccountService from "../../Services/AccountService";
import EditServices from "../../Services/EditServices";
import { FaHandsHelping } from "react-icons/fa";

const RenewBankPermission = ({ SubAdmins }) => {
  const handelsave = () => {
    console.log(SubAdmins);
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
                    <th scope="col">SubAdmin UserName</th>
                    <th scope="col">Deposit</th>
                    <th scope="col">Withdraw</th>
                  </tr>
                </thead>
                <tbody>
                  {SubAdmins.map((subAdmin, index) => (
                    <tr key={subAdmin._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{subAdmin.subAdminId}</td>
                      <td>{subAdmin.isDeposit.toString()}</td>
                      <td>{subAdmin.isWithdraw.toString()}</td>
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
            {/* <button type="button" class="btn btn-primary" onClick={handelsave}>
              Save changes
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewBankPermission;
