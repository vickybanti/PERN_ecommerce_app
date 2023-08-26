import React from "react";
import "../account.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, IconButton, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProfileDetails() {
  const navigate = useNavigate();

  return (
    <div className="card main-card">
      <p className="card-header header">
        <IconButton onClick={() => navigate("/profile/manage")}>
          <ArrowBackIcon />
        </IconButton>
        Profile Details
      </p>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              variant="outlined"
              sx={{fontSize:"20px", fontFamily:"fantasy"}}
            />
          </div>
          <div className="col-md-6">
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              variant="outlined"
            />
          </div>
          <div className="col-md-12">
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              variant="outlined"
            />
          </div>
          <div className="col-md-12 pt-2">
            <Button
              variant="contained"
              sx={{
                width: "100%",
                fontSize: "1.1em",
                backgroundColor: "skyblue",
                "&:hover": {
                  backgroundColor: "#4a90e2",
                },
              }}
            >
              UPDATE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
