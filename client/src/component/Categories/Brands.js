import React from 'react'
import './Brands.css'

function Brands() {
  return (
    <div className='brands'>
    <h2 style={{fontSize:"60px", color:"GrayText"}}>Popular brands</h2>
    <div className="brandedWears">
    <img
    className="brandedimg"
    src="uploads/shoes/IMG-20230405-WA0032.jpg"
    //src="http://clarks.scene7.com/is/image/Pangaea2Build/M_8TH_ST_SPORTS_Mobile?wid=705&fmt=webp"
    alt=""
    style={{width:"300px", height:"400px"}}
    
  />

  <button style={{fontSize:"20px", margin:"50% 0", cursor:"pointer"}}>Nike</button>
  </div>

  <div className="brandedWears">

  <img
    className="brandedimg"
    src="uploads/shoes/IMG-20230405-WA0028.jpg"
    alt=""
    style={{width:"300px", height:"400px"}}
  />

  <button style={{fontSize:"20px", margin:"50% 0", cursor:"pointer"}}>Versace</button>
    </div>
    
    <div className="brandedWears">

  <img
    className=" brandedimg"
    src="uploads/shoes/3940543.jpg"
    alt=""
    style={{width:"320px", height:"400px"}}
  />

  <button style={{fontSize:"20px", margin:"50% 0", cursor:"pointer"}}>Leather Works</button>
  </div>

  <div className="brandedWears">

  <img
    className="brandedimg"
    src="Uploads/shoes/IMG-20230530-WA0017.jpg"
    alt=""
    style={{width:"300px", height:"400px"}}
  />

  <button style={{fontSize:"20px", margin:"50% 0", cursor:"pointer"}}>Leather jackets</button>
  </div>
    </div>
  )
}

export default Brands
