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
import { useEffect } from 'react';



function Categories() {
    const {catData} = useCat()
    const [title,setTitle] = useState([])

    useEffect(() => {
        catData.map((cat) => (
            setTitle(cat.cat_title)
        ))
    },[catData])

    

    console.log(title)

    
    
    return (
        
        <><div className='categoriesHeader'>
            <h1>Popular Categories</h1>
        </div>
        <div className='categories'>


                <div className='column'>

                    <div className='rows'>
                    <h4 className="catheading">Discover trending categories</h4>
                        <img src="uploads/shoes/classic shoes.jpg" alt='' className='catMain'/>

                        <Button className="mainButton">

                            <NavLink style={{ color: "white" }} to={`categories/leather shoes`}>Men's classic</NavLink>


                        </Button>
                    </div>
                </div>
                
                <div className='column column-large'>
                <div className='tag'>HOT</div>
                    <div className='rows'>
                    

                    <div className='hot'>

                    
                                <img src="img/blog/2.jpg" alt='' className='catimg'/>

                                <Button className="catbutton">
                                    <NavLink style={{ color: "white" }} to={`categories/jackets}`}>Men's jacket</NavLink>

                                </Button>
                    </div>
                        

                    <div className='hot'>

                        <img src="uploads/shoes/IMG-20230405-WA0064 (1).jpg" alt='' className='catimg'/>

                        <Button className="catbutton">
                            <NavLink style={{ color: "white" }} to={`categories/jackets}`}>Classic flips</NavLink>

                        </Button>
                        </div>
                </div>
                
                <div className='sale'>SALE</div>

                <div className='rows'>
                <div className='hot'>

                
                <img src="uploads/unisex.jpg" alt='' className='catimg'/>

                <Button className="catbutton">
                    <NavLink style={{ color: "white" }} to={`categories/jackets}`}>Unisex jacket</NavLink>

                </Button>
                </div>
        
                    <div className='hot'>
                    <img src="img/blog/3.webp" alt='' className='catimg'/>


                                <Button className="catbutton">
                                <NavLink to={`brands/Nike` || `brands/Addidas`} style={{ color: "white" }}>

                                     Top Sneakers
                                    </NavLink>


                                </Button>
                                </div>
                                </div>
                            

                    
                    

                </div>


            </div></>    


   
          
          

    
          
    
        
        
        
        

        
        
        
    

       
  )
}

export default Categories


