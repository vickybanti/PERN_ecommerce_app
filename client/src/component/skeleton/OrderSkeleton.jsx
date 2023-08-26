import React from 'react'
import Skeleton from "./Skeleton"
import SkeletonProduct from './SkeletonProduct'
import OrderItems from './OrderItems'

function OrderSkeleton() {
  return (
    <><div className='card'>
          <Skeleton classes="orderImg" />
          <OrderItems />
          
         
      </div>
      </>
          

        
  )
}

export default OrderSkeleton
