import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Utils/Auth";

export default function ErrorPage() {
  const Auth = useAuth();
  console.log("auth", Auth);
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <h1 className="display-1">404</h1>
          <p className="lead">
            Oops! The page you are looking for does not exist.
          </p>
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
