import React, {useEffect, useState} from 'react'
import styles from './Navbar.module.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {  AccountBox, Favorite, LabelOffRounded, Login, Logout, Person,  ShoppingBagSharp } from '@mui/icons-material';
import {HiOutlineMenuAlt3} from 'react-icons/hi';
import {useDispatch, useSelector} from 'react-redux';
import { REMOVE_ACTIVE_USER, selectUserName } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../Hiddenlink';
import { Alert, Badge, Button, Divider, IconButton } from '@mui/material';
import { logout } from "../../redux/apiCalls";
import { toast } from 'react-toastify';
import useCat from '../../hooks/useCat';
import { setIsCartOpen } from '../../redux/slice/cartSlice';
import CategoriesBar from './Categories';
import SearchBar from './SearchBar/SearchBar'

 

const logo = (
  <div className={styles.logo}>
          <Link to="/">
            <h2>
              Moore<span>Store</span>
            </h2>
          </Link>
        </div>
)



const activeLink = (
  ({isActive}) => (isActive ? `${styles.active}` : "")
)


function Navbar() {
  const userName = useSelector(selectUserName)
  const userID = useSelector((state) => state.auth.userID)
  console.log(userID)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quantity = useSelector((state) => state.cart.totalQuantity);
  const savedItems = useSelector((state) => state.savedProducts.savedItems);
  const savedQuantity = savedItems.length
  console.log(quantity)

  const cart = (
    <span className={styles.cart}>
    <IconButton onClick={()=>dispatch(setIsCartOpen({}))}>
    <ShoppingBagSharp sx={{fontSize:"35px", color:"#071b28"}}/>
    <Badge style={{fontSize:"15px", color:"#071b28"}}>{quantity > 0 && quantity}</Badge>

    
    </IconButton>
      
  </span>
  )

  const favourite = (
    <span className={styles.cart}>
    <IconButton>
      <Favorite sx={{fontSize:"20px", color:"red"}}/>    Saved items ({savedQuantity})

    </IconButton>

    
      
      
        </span>
  )



  const [showMenu, setMenu] = useState(false);
  const {catData} = useCat();


  


  
  const toggleMenu = () =>{
    setMenu(!showMenu)
  };

  const hideMenu = ()=>{
    setMenu(false)
  };

  const [name, setName] = useState("")
  
  useEffect(()=>{
    async function getName() {
        setName(userName);
      
      if(!userName) {
        dispatch(REMOVE_ACTIVE_USER({isLoggedIn:false}))
      } 
     
    }

    getName()
  }, [dispatch, navigate, name, userName, userID]);

  
  
  async function handlelogout(e) {

    e.preventDefault();
    
    logout(dispatch);
    toast.success(<h2>Logged out successfully...</h2>)

  }
  
  const account = (
    <span className={styles.cart} style={{position:"inherit"}} >
    <div class="dropdown account ">
    <button class="btn btn-inverse dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <NavLink to="/"><Person sx={{fontSize:"32px"}}/> Welcome {name} </NavLink>

    </button>
    <ul class="dropdown-menu dropdown-menu-light" style={{ textAlign:"center"}}>
    
    
    <li><NavLink to={`/profile/summary`}><AccountBox /> Account Page</NavLink></li>
      
    <li><NavLink to={`/saved`}>{favourite}</NavLink></li>
      <li><hr class="dropdown-divider" style={{width:"100%"}}/></li>
      <li><button className='--btn --btn-danger' style={{width:"100%"}} onClick={handlelogout}>
      <Logout />Logout</button></li>
      
     
    </ul>
  </div>
  </span>
  )
           
    
  
  
  
  
  return (
    <><header>
      <div className={styles.header}>

        {logo}



              <li className={styles.searchbar}>
          <SearchBar />

          </li>
                 

        <nav className={showMenu ? `${styles['show-nav']}` :
          `{styles['hide-nav']}`}>
          <div className={showMenu ? `${styles['nav-wrapper']} 
        ${styles['show-nav-wrapper']}` : `${styles['nav-wrapper']}`}
            onClick={hideMenu}
          >
          </div>
        


          <ul onClick={hideMenu}>

            <li className={styles['logo-mobile']}>
              {logo}
              <span onClick={hideMenu}>&times;</span>

            </li>
            {catData.map((cat) => (
              <li key={cat.id}>
                {showMenu ? <NavLink to={`/categories/${cat.id}`}>
                  {cat.cat_title}
                </NavLink> : " "}
              </li>
            ))}
          
          </ul>

          
          <div className={styles['header-right']} >
            <span className={styles.links}>

            

           

              <ShowOnLogin>
                {account}
                
              </ShowOnLogin>
              <ShowOnLogout>
                <NavLink to="login" onClick = {hideMenu} className={activeLink}><button className='--btn --btn-primary' style={{ width: "100%" }} ><Login />Login</button></NavLink>
            </ShowOnLogout>
          </span>

        </div>
    </nav>
    {cart}
    <div className={styles['menu-icon']}>

        
        <HiOutlineMenuAlt3 size={32} onClick={toggleMenu} />
      </div>
      
      
      </div>
      <Divider sx={{width:"100%"}}/>
      <CategoriesBar /> 

    </header>
    </>
  )
}

export default Navbar
