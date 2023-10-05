import React from 'react'
import Skeleton from "./Skeleton"

function SkeletonImg() {
  return (
    <div className='card'>
      <Skeleton classes="img" />
      <Skeleton classes="text width-100" />
      <div className='width' style={{display:"flex",justifyContent:"space-between"}}>
      <Skeleton classes="text width-25" />
      <Skeleton classes="text width-25" />
      </div>
    </div>
  )
}

export default SkeletonImg
