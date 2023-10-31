import React from "react";
import AccountService from "../Services/AccountService";
import EditServices from "../Services/EditServices";
import CreateRequestNew from "../Component/CreateRequestNew";

const NewBank = () => {
  return (
    <div>
      <CreateRequestNew Api={AccountService.getrequestedbank} EditApi={EditServices.NewBankRqApprove} purpose={"bank"} ApiReject={EditServices.NewBankRqReject} />
    </div>
  );
};

export default NewBank;
