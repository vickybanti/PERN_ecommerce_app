import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Input,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AlternateEmailRounded, Lock } from "@mui/icons-material";
import { toast } from "react-toastify";
import { logout } from "../../../redux/apiCalls";
import { makeRequest } from "../../../makeRequest";

function DeleteAccount() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.userID)
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const [showEmail, setEmail] = useState("")
  


  async function deleteAccount(e) {
    e.preventDefault()

    const body={
      email:showEmail,
      password:password
    }
    try {
      const del = await makeRequest.delete(`/auth/delete`,{
        body:JSON.stringify(body),
      })
      const deleteAcc = del.data
      if(deleteAcc){
        toast.success("Successfully deleted account...")
        logout(dispatch)
        navigate("/")

      }
    } catch (err) {
      console.error(err.message)
      toast.error(err.message)
    }
  }

  useEffect(()=>{
    async function getEmail(){
      const showEmail = await makeRequest.get(`/auth/user/${user}`)
      const emailJson = await showEmail.data
      console.log("info=",emailJson)

      setEmail(emailJson.email)
    }
    getEmail()
  },[user])
  console.log("showemail=",showEmail)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="col-md-12">

      <p className="card-heading">
        <IconButton onClick={() => navigate("/profile/manage")}>
          <ArrowBackIcon />
        </IconButton>
        Delete Account
      </p>
      <div className="card-container">
        <p className="card-heading mx-auto" style={{ textAlign: "center", fontSize: "20px", color: "black", padding:"30px" }}>
          We hate to see you go.
        </p>
        <p
          className="card-title"
          style={{ textAlign: "center", width: "100%", fontSize: "15px", color: "GrayText" }}
        >
          Before you delete your account, we would want you to know that this
          action will delete your data across all our platforms. If that's
          what you want, please proceed with entering your password to confirm
          that it's you.
        </p>
        <div>
        <form onSubmit={deleteAccount}>

<div className="main-card">
<br />
<br />
<br />
<br />

        <Input type='email' placeholder={showEmail} value={showEmail}
          
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmailRounded />
              </InputAdornment>
            ),
          }}
          disabled

          sx={{fontSize:"20px"}}
          fullWidth />

          <OutlinedInput type={showPassword ? "text" : "password"} 
          placeholder='password' 
          value={password}
          fullWidth  
          sx={{ marginBottom:"20px", marginTop:"20px", padding:"5px", fontSize:"20px"}}
          onChange={(e)=>setPassword(e.target.value)}
          required
          endAdornment={
            <InputAdornment position="end"
            
            sx={{color:"black", marginRight:"80px"}}>
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="inside"
                sx={{backgroundColor:"gray"}}
                
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          startAdornment={
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          }
          label="Password"

          />
    </div>
        <Button
          variant="contained"
          className="deletebtn"
          type="submit"
        >
          DELETE ACCOUNT
        </Button>
        </form>
      </div>
    </div></div>
  );
}

export default DeleteAccount;
