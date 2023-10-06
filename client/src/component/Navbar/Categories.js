import React from 'react'
import useCat from '../../hooks/useCat'
import styles from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';


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
        to={`categories/${cat.cat_title}`}>
       
        <li key={cat.id} style={{fontWeight:"100"}}> {cat.cat_title}</li>
        
       
        </NavLink>
        
        </ul>
        </div>
                   
    ))}
    </div>


   
  )
}

export default CategoriesBar
