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
    <div>
      <button onClick={handleEditPage}>Edit Request</button>
      <button onClick={handleDeletePage}>Delete Request</button>
    </div>
  );
};

export default WebsitePage;
