import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/slice/cartSlice'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import "./Pay.scss"

function CheckoutSuccess() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userId = useSelector((state) => state.auth.userID)

  const [orderId, setOrderId] = useState("")
  useEffect(() => {
    async function getOrderId(){
      const response = await fetch(`https://mooreserver.onrender.com/order/id/${userId}`,{
        method: "GET"
      })
      const  allOrders = await response.json()
      console.log(allOrders)
      

      setOrderId(allOrders.order_id)


    }
    getOrderId()
  
   
  }, [userId])
  

  function handleClick(){
    dispatch(clearCart())
    navigate("/")

  }






  return (
    <div className='success'>
    <img src='img/about/happy.svg' alt='' className='successImg'/>

    <div className='pay-details'>
    
      <h2 >Checkout Successful. Your transaction id is {orderId} </h2>
    
      
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
