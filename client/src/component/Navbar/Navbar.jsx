import React, {useEffect, useState} from 'react'
import styles from './Navbar.module.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {  AccountBox, Favorite, Login, Logout, Person,  ShoppingBagRounded,  ShoppingBagSharp } from '@mui/icons-material';
import {HiOutlineMenuAlt3} from 'react-icons/hi';
import {useDispatch, useSelector} from 'react-redux';
import { REMOVE_ACTIVE_USER, selectUserName } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../Hiddenlink';
import { Badge, Divider, IconButton } from '@mui/material';
import { logout } from "../../redux/apiCalls";
import { toast } from 'react-toastify';
import useCat from '../../hooks/useCat';
import { setIsCartOpen } from '../../redux/slice/cartSlice';
import CategoriesBar from './Categories';
import SearchBar from './SearchBar/SearchBar'
import useBrand from '../../hooks/useBrands';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';



 

const logo = (
  <div className={styles.logo}>
          <Link to="/">
            <h2>
              MooreStore
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

  const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quantity = useSelector((state) => state.cart.totalQuantity);
  const savedItems = useSelector((state) => state.savedProducts.savedItems);
  const savedQuantity = savedItems.length
  console.log(quantity)

  const cart = (
    <span className={styles.cart}>
    <IconButton onClick={()=>dispatch(setIsCartOpen({}))}>
    <ShoppingBagRounded sx={{fontSize:"35px", color:"#071b28"}}/>
    <Badge style={{fontSize:"15px", color:"#071b28"}}>{quantity > 0 && quantity}</Badge>

    
    </IconButton>
      
  </span>
  )

  const favourite = (
    <span className={styles.cart}>
    <IconButton>
      <Favorite sx={{fontSize:"20px", color:"black"}}/>    Saved items ({savedQuantity})

    </IconButton>

    
      
      
        </span>
  )



  const [showMenu, setMenu] = useState(false);
  const {catData} = useCat();
  const {brandData} = useBrand()


  


  
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
    <span style={{position:"inherit"}} >
    <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
    <NavLink to="/"><div className={styles.welcome}><Person sx={{fontSize:"35px",height:"50px",fontWeight:"900"}}/> Welcome {name} </div></NavLink>

    </Button>
    <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >

      <MenuItem onClick={handleClose}>
      <NavLink to={`/profile/summary`}><AccountBox sx={{fontSize:"20px"}}/> My account</NavLink>
      </MenuItem>
      <MenuItem onClick={handleClose}><NavLink to={`/profile/saved`}>{favourite}</NavLink></MenuItem>
      <MenuItem onClick={handlelogout}>Logout</MenuItem>
      
      </Menu>
    
      
    
  </span>
  )


  const loggedOut = (
    <>
    <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      </>
    
      
    
  )
           
    
  
  
  
  
  return (
    <><header>
      <div className={styles.header}>

        {logo}

        <div className={styles.classics}>
        <div className={styles.navbar}>
 {!showMenu ? <li className={styles.menuItem}> 
    Popular brands 
    <ul className={styles.submenu}>
    {brandData.map((brand) => (
      
      <NavLink to={`/brands/${brand.brand_title}`}><li>{brand.brand_title}</li></NavLink>
      
    ))}

      
    </ul>
  </li> : " "}
</div>
</div>



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
              <span onClick={hideMenu} style={{fontSize:"30px"}}>&times;</span>

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
              <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} sx={{color:"black"}}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
            </ShowOnLogout>
          </span>

        </div>
    </nav>
    {cart}
    <div className={styles['menu-icon']}>

        
        <HiOutlineMenuAlt3 size={32} onClick={toggleMenu} />
      </div>
      
      
      </div>
      <Divider sx={{width:"100%"}} className="divide"/>
      <CategoriesBar /> 

    </header>
    </>
  )
}

export default Navbar
