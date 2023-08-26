import React from 'react'
import "./Footer.scss"
import useCat from '../../hooks/useCat'
import { Email, FacebookSharp, Instagram, LocationCity, Phone, Twitter } from '@mui/icons-material'


function Footer() {
  const {catData} = useCat()
  return (
    <div className='footer'>
      <div className="top">

      <div className='item'>
      <h1>About</h1>
      <span>
        Enjoy lovely discount on our platform
        
      </span>
      <span>
       <LocationCity sx={{color: "whitesmoke"}}/>   Port Harcourt, Nigeria          
      </span>
      <span>
        <Phone sx={{color: "whitesmoke"}}/>+2349064139313         
      </span>
      <span>
        <Email sx={{color: "whitesmoke"}}/> olamuyiwavictor55@gmail.com        
      </span>
      <span>
      
        <FacebookSharp className='icons'/> 
        <Instagram className='icons'/>
        <Twitter className='icons'/>
      </span>
    </div>
        <div className='item'>
          <h1>Categories</h1>
          {catData.map((cat)=>(
            <span>{cat.cat_title}</span>

          ))}
          

        </div>

        <div className='item'>
          <h1>Links</h1>
          <span>FAQ</span>
            <span>Homepage</span>
            <span>Latest project</span>
            <span>Stores</span>

        </div>

       
        
      </div>
      <div className='bottom'>
        <div className='left'>
          <span className='logo'>MOOREPLAZA</span>
          <span className='copyright'>
            Copyright 2023, All rights reserved
            </span>
          <div className='right'>
            <img src='img/payment.png' alt="payment" />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Footer
