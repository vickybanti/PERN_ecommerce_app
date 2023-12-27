import React, {useState} from 'react'
import './bootstrap.css'
import { NavLink } from 'react-router-dom'
import useCat from '../../hooks/useCat';
import Button from '@mui/material/Button';
import { useEffect } from 'react';



function Popular() {
    const {catData} = useCat()
    const [title,setTitle] = useState([])

    useEffect(() => {
        catData.map((cat) => (
            setTitle(cat.cat_title)
        ))
    },[catData])

    

    console.log(title)

    
    
    return (
        
        
            <><h2>Popular Categories</h2>
            <div className='categories'>


            <div className='col col-xs'>

                <div className='row'>
                    <h4 className="catheading">Discover trending categories</h4>
                    <img src="uploads/shoes/classic shoes.jpg" alt=''  />

                    <Button className="catbutton">

                        <NavLink style={{ color: "black" }} to={`categories/leather shoes`}>Men's classic</NavLink>


                    </Button>
                </div>
            </div>

            <div className='col col-lg'>
                <div className='row'>
                    <img src="img/blog/2.jpg" alt=''  />

                    <Button className="catbutton">
                        <NavLink style={{ color: "white" }} to={`categories/jackets}`}>Men's jacket</NavLink>

                    </Button>
                </div>
                <div className='row'>
                    <img src="img/blog/3.webp" alt=''  />


                    <Button className="catbutton">
                        <NavLink to={`brands/Nike` || `brands/Addidas`} style={{ color: "white" }}>

                            Top Sneakers
                        </NavLink>


                    </Button>
                </div>




            </div>


        </div></>  


   
          
          

    
          
    
        
        
        
        

        
        
        
    

       
  )
}

export default Popular


