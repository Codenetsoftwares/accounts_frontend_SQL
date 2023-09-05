import React, { useEffect, useState } from "react";
import EditServices from "../../Services/EditServices";
import { useAuth } from "../../Utils/Auth";
// import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import InnerAlert from "../../Modal/InnerAlert";
import { useNavigate } from "react-router";

const Alert = () => {
  const nav = useNavigate();
  const handleTransactionPage = () => {
    nav("/TransactionAlert");
  };
  const handleBankPage = () => {
    nav("/BankPage");
  };
  const HandleWebsitePage = () => {
    nav("/WebsitePage");
  };
  return (
    <div className="d-flex justify-content-around h-100 ">
      <button className="btn-lg btn-primary" onClick={handleTransactionPage}>TransactionDetails</button>
      <button className="btn-lg btn-success" onClick={handleBankPage}>Bank</button>
      <button className="btn-lg btn-danger" onClick={HandleWebsitePage}>Website</button>
    </div>
  );
};

export default Alert;
