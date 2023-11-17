import React, { useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import '../account.scss'
import { makeRequest } from "../../../makeRequest";

function NewAddress() {
  const navigate = useNavigate();
  const userId = useSelector((state)=>state.auth.userID)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [street, setStreet] = useState("")
  const [state, setState] = useState("")
  const [message, setMessage] = useState("")
    
   
    async function addAddress(e){
      e.preventDefault()
      const requestBody = {
        userId,
        country:country,
        city:city,
        state:state,
        street1:street,
        firstName:firstName,
        lastName :  lastName
      }
      console.log(requestBody)

      if (!state || !firstName || !lastName || !country || !state || !street || !city) {
        setMessage("Incomplete address...")
      } else {
      try {
        const defaultAdd = await makeRequest.post(`/order/address`,{
          body:JSON.stringify(requestBody)
        })
        const confirm = await defaultAdd.data
        if(confirm){
          setMessage(
            "Successful"
          )
        }
        
      } catch (err) {
        console.error(err.message)
        toast.error(err.message)
      }
    }
  }

  


  return (
    <div className="main-card">
      <p className="card-header header px-0">
        <IconButton onClick={() => navigate("/profile/address")}>
          <ArrowBackIcon />
        </IconButton>
        Add a New Address
      </p>
      <div className="card-container">
        <div className="card-body">
        <form onSubmit={addAddress}>
          <div className="col-md-6">
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}

            />
          </div>
          <div className="col-md-12">
            <TextField
              fullWidth
              margin="normal"
              label="Delivery Address"
              variant="outlined"
              value={street}
              onChange={(e)=>setStreet(e.target.value)}

            />
          </div>
          <div className="col-md-6">
            <TextField
              fullWidth
              margin="normal"
              label="City"
              variant="outlined"
              value={city}
              onChange={(e)=>setCity(e.target.value)}

            />
          </div>
          <div className="col-md-6">
            <TextField
              fullWidth
              margin="normal"
              label="State"
              variant="outlined"
              value={state}
              onChange={(e)=>setState(e.target.value)}

            />
          </div>
          <div className="col-md-6">
            <TextField
              fullWidth
              margin="normal"
              label="Country"
              variant="outlined"
              value={country}
              onChange={(e)=>setCountry(e.target.value)}

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
          <span style={{textAlign:"center", fontSize:"20px", fontWeight:"400", transition:"2s ease-out all", color:"gray"}}>{message}</span>

          <br />
          <br />
          <br />
          <br />
          <br />
            <Button
              variant="contained"
              sx={{
                width: "60%",
                fontSize: "1.1em",
                backgroundColor: "skyblue",
                height:"50px",
                marginBottom:"20px",
                "&:hover": {
                  backgroundColor: "#4a90e2",
                },
              }}
              type="submit"
            >
              SAVE ADDRESS
            </Button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewAddress;
