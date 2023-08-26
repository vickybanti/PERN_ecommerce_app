import React from 'react'

function Brands() {
  return (
    <div className='brands'>
    <p className='para'>Popular brands</p>
    <div className="brandedWears">
    <img
    className=" "
    src="uploads/shoes/IMG-20230405-WA0032.jpg"
    //src="https://clarks.scene7.com/is/image/Pangaea2Build/M_8TH_ST_SPORTS_Mobile?wid=705&fmt=webp"
    alt=""
    style={{width:"250px", height:"200px"}}
    
  />

  <button>Nike</button>
  </div>

  <div className="brandedWears">

  <img
    className=" "
    src="uploads/shoes/IMG-20230405-WA0028.jpg"
    alt=""
    style={{width:"250px", height:"200px"}}
  />

  <button>Versace</button>
    </div>
    
    <div className="brandedWears">

  <img
    className=" "
    src="uploads/shoes/3940543.jpg"
    alt=""
    style={{width:"250px", height:"200px"}}
  />

  <button>Leather Works</button>
  </div>

  <div className="brandedWears">

  <img
    className=" "
    src="Uploads/shoes/IMG-20230530-WA0017.jpg"
    alt=""
    style={{width:"250px", height:"200px"}}
  />

  <button>Leather jackets</button>
  </div>
    </div>
  )
}

export default Brands
