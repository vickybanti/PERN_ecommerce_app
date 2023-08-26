import React from 'react'
import Skeleton from "./Skeleton"

function SkeletonProduct() {
  return (
    <div className='card'>
      <Skeleton classes="text width-50" />
      <Skeleton classes="text width-50" />
      <Skeleton classes="productTitle" />
      <Skeleton classes="productTitle" />
      <Skeleton classes="productTitle" />
      <Skeleton classes="productTitle" />
      <Skeleton classes="productTitle" />
      <Skeleton classes="productTitle" />
    </div>
  )
}

export default SkeletonProduct
