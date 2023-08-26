import React from 'react'
import { useDispatch } from 'react-redux'
import { clearCart } from '../../redux/slice/cartSlice'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import "./Pay.scss"

function CheckoutSuccess() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleClick(){
    dispatch(clearCart())
    navigate("/")

  }

  return (
    <div className='success'>
    <img src='img/about/happy.svg' alt='' className='successImg'/>

    <div className='pay-details'>
      <h2>Checkout Successful.</h2>
      <Button 
      variant='outlined'
      sx={{fontFamily:"Arial",
    fontSize:"15px"}}
      
      onClick={()=>handleClick()}>Continue Shopping</Button>
      </div>
      </div>

  )
}

export default CheckoutSuccess
