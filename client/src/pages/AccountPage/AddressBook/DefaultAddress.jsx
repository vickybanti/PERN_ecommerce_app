import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";

function DefaultAddress() {

  
  const navigate = useNavigate();
  return (
    <div className="card main-card">
      <p className="card-header header px-0">
        <IconButton onClick={() => navigate("/profile/address")}>
          <ArrowBackIcon />
        </IconButton>
        Edit Address
      </p>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              variant="outlined"
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
              label="Delivery Address"
              variant="outlined"
            />
          </div>
          <div className="col-md-6">
            <TextField
              fullWidth
              margin="normal"
              label="City"
              variant="outlined"
            />
          </div>
          <div className="col-md-6">
            <TextField
              fullWidth
              margin="normal"
              label="State"
              variant="outlined"
            />
          </div>
          <div className="col-md-6">
            <TextField
              fullWidth
              margin="normal"
              label="Country"
              variant="outlined"
            />
          </div>
          <div className="col-md-6">
            <TextField
              fullWidth
              margin="normal"
              label="Zipcode"
              variant="outlined"
              type="number"
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
              SAVE ADDRESS
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultAddress;
