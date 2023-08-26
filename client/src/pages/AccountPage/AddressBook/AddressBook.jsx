import React from "react";
import "../account.scss";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

function AddressBook() {
  const navigate = useNavigate();
  return (
    <div className="main-card">
      <div className="card-heading">
        Address Book
        <Button
          onClick={() => navigate("/profile/new-address")}
          variant="contained"
          sx={{
            width: "10em",
            fontSize: "0.6em",
            height: "2.5em",
            padding: "0",
            backgroundColor: "skyblue",
            "&:hover": {
              backgroundColor: "#4a90e2",
            },
          }}
        >
          ADD NEW ADDRESS
        </Button>
      </div>
      <div className="container pb-2 pt-1">
        <div className="row">
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <div>
                  <p className="card-title">FirstName LastName</p>
                  <p className="card-text">
                    30 pius eze street, <br />
                    Iyana Ipaja (Aboru), Lagos
                  </p>
                </div>
                <div className="pt-4">
                  <p className="card-text" style={{ color: "green" }}>
                    Default Address
                  </p>
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between">
                SET AS DEFAULT
                <IconButton
                  onClick={() => navigate("/profile/default-address")}
                >
                  <EditIcon sx={{ color: "skyblue" }} />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressBook;
