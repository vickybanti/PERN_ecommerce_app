import React from 'react'
import Skeleton from "./Skeleton"

function SkeletonImg() {
  return (
    <div className='card'>
      <Skeleton classes="img" />
      <Skeleton classes="text width-100" />
      <Skeleton classes="text width-50" />
      <Skeleton classes="text width-50" />
    </div>
  )
}

export default SkeletonImg
