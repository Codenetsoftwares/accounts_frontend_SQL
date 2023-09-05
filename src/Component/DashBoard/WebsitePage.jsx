import React from "react";
import { useNavigate } from "react-router";

const WebsitePage = () => {
  const nav = useNavigate();
  const handleEditPage = () => {
    nav("/WebsiteEdit");
  };
  const handleDeletePage = () => {
    nav("/WebsiteDelete");
  };
  return (
    <div className="d-flex justify-content-around" >
      <button className="btn-primary btn-lg" onClick={handleEditPage}>Edit Request</button>
      <button className="btn-danger btn-lg" onClick={handleDeletePage}>Delete Request</button>
    </div>
  );
};

export default WebsitePage;
