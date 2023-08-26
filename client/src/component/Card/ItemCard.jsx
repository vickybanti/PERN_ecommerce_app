import React, { useState, useEffect } from 'react'
import './ItemCard.scss'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { Button, IconButton, Typography, Box, Divider } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import {AddShoppingCart, AddShoppingCartOutlined, Remove, SearchOutlined } from '@mui/icons-material'
import { addToCart } from '../../redux/slice/cartSlice'
import { SET_ACTIVE_USER, selectUserID } from '../../redux/slice/authSlice'
import {toast} from 'react-toastify'
import {deleteItem, saveItem, setItemOpen} from '../../redux/slice/savedItemSlice'
import { responsive } from '../Responsive'
import { useSelect } from '@mui/base'
import { addProduct } from '../../redux/apiCalls'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


// const Info = styled.div`

// opacity: 0;
// display:flex;
// align-items: center;
// justify-content: center;
// position:absolute;
// background-color: rgba(0,0,0,0.5);
// width:100%;
// height: 20%;
// bottom:0;
// left:0;
// transition: all 0.5s ease;
// justify-content: space-between;

// `
// const Container = styled.div`
//   flex:1;
//   width:250px;
//   height:300px;
//   position: relative;
//   margin-bottom: 40px;
//   gap:100px;

//   &:hover ${Info}{
//       opacity:1;
//       transition: all 0.2s ease;
//       background-color: #071b28;

//   }
// `



// const Image = styled.img`
//   height: 100%;
//   width: 100%;
//   justify-content: center;
//   z-index: 2;
//   cursor:pointer
  
// `

// const Icon = styled.div`
//   positon: absolute;
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 10px;
//   cursor: pointer;
  

  
// `
// const Price = styled.div`
//   color:red;
//   font-size:15px;
//   right:0;
//   padding-top:10px;
//   margin-bottom:20px;
//   display:flex;
//   justify-content: right;
//   border-bottom: 2px solid grey;

  
// `
// const Oldprice = styled.div`
//   color: red;
//   text-decoration: line-through;
  
// `
// const Title = styled.div`
//   font-weight: 300;
//   font-size:14px;
//   padding-top:3px;
// `
// const Favourited = styled.div`
//   color: red;
//   font-size: 20px;
// `








function ItemCard({item}) {

  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    if (item.images) {
      const newImageDataArray = [];
  
      item.images.forEach((image) => {
        const byteArray = new Uint8Array(image.data);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
  
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result;
          newImageDataArray.push(base64Image);
  
          // Check if all images have been processed
          if (newImageDataArray.length === item.images.length) {
            setImageData(newImageDataArray);
          }
        };
  
        reader.readAsDataURL(blob);
      });
    } else {
      setImageData([]);
    }
  }, [item]);
  


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [count, setCount] = useState(1)

  const favourites = useSelector((state) => state.savedProducts.savedItems);
const [fav, setFav] = useState(false);

useEffect(() => {
  const checkIsFav = () => {
    const foundFav = favourites.find((fave) => fave.id === item.id);
    setFav(foundFav !== undefined);
  };
  checkIsFav();
}, [favourites, item.id]);

const isFav = fav;

function addSave() {
  if (isFav) {
    dispatch(deleteItem(item));
  } else {
    dispatch(saveItem({ ...item, count, imageData}));
    dispatch(setItemOpen({}))
  }
  setFav(!isFav);
}

// ...


  
  
  
  function increaseCount(){
    setCount(count + 1)
    
  }

  function decreaseCount() {

    setCount(count >1? count -1: 1)
  }
  
  
  
  

  async function handleClick() {
    addProduct(dispatch,item,imageData,count)
    
  }
  
  
  console.log(imageData)

  




  return (
    <div className= "contain" responsive={responsive} key={item.id}>
    {item.type &&
      <Avatar
          alt={item.type}
          className="avatar"
          component="div"
          sizes="12px"
          sx={{backgroundColor: item.type==="newArrivals"?"orangered" : "#071b28", marginTop:"20", 
          position:"absolute",
          width: "80px",
          borderRadius:"0", 
          fontWeight:"bold",
          color:"whitesmoke",
        }}
      >
    
    {item.type}


      </Avatar> 
    
    }
    
      <img key={item.id} src={imageData && imageData[0]} imageData={imageData}  alt="" onClick={()=>navigate(`/product/${item.id}`, { imageData: { imageData } } 
      )}/>
      
      <div className="infos">
        
              
         
        
        
        
        <div className="icon">
          
       
        <FavoriteBorderIcon style={{color:isFav?"red":"black", fontSize:"20px"}} onClick={addSave}/> 
          
        </div>
        <div className="icon">
        <AddShoppingCart sx={{color:"black", fontSize:"20px"}} onClick={()=>handleClick()}/>
    </div>


      </div>
      <div className= "h3">
        {item.title}
      </div>
      <div className="price">
       <div className='old'> $ {item.oldPrice}</div>
        
        $ {item.price}
      
      </div>
      
    </div>
  )
}

export default ItemCard;