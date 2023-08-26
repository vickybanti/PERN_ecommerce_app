import React from 'react'
import './FeaturedProducts.scss'
import { ShoppingBag } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

function Discount() {
  const navigate = useNavigate()
  return (
    
    <>
    <div className='discount'>

      
      <h3>FREE SHIPPING ON ORDERS OVER $50</h3>
      <h2>USE PROMO CODE <b>SHIPPERZ</b></h2>
      <div className='button'>
          <button onClick={()=>navigate("/products")}>
          <ShoppingBag fontSize='30px'/>
          Shop </button>
          
          </div>
          </div>
        </>
    
  )
}

export default Discount
