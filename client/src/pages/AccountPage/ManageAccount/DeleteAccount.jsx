import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AlternateEmailRounded, FunctionsOutlined, Lock } from "@mui/icons-material";
import { toast } from "react-toastify";

function DeleteAccount() {
  const user = useSelector((state) => state.auth.userID)
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const [showEmail, setEmail] = useState("")


  async function deleteAccount(e) {
    e.preventDefault()
    try {
      const del = await fetch(`http://localhost:5000/auth/delete/${user}`,{
        method:"DELETE",
        body:JSON.stringify({password:password, user:user}),
        headers: {"Content-Type": "application/json"}
      })
      const deleteAcc = del.json()
      if(!deleteAcc){
        toast.error("Cannot delete account")
      }
    } catch (err) {
      console.error(err.message)
      toast.error(err.message)
    }
  }

  useEffect(()=>{
    async function getEmail(){
      const showEmail = await fetch(`http://localhost:5000/auth/user/${user}`,{
        method:"GET"
      })
      const emailJson = await showEmail.json()

      setEmail(emailJson[0].email)
    }
    getEmail()
  },[user])
  console.log(showEmail)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="main-card">

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
          action will delete your data across all Ayaba platforms. If that's
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
          sx={{ marginBottom: "20px", marginTop: "20px", height:"80px", fontSize:"20px"}}
          onChange={(e) => setPassword(e.target.value)}
          required
          endAdornment={<InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              position="end"
              sx={{backgroundColor:"black"}}

            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>}
          startAdornment={<InputAdornment position="start">
            <Lock />
          </InputAdornment>}
          label="Password" />
    </div>
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
