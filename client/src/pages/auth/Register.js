import React, { useState } from 'react'
import "../../index.css"
import styles from './auth.module.scss'
import { Link, useNavigate } from 'react-router-dom';
import { AlternateEmail, Google, Label, LockSharp, LoginOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import 'react-toastify/dist/ReactToastify.css';
import { Button, CircularProgress, IconButton, Input, InputAdornment, OutlinedInput } from '@mui/material';
import { firebaseLogin } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';
import { makeRequest } from '../../makeRequest';




function Register() {
    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [showCPassword, setShowCPassword] = useState(false)


    const [message, setMessage] = useState("")

    const[isLoading, setLoading] = useState(false);
    const navigate = useNavigate()
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowCPassword = () => setShowCPassword((show) => !show);

    
  

    async function registerUser(e, res) {
      e.preventDefault();
          console.log(email,password);
          if (password !==cPassword) {
              setMessage("Passwords do not match")
           }
           else if( password.length <6 ){
              setMessage("Password is less than 6 characters")
           }
           else{
        try {
         
            const body = {email, password,firstname} 
            const response = await makeRequest.post("/auth/register", {
              
              body: JSON.stringify(body)
            });
            const parseRes = await response.json()
            if (parseRes) {
                console.log(parseRes)
                localStorage.setItem('token', parseRes.token)
                setMessage("User registration successful")
                navigate("/login") 
                 
            }
            
            else {
             setMessage("User already exists")
            }
            setLoading(false)
            
          } 
         catch (err) {
             setMessage(err.message)
            
          }
    }
        // registration with firebase
  //       createUserWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   // Signed in 
  //   setLoading(true)
  //   const user = userCredential.user;
  //   console.log(user)
  //   setLoading(false)
  //   toast.success("User registration successful")
  //   navigate("/login")

  //   // ...
  // })
  // .catch((error) => {
  //   toast.error(error.message)
  //   // ..
  // });
    }
    
  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <>
    //add ToastContainer 
    

    {isLoading && <CircularProgress />}
    <section className={`container ${styles.auth}`}>
      
      <div className={styles.form}>
        <h2>Register</h2>
        
        <form onSubmit={registerUser}>
        <Input type='text' placeholder="firstname" value={firstname}
        onChange={(e)=>setFirstname(e.target.value)}  fullWidth/>
        <Input type='email' placeholder="email" value={email}
        onChange={(e)=>setEmail(e.target.value)} 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AlternateEmail />
            </InputAdornment>
          ),
        }}

        
        required 
        
        fullWidth/>
        
        <OutlinedInput type={showPassword ? "text" : "password"} 
        placeholder='password' 
        value={password}
        fullWidth  
        sx={{ marginBottom:"20px", marginTop:"20px"}}
        onChange={(e)=>setPassword(e.target.value)}
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
            <LockSharp />
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
            <LockSharp />
          </InputAdornment>
        }
        label="Password"
        />
    <Button type= "submit"
        variant='contained'
        fullWidth
        sx={{backgroundColor:"Highlight"}}
        id="submit" disabled={!email || !password || !firstname} style={{fontSize:"20px"}}>
        <LoginOutlined />{isLoading?"Loading...":"Register"}</Button>
        <h4 style={{color:"red", fontWeight:200}}>{message}</h4>
            
        <span className={styles.register}>
            <p>Already have an account?</p> <Link to="/login" style={{paddingTop:"3px"}}><Label /> Login</Link>
          </span>
        </form>
        <button
            className={styles.logbtn}
            
            onClick={() => firebaseLogin(dispatch)}
          >
          <img alt="google" src="./img/auth.svg" className="google" style={{width:"30px", height:"30px", padding:"5px"}}/>
          
            Login with Google
          </button>

        </div>
        

        <div className={styles.img}>
        <img src="img/about/creative.svg" alt="Register" width={"400px"} height={"500px"} />
      </div>

    </section>
    </>
  )
}

export default Register
