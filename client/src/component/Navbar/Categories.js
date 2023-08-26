import React from 'react'
import useCat from '../../hooks/useCat'
import styles from './Navbar.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';


function CategoriesBar() {

    const {catData} = useCat()
    return (
        <div className={styles.categories}>
        {catData.map((cat) => (
        <div className={styles.nav}>
        
        <ul className='ul'>
        
       
        <NavLink className="btn" style={{
            width: '100%',
            
            justifyContent: "center", alignItems:"center"}}
        to={`categories/${cat.id}`}>
       
        <li key={cat.id} style={{fontWeight:"100"}}> {cat.cat_title}</li>
        
       
        </NavLink>
        
        </ul>
        </div>
                   
    ))}
    </div>


   
  )
}

export default CategoriesBar
