import React, { useRef, useState } from 'react'
import "../../index.css"
import styles from './auth.module.scss'
import { Link } from 'react-router-dom';
import { BackHand } from '@mui/icons-material';
import emailjs from '@emailjs/browser'


function Reset() {
  const [email, setEmail] = useState("")
  



    const [success, setSuccess] = useState(null)
   const ref = useRef()

  const handleSubmit = (e,email) => {
    e.preventDefault()

    const templateParams = {
      email: ref.current.email.value,
      message: 'http://localhost:5000/auth/reset',
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
    <section className={`container ${styles.auth}`}>
      
      <div className={styles.form}>
        <h2>Reset Password</h2>
        
        <form onSubmit={handleSubmit} ref={ref} id="myForm" email={email}>
            <input type='text' placeholder='Email' value={email}
            onChange={(e)=>setEmail(e.target.value)}/>

            <button type="submit" className='--btn --btn-primary --btn-block'>Reset Password</button>
            </form>

            <div className={styles.links}>
              <p>
              <BackHand />  <Link to="/login">Go back to Login</Link>
              </p>
            </div>
            {success && "reset link has been sent to your email"}
      
        
        </div>
        

       

    </section>
  )
}

export default Reset
