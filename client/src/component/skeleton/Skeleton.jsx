import './Skeleton.css'

import React from 'react'

function Skeleton({classes}) {

    const classNames = `skeleton ${classes} animate-pulse`
    
  return (
    <div className={classNames}>   
    </div>
  )
}

export default Skeleton
