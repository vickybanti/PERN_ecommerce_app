import { Box, Skeleton } from '@mui/material'
import React from 'react'


function SkeletonImg() {
  return (
    <div className='card'>
    <Skeleton variant="rectangular" width={250} height={350} />
    <Box sx={{ pt: 0.5 }}>
    <Box sx={{display:"flex", justifyContent:"space-between"}}>
    <Skeleton width="75%" />
    <Skeleton width="10%" />
    </Box>
    <Skeleton width="60%" sx={{marginLeft:"100px"}}/>
  </Box>
    </div>
  )
}

export default SkeletonImg
