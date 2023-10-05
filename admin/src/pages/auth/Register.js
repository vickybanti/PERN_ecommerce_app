import React, { useState } from 'react'
import "../../index.css"
import styles from './auth.module.scss'
import { Link, useNavigate } from 'react-router-dom';
import { Google, Label, LoginOutlined, Mail, Password } from '@mui/icons-material';
import Loader from '../../component/loader/Loader';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Input } from '@mui/material';
import { firebaseLogin } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';




function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const dispatch = useDispatch()

    const [message, setMessage] = useState("")

    const[isLoading, setLoading] = useState(false);
    const navigate = useNavigate()

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
        
            const body = {email, password} 
            const response = await fetch("http://localhost:5000/auth/register", {
              method: "POST",
              headers: {"Content-Type": "application/json"},
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
             setMessage("User already exists or enter a valid email")
            
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
    

    {isLoading && "Loading..."}
    <section className={`container ${styles.auth}`}>
      
      <div className={styles.form}>
        <h2>Register</h2>
        
        <form onSubmit={registerUser}>
        <Input type='email' placeholder="email" value={email}
        onChange={(e)=>setEmail(e.target.value)} endIcon=<Mail /> fullWidth/>
        <Input type='password' placeholder='password' value={password}
        onChange={(e)=>setPassword(e.target.value)} fullWidth endIcon=<Password/> sx={{ marginBottom:"20px"}}/>

        <Input type='password' placeholder='confirm password' value={cPassword}
        onChange={(e)=>setCPassword(e.target.value)} fullWidth endIcon=<Password/> sx={{ marginBottom:"20px"}}/>
        <Button type= "submit"
        variant='contained'
        fullWidth
        sx={{backgroundColor:"Highlight"}}
        id="submit" disabled={!email || !password} style={{fontSize:"20px"}}>
        <LoginOutlined />{isLoading?"Loading...":"Register"}</Button>
        <h2>{message}</h2>
            
        <span className={styles.register}>
        
        <p>Already registered?</p><Link to="/login"><h4><Label />Login</h4></Link>
        
        </span>   
        </form>
        <Button
        
        variant="contained"
        endIcon={<Google />}
        onClick={()=>firebaseLogin(dispatch)}
        fullWidth
        sx={{fontSize:"20px", color:"white", backgroundColor:"black"
      }}
     
      >
      
      
       Login with Google

      </Button>      
        
        </div>
        

        <div className={styles.img}>
        <img src="img/about/creative.svg" alt="Register" width={"400px"} height={"500px"} />
      </div>

    </section>
    </>
  )
}

export default Register
