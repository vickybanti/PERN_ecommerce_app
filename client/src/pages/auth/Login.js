import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress, Divider, IconButton, Input, InputAdornment, OutlinedInput } from '@mui/material';
import {  AlternateEmail, Label, LoginOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { Lock } from '@mui/icons-material';
import { Google } from '@mui/icons-material';
import { firebaseLogin, login } from '../../redux/apiCalls';
import { Link } from 'react-router-dom';
import styles from './auth.module.scss';
import '../../index.css';
 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isFetching, error, errorMessage } = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      // Uncomment this block if you want to perform email and password validation
      // if (!email) {
      //   setError((prev) => ({ ...prev, email: 'Email is required' }));
      // } else if (!password) {
      //   setError((prev) => ({ ...prev, password: 'Password is required' }));
      // }

      console.log(email);
      login(dispatch, { email, password });
    } catch (err) {
      setMessage(errorMessage.errorMessage);
    }

    setMessage(errorMessage.errorMessage);

  };


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src="img/about/creative.svg" alt="Login" width={'400px'} />
        </div>

        <div className={styles.form}>
          <h2>Login</h2>

          <form onSubmit={submitForm}>
            <OutlinedInput
              type="email"
              aria-placeholder=<AlternateEmail />
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
              startAdornment={
                <InputAdornment position="start">
                  <AlternateEmail />
                </InputAdornment>
              }

              endAdornment={
                <InputAdornment position="end">
                  
                </InputAdornment>
              }
               
              required
              fullWidth
              sx={{ marginBottom: '20px', marginTop: '20px',font:'Arial',fontWeight:'800' }}

            />

            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              fullWidth
              sx={{ marginBottom: '20px', marginTop: '20px',font:'Arial', fontWeight:'800' }}
              onChange={(e) => setPassword(e.target.value)}
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
            />
                      <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          sx={{
                              boxShadow: 'var(--box-shadow)',
                              font: 'Arial',
                              fontSize: '17px',
                              padding: '7px 25px',
                              fontWeight: '600',
                          }}
                          endIcon={<LoginOutlined sx={{ color: 'white' }} />}
                          id="submit"
                          disabled={!email || !password}
                          style={{ fontSize: '20px' }}
                      >
                          {isFetching ? (
                              <CircularProgress sx={{ color: 'white' }} />
                          ) : (
                              'Login'
                          )}
                      </Button>

            <div className={styles.links}>
              <Link to="/reset">
                Forgot password?
              </Link>
            </div>
            <p></p>
            <Divider />
          </form>

          <button
            className={styles.logbtn}
            
            onClick={() => firebaseLogin(dispatch)}
          >
          <img alt="google" src="./img/auth.svg" className="google" style={{width:"30px", height:"30px", padding:"5px"}}/>
          
            Login with Google
          </button>

          <span className={styles.register}>
            <p>Don't have an account?</p> <Link to="/register" style={{marginBottom:"4px"}}><Label /> Register</Link>
          </span>
          <span style={{ color: 'red' }}>{error && message}</span>

        </div>
      </div>
    </>
  );
}

export default Login;
