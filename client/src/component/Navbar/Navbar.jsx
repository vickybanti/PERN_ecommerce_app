import React, {useEffect, useState} from 'react'
import styles from './Navbar.module.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {  AccountBox, Favorite, Login, Logout, Person,  ShoppingBagRounded,  ShoppingBagSharp, ShoppingCart } from '@mui/icons-material';
import {HiOutlineMenuAlt3} from 'react-icons/hi';
import {useDispatch, useSelector} from 'react-redux';
import { REMOVE_ACTIVE_USER, selectUserName } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../Hiddenlink';
import { Badge, Divider, IconButton, Tooltip, fabClasses, useMediaQuery } from '@mui/material';
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

  const cart = (
    <span className={styles.cart} style={{marginRight:"20px"}}>
    <Tooltip title="View Cart">
                      <IconButton
                        size="large"
                        aria-label="item added"
                        onClick={()=>dispatch(setIsCartOpen({}))}
                        style={{
                          borderRadius: 0
                        }}
                      >
                         <Badge badgeContent={<span style={{fontSize:"12px"}}>{quantity>0 && quantity}</span>} color={"error"}>
                          <ShoppingBagRounded
                            className="nav-icon"
                            sx={{ fontSize: "30px",color:"black" }}
                          />
                        </Badge>
                      </IconButton>
                    </Tooltip>
      
  </span>


  )

  const favourite = (
    
    <IconButton onClick={()=>navigate('/profile/saved')} sx={{padding:"0"}}>
      <Favorite sx={{color:"GrayText", marginRight:"5px",fontSize:"18px",fontFamily:"Arial"}}/> Saved items ({savedQuantity})

    </IconButton>      
      
 )



  const [showMenu, setMenu] = useState(false);
  const {catData} = useCat();
  const {brandData} = useBrand()

  const [showSearch, setSearch] = useState(false)

const setInput = () => {
  setSearch(!setInput)
}  

const hideInput = () => {
  setSearch(false)
}  


  
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

  function loginClick() {
    navigate('/login') 
    handleClose()
  }

  const isMatch = useMediaQuery("600px")
  
  const account = (

    <>

    <Tooltip title="View Account" >
    <IconButton
      id="fade-button"
      aria-controls={open ? 'fade-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      sx={{fontSize:"15px"}}

    >

      <span className={styles.welcome} style={{}}>
        <Person sx={{ fontSize: "32px", fontWeight: "900", color: "black" }} />
        <p style={{ fontSize:"15px",fontWeight:"400"}}> Welcome {name} </p>
      </span>

    </IconButton>
    </Tooltip>
    <Menu
    className={styles.fademenu}
      id="fade-menu"
      MenuListProps={{
        'aria-labelledby': 'fade-button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClick={handleClose}
      TransitionComponent={Fade}
      sx={{
        color: "Graytext", fontSize: "20px", zIndex: "99999", marginTop: "60px", marginLeft: "10px", padding: "30px"
      }}
    >
        <MenuItem onClick={handlelogout}>
          <Button variant="contained" sx={{
            boxShadow: "var(--box-shadow)", font: "Open Sans",
            fontSize: "15px", padding: "5px 20px", backgroundColor: "var(--color-danger)",
            fontWeight: "600"
          }} endIcon={<Logout />}>
            Logout </Button>
        </MenuItem>

        <MenuItem onClick={() => navigate('/profile/orders')} sx={{ fontSize: "17px", color: "Graytext" }}>
          <Person sx={{ fontSize: "18px", color: "gray", marginRight: "5px" }} /> My account
        </MenuItem>
        <MenuItem onClick={handleClose}>{favourite}</MenuItem>
        <MenuItem onClick={() => navigate('/profile/orders')} sx={{ fontSize: "17px", color: "Graytext" }}>
          <ShoppingCart sx={{ fontSize: "17px", marginRight: "5px" }} />

          Orders</MenuItem>


      </Menu></>
    
      
    
  )


  const loggedOut = (
    <>
    <IconButton
      id="fade-button"
      aria-controls={open ? 'fade-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      sx={{marginTop:"40px", width:"100%"}}
    >
      <Person  sx={{fontSize:"28px", color:"black"}}/>

    </IconButton>
    <Menu
      id="fade-menu"
      MenuListProps={{
        'aria-labelledby': 'fade-button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
      sx={{marginTop:"30px",marginRight:"40px",padding:"100%",zIndex:"99999"}}
    >

        <MenuItem sx={{margin:"0 5px"}} onClick={loginClick}>
        
        <Button
              variant="contained"
              sx={{
                boxShadow: 'var(--box-shadow)',
                font: 'Roboto',
                fontSize: '17px',
                padding: '7px 25px',
                fontWeight: '600',

                
              }}
              endIcon={<Login />}
            >
         Login
         </Button> 
         
        </MenuItem>

        <MenuItem onClose={handleClose}>{favourite}</MenuItem>

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
      
      <NavLink to={`Products/brands/${brand.brand_title}`}><li>{brand.brand_title}</li></NavLink>
      
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
              {loggedOut}
            </ShowOnLogout>

           
              {cart}
            
          </span>

        </div>
    </nav>
    
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
