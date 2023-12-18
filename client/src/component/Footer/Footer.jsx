import React from 'react'
import "./Footer.scss"
import useCat from '../../hooks/useCat'
import useBrands from '../../hooks/useBrands'
import { Email, FacebookSharp, Instagram, LocationCity, Phone, Twitter } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'


function Footer() {
  const {catData} = useCat()
  const {brandData} = useBrands()
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
        <NavLink to={`aboutus`}>About our company</NavLink>
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
            <span><NavLink to={`categories/${cat.cat_title}`}>{cat.cat_title}</NavLink></span>

          ))}
          

        </div>

        <div className='item'>
          <h1>Popular brands</h1>
          {brandData.map((brand)=>(
            <span key={brand.id}><NavLink to={`brands/${brand.brand_title}`}>{brand.brand_title}</NavLink></span>
          ))}
          
            

        </div>

        <div className='item'>
        <h1>FAQ</h1>
        
          <span><NavLink to={`frequent`}>Frequent questions</NavLink></span>
          <span><NavLink to={`shipping`}>Shipping policy</NavLink></span>
          <span><NavLink to={`returns`}>Return Policy</NavLink></span>
        
        
          

      </div>

       
        
      </div>
      <div className='bottom'>
        <div className='left'>
          <span className='logo'>MOORESTORE</span>
          <span className='copyright'>
            Copyright 2023, All rights reserved
            </span>
        <div className='middle'>
            
            <NavLink to={`termsAndConditions`}>
            <span className='terms'>
              Terms and conditions
            </span>
            </NavLink>

        </div>




          <div className='right'>
            <img src='img/payment.png' alt="payment" />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Footer
