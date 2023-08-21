import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../Utils/Auth";

const BankStatement = () => {
  return (
    <div>
      <div className=" container mt-5">
        {/* This is for Normal View */}
        <div
          className="card  rounded-2 mb-2"
          style={{
            boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
            backgroundImage:
              "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
          }}
        >
          <div className="card-body">
            <div className="row">
              <h4 className="col fs-6">Date</h4>
              <h4 className="col fs-6">Amount</h4>
              <h4 className="col fs-6">Transaction Id</h4>
              <h4 className="col fs-6">Gateway</h4>
              <h4 className="col fs-6">CreatedBy</h4>
              <h4 className="col fs-6">User Id</h4>
              <h4 className="col fs-6">Bank</h4>
              <h4 className="col fs-6">Website</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankStatement;
