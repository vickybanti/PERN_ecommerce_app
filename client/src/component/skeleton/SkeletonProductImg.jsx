import React from 'react'
import Skeleton from './Skeleton'

function SkeletonProductImg() {
  return (
    <div className='card'>
      <Skeleton classes = "productimg" />
      <Skeleton classes="productsecondImg" />
    </div>
  )
}

export default SkeletonProductImg
