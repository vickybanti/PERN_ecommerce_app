import React , { useState} from 'react'
import styles from './auth.module.scss'
import { AlternateEmailRounded, Label, Lock, LoginOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/apiCalls';
import { Button, CircularProgress, Divider, IconButton, Input, InputAdornment, OutlinedInput } from '@mui/material';
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
      

      <div className={styles.form}>
      <div className='heading'>
        <h2>Welcome to admin page</h2>
        <p>Login to get control</p>

        </div>
        
        <form onSubmit={submitForm}>
        
            <Input type='email' placeholder="email" value={email}
            onChange={(e)=>setEmail(e.target.value)} 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailRounded />
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
                  sx={{color:"white"}}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            startAdornment={
              <InputAdornment position="start">
                <Lock sx={{color:"white"}}/>
              </InputAdornment>
            }
            label="Password"
            />

            
            <Button type= "submit"
        variant='contained'
        fullWidth
        sx={{backgroundColor:"Highlight"}}
        id="submit" disabled={!email || !password} style={{fontSize:"20px"}}
       
        >
        <LoginOutlined />{isFetching?
          
          
          <CircularProgress sx={{color:"white"}}/>
          
          :"Login"}</Button>
            <span>{error && message}</span>
            <div className={styles.links}>
                <Link to="/reset"><h4><Label />Reset Password</h4></Link>
            </div>
            <p></p>
            <Divider />

            {/*+1(201)416-6644*/}
        </form>

      
        
        </div>
    </section>
    </>
  )
}

export default Login
