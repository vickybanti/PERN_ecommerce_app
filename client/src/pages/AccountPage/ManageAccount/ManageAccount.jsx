import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "../account.css";
import { Link, useNavigate } from "react-router-dom";

function ManageAccount() {
  const navigate = useNavigate();

  return (
    <div className="card main-card">
      <p className="card-header header">Manage Account</p>
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100">
              <p className="card-header d-flex justify-content-between">
                Profile Details
                <IconButton
                  onClick={() => {
                    navigate("/profile/change-name");
                  }}
                >
                  <EditIcon sx={{ color: "skyblue" }} />
                </IconButton>
              </p>
              <div className="card-body">
                <div className="pb-4">
                  <p className="card-text">First Name</p>
                  <p className="card-title">John</p>
                </div>
                <div className="pb-4">
                  <p className="card-text">Last Name</p>
                  <p className="card-title">Grey</p>
                </div>
                <div>
                  <p className="card-text">Email</p>
                  <p className="card-title">test@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100">
              <p className="card-header">Security Settings</p>
              <div className="card-body">
                <Link
                  to="/profile/change-password"
                  style={{ textDecoration: "none" }}
                >
                  <p className="card-text pt-2">Change Password</p>
                </Link>
                <Link
                  to="/profile/delete-account"
                  style={{ textDecoration: "none" }}
                >
                  <p className="card-text pt-4">Delete Account</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageAccount;
