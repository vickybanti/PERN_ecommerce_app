import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import SendIcon from '@mui/icons-material/Send';
import './Home.scss';
import { Button, Input } from '@mui/material';
import emailjs from '@emailjs/browser'




function Newsletter() {

  const [success, setSuccess] = useState(null)
  const ref = useRef()

 const handleSubmit = (e) => {
   e.preventDefault()

   const templateParams = {
     email: ref.current.email.value,
     message:"A new subscriber to our newsletter"
   };

   emailjs.sendForm('service_bqlyqeq','template_5yyxifj', ref.current,'U2D7hh_TfmUqWH5qi')
 .then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
    setSuccess(true)
 }, function(err) {
    console.error('FAILED...', err);
 });
 }




  return (
    <div className='container'>
      <div className='title'>NEWSLETTER</div>
      <div className='description'>GET DAILY UPDATES FROM OUR NEWSLETTER</div>
      <form onSubmit={handleSubmit} ref={ref} id="myForm">
      <div className='inputContainer'>
        <input placeholder='Enter your email here...' name="email" style={{fontSize:"20px", width:"400px"}}/>
        <Button sx={{backgroundColor:"#27374D"}} type="submit">
          <SendIcon />
        </Button>   

      </div>
      </form>

      {success && <p style={{color:"black", fontSize:"15px"}}>You've subscribed to our newsletter</p>}

    </div>

    
  )
}

export default Newsletter
