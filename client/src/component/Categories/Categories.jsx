import React, {useState} from 'react'
import './Categories.scss'
import './bootstrap.css'
import { NavLink, useParams } from 'react-router-dom'
import useCat from '../../hooks/useCat';
import Button from '@mui/material/Button';
import useProCat from '../../hooks/useProCat';
import Zoom from '@mui/material/Zoom';
import { ZoomIn } from "@mui/icons-material";
import Fab from '@mui/material/Fab';



function Categories() {
    const title = [
        "spinach",
        "seeds",
        "cinnamon",
        "ketchup"
    ]
    
    return (
        
        <><div className='categoriesHeader'>
            <h1>Popular Categories</h1>
        </div><div className='categories'>


                <div className='column'>

                    <div className='rows'>
                    <h4 className="catheading">Discover trending categories</h4>
                        <img src="uploads/shoes/classic shoes.jpg" alt='' className='catimg'/>

                        <Button className="catbutton">

                            <NavLink style={{ color: "black" }} to={`products`}>Men's classic</NavLink>


                        </Button>
                    </div>
                </div>
                
                <div className='column column-large'>
                    <div className='rows'>
                                <img src="img/blog/2.jpg" alt='' className='catimg'/>

                                <Button className="catbutton">
                                    <NavLink style={{ color: "white" }} to={`products`}>Men's jacket</NavLink>

                                </Button>
                        </div>
                    <div className='rows'>
                    <img src="img/blog/3.webp" alt='' className='catimg'/>


                                <Button className="catbutton">
                                <NavLink to={`products`} style={{ color: "white" }}>

                                     Casual Sneakers
                                    </NavLink>


                                </Button>
                            </div>

                    
                    

                </div>


            </div></>    


   
          
          

    
          
    
        
        
        
        

        
        
        
    

       
  )
}

export default Categories


