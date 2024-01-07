import { Skeleton } from '@mui/material'
import React from 'react'

function OrderItems() {
  return (
    <><Skeleton variant="rectangular" width={210} height={118} /><div style={{ display: "flex", flexDirection: "column" }}>

      <Skeleton variant="rectangular" width={210} height={118} />
      <Skeleton variant="rectangular" width={120} height={78} />
      <Skeleton variant="rectangular" width={120} height={78} />


    </div></>

        
  )
}

export default OrderItems
