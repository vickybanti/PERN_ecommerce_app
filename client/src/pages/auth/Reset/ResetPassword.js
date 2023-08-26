import React, { useState } from 'react'
import "../../../index.css"
import styles from '../auth.module.scss'
import { Link } from 'react-router-dom';
import { BackHand, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { Backdrop, IconButton, InputAdornment, OutlinedInput } from '@mui/material';

function ResetPassword() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showCPassword, setShowCPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowCPassword = () => setShowCPassword((show) => !show);





  async function resetPassword(e) {
    e.preventDefault()
    const body = {
      password:password,
      newPassword:newPassword,
      email:email,
    }

    

    if(newPassword !== cPassword){
      toast.error("New passwords does not tally")
    }
    try {
      const pass = await fetch(`http://localhost:5000/auth/reset`,{
        method: "PUT",
        body:JSON.stringify(body), 
        headers:{"Content-Type":"application/json"}
      })
      const resetPass = await pass.json()
      console.log(resetPass)
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <section className={`container ${styles.auth}`}>
      
      <div className={styles.form}>
        <h2>Reset Password</h2>
        
        <form onSubmit={resetPassword}>
            <input type='text' placeholder='Email' value={email}
            onChange={(e)=>setEmail(e.target.value)}/>

            

            <OutlinedInput type={showPassword ? "text" : "password"} 
            placeholder='password' 
            value={newPassword}
            fullWidth  
            sx={{ marginBottom:"20px", marginTop:"20px"}}
            onChange={(e)=>setNewPassword(e.target.value)}
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleClickShowPassword}
                  edge="inside"
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

            <OutlinedInput type={showCPassword ? "text" : "password"} 
            placeholder='password' 
            value={cPassword}
            fullWidth  
            sx={{ marginBottom:"20px", marginTop:"20px"}}
            onChange={(e)=>setCPassword(e.target.value)}
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowCPassword}
                  onMouseDown={handleClickShowCPassword}
                  edge="inside"
                >
                  {showCPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            startAdornment={
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            }
            label="confirm password"
            />
            <button type="submit" className='--btn --btn-primary --btn-block'>Reset Password</button>
            </form>

            <div className={styles.links}>
              <p>
              <Backdrop />  <Link to="/login">Go back to Login</Link>
              </p>
            </div>
      
        
        </div>
        

        

    </section>
  )
}

export default ResetPassword
