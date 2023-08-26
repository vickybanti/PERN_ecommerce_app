import React from 'react'
import { useSelector } from 'react-redux'

function Cart() {

    const cart = useSelector((state) => state.cart.cartItems)
  return (
    <div>
    {cart.map((item) => (
        <h2>{item.title}</h2>
    ))}
      
    </div>
  )
}

export default Cart
