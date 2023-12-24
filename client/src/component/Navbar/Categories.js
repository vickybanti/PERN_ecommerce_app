import React from 'react'
import useCat from '../../hooks/useCat'
import styles from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import './Navbar.module.scss'


function CategoriesBar() {
    const activeLink = (
        ({isActive}) => (isActive ? `${styles.active}` : "")
      )

    const {catData} = useCat()
    return (
        <div className={styles.categories}>
        {catData.map((cat) => (
        
        <ul className={styles.ul}>
        
       <li key={cat.id}>
        <NavLink className= {activeLink} 
                      
         
        to={`categories/${cat.cat_title}`}>
       
        {cat.cat_title}
        
       
        </NavLink>
        </li>
        
        </ul>
                   
    ))}
    </div>


   
  )
}

export default CategoriesBar
