import React , { useState} from 'react'
import "../../index.css"
import styles from './auth.module.scss'
import { AlternateEmailRounded, Google, Label, Lock, LoginOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseLogin, login } from '../../redux/apiCalls';
import { Button, CircularProgress, Divider, IconButton, Input, InputAdornment, OutlinedInput } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Link } from 'react-router-dom';




function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    
  const { isFetching,error,errorMessage } = useSelector((state => state.auth))
  const[message, setMessage] = useState("")

  console.log("EM",errorMessage)
  console.log("er",error)

    async function submitForm(e) {

      try {

        e.preventDefault();
        // if(!email){
        //   error.email="Email is required"
        // } else if(!password){
        //   error.password="Password is required"
        // }

        console.log(email)
        login(dispatch, {email, password})

        

        
        
      } catch (err) {
        console.error(err.message)
      }
      setMessage(errorMessage.errorMessage)

    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
  
    

  return (
    <>
    
    
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src="img/about/creative.svg" alt="Login" width={"400px"} />
      </div>

      <div className={styles.form}>
        <h2>Login</h2>
        
        <form onSubmit={submitForm}>
        
            <Input type='email' placeholder="email" value={email}
            onChange={(e)=>setEmail(e.target.value)} 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                <AlternateEmailIcon />
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
                  onMouseDown={handleMouseDownPassword}
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

            <Button type= "submit" variant="contained" sx={{boxShadow:"var(--box-shadow)",font:"Roboto",
         fontSize:"17px",padding:"7px 25px",
         fontWeight:"600",}} endIcon={<Login />} 
         id="submit" disabled={!email || !password} style={{fontSize:"15px"}}>
        
           
        <LoginOutlined />{isFetching?
          
          
          <CircularProgress sx={{color:"white"}}/>
          
          :"Login"}
          </Button>
            <span style={{color:"red"}}>{error && message}</span>
            <div className={styles.links}>
                <Link to="/reset"><span><Label />Forgot password?</span></Link>
            </div>
            <p></p>
            <Divider />

            {/*+1(201)416-6644*/}
        </form>
        <Button
        startIcon={<Google />}
          variant="outlined"
          fullWidth
          
          onClick={()=>firebaseLogin(dispatch)}
          
          sx={{fontSize:"15px", color:"grayText", fontFamily:"Arial",borderRadius:"5px",fontWeight:"900",
          

        }}
       
        >
        
        
         Login with Google

        </Button>
      
        <span className={styles.register}>
        
        <p>Don't have an account?</p> <Link to="/register"><span><Label />Register</span></Link>
        
        </span>
        </div>
    </section>
    </>
  )
}

export default Login
