import React,{useState} from 'react';
import './Register.scss';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Register({setAuth}) {

  const [input, setInput] = useState({
    firstname:"",
    lastname:"",
    email:"",
    address:"",
    password:""
  });

  const {firstname, lastname, email, address, password} = input;


  function handleChange(e) {
    const {name,value} = e.target;
    setInput(input =>{
      return {
        ...input,
        [name]:value
      };
    });
  }

   const submitForm =  async (e) => {
    e.preventDefault()

    try {
      const body = {firstname, lastname, email, address, password} 
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
      const parseRes = await response.json()
      localStorage.setItem('token', parseRes.token)

      setAuth(true);
    } catch (err) {
      console.error(err.message);
      
    }
  }

  return (

    <div className="wait overlay">
    <div className="loader"></div>
    <div className='backImg'> 
    </div>
            <div className="login-box">
            <img src="/images/second.jpeg" className="avatar" />
                    <h1>  Customer Login Form </h1>
              <form onSubmit={submitForm}>
                <label for="email">Email</label>
                <input type="email"  name="email" value={email} required placeholder="Enter your email" onChange={ handleChange}/>
                <label for="firstname">First Name</label>
                <input type="text"  name="firstname" value={firstname} required placeholder="Enter your firstname" onChange={ handleChange}/>
                <label for="lastname">Lastname</label>
                <input type="text"  name="lastname" value={lastname} required placeholder="Enter your lastname" onChange={ handleChange}/>
                <label for="address">Address</label>
                <input type="text"  name="address" value={address} required placeholder="Enter your address" onChange={ handleChange}/>
              
                <label for="password">Password</label>
                <input type="password"  name="password" value={password} required  placeholder="Enter your password" onChange={ handleChange}/>
                <label for="password">Confirm password</label>

                <input type="password"  name="password" value={password} required  placeholder="Confirm password" onChange={ handleChange}/>

                <p><br/></p>
                
                              <button type="submit">Submit</button>
                   
                            <a href="#">Forgotten Password</a>
                <div><a>Create a new account?</a></div>						
              </form>
                          </div>
    </div>
  )
}

export default Register;
