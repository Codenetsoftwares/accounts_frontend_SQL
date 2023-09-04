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
    <div>
      <button onClick={handleEditPage}>Edit Request</button>
      <button onClick={handleDeletePage}>Delete Request</button>
    </div>
  );
};

export default BankPage;
