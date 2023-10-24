import React from 'react'
import Skeleton from "./Skeleton"
import OrderItems from './OrderItems'

function OrderSkeleton() {
  return (
    <><div className='card'>
    <div style={{display:"flex", justifyContent:"space-between"}} >
        <Skeleton classes="orderImg" />
        <Skeleton classes="text width-25" />
        <Skeleton classes="text width-25" />
        <Skeleton classes="text width-25" />
        <Skeleton classes="text width-25" />
        
      </div>

          
          
         
      </div>
      </>
          

        
  )
}

export default OrderSkeleton
