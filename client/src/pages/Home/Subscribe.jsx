import React from 'react'
import styled from 'styled-components'
import SendIcon from '@mui/icons-material/Send';
import './Home.scss';
import { Button } from '@mui/material';



function Newsletter() {
  return (
    <div className='container'>
      <div className='title'>NEWSLETTER</div>
      <div className='description'>GET DAILY UPDATES FROM OUR NEWSLETTER</div>
      <div className='inputContainer'>
        <input placeholder='Enter your email here...'/>
        <Button sx={{backgroundColor:"#27374D"}}>
          <SendIcon />
        </Button>
        
      </div>
    </div>

    
  )
}

export default Newsletter
