import { Box, Skeleton } from '@mui/material'
import React from 'react'

function SkeletonProductImg() {
  return (
    <div className='card'>
    <Skeleton variant="rectangular" width={450} height={350} />
    <Box sx={{ pt: 0.5, display:"flex", justifyContent:"space-between" }}>
    <Skeleton width={190} height={200}/>
    <Skeleton width={190} height={200}/>
    <Skeleton width={190} height={200}/>
  </Box>

  <Box sx={{position:"absolute", marginLeft:"700px"}}>
  <Skeleton width={300} height={50}/>
  <Skeleton width={300} height={50}/>
  <Skeleton width={300} height={120}/>
  <Skeleton width={150} height={80} sx={{mt:"0.2"}}/>
  <Skeleton width={150} height={30} sx={{mt:"0.2"}}/>
  <Skeleton width={300} height={50} sx={{mt:"0.2"}}/>
  
  </Box>
    </div>
  )
}

export default SkeletonProductImg
