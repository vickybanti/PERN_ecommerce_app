import React from 'react'
import './Brands.css'
import { NavLink } from 'react-router-dom'

function Brands() {
  return (
    <div className='brands'>
    <h2 style={{fontSize:"60px", color:"GrayText"}}>Popular brands</h2>
    <div className="brandedWears">
    <NavLink to="/brands/nike">

    <img
    className="brandedimg"
    src="uploads/shoes/IMG-20230405-WA0032.jpg"
    //src="http://clarks.scene7.com/is/image/Pangaea2Build/M_8TH_ST_SPORTS_Mobile?wid=705&fmt=webp"
    alt=""
    style={{width:"200px", height:"200px", marginRight:"10px"}}

    
  />


  <button style={{fontSize:"20px", margin:"50% 0", cursor:"pointer"}}>Nike</button>
  </NavLink>
  </div>

  <div className="brandedWears">
  <NavLink to="/brands/versace">


  <img
    className="brandedimg"
    src="uploads/shoes/IMG-20230405-WA0028.jpg"
    alt=""
    style={{width:"200px", height:"200px", marginRight:"10px"}}

  />

  <button style={{fontSize:"20px", margin:"50% 0", cursor:"pointer"}}>Versace</button>
  </NavLink>  
  </div>
    
    <div className="brandedWears">

  <img
    className=" brandedimg"
    src="uploads/shoes/IMG-20230405-WA0031.jpg"
    alt=""
    style={{width:"200px", height:"200px", marginRight:"10px"}}

  />

  <button style={{fontSize:"20px", margin:"50% 0", cursor:"pointer"}}>
  <NavLink to="/brands/puma">
  <button>
    puma
  </button>

  
  </NavLink>
  </button>
  </div>

  <div className="brandedWears">
  <NavLink to="/categories/jackets">


  <img
    className="brandedimg"
    src="Uploads/shoes/IMG-20230530-WA0011.jpg"
    alt=""
    style={{width:"200px", height:"200px", marginRight:"10px"}}

  />

  <button style={{fontSize:"20px", margin:"50% 0", cursor:"pointer"}}> jackets</button>
 </NavLink>
  </div>
    </div>
  )
}

export default Brands
