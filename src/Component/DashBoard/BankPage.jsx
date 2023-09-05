import React from "react";
import { useNavigate } from "react-router";

const BankPage = () => {
  const nav = useNavigate();
  const handleEditPage = () => {
    nav("/BankEdit");
  };
  const handleDeletePage = () => {
    nav("/BankDelete");
  };
  return (
    <div className="d-flex justify-content-around h-100">
      <button className=" btn-lg btn-primary" onClick={handleEditPage}>Edit Request</button>
      <button className=" btn-lg btn-danger" onClick={handleDeletePage}>Delete Request</button>
    </div>
  );
};

export default BankPage;
