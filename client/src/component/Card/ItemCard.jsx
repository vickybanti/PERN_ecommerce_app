import React, { useState, useEffect } from 'react'
import './ItemCard.scss'
import { useNavigate } from 'react-router-dom'
import { Box, SpeedDial, SpeedDialAction } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import {AddShoppingCart} from '@mui/icons-material'
import {deleteItem, saveItem, setItemOpen} from '../../redux/slice/savedItemSlice'
import { responsive } from '../Responsive'
import { addProduct } from '../../redux/apiCalls'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addToCart } from '../../redux/slice/cartSlice'


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


  
  
  const [size,setSize] = useState("")

  function handleSize(selectedSize) {
    setSize(selectedSize);
  }
  console.log(size)
  

  function handleClick(e, selectedSize) {
    e.preventDefault()
    dispatch(addToCart({...item,count,imageData,size }))


    
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div className= "contain" responsive={responsive} key={item.id} onClick={()=>navigate(`/product/${item.id}`)}>
    {item.stock <= 0 && 
      <h3 className='out'>Out of stock</h3>
    
  }
    {item.stock<=0?"":item.type &&
      <Avatar
          alt={item.type}
          className="avatar"
          component="div"
          sizes="12px"
          sx={{backgroundColor:item.stock <=0?"rgba(0,0,0,0.4)":
            item.type==="newArrivals"?"orangered" : "#071b28", marginTop:"20", 
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
    
      <img key={item.id} src={imageData && imageData[0]} imageData={imageData}  alt="" onClick={()=>navigate(`/product/${item.id}`) } 
      />
      
      <div className="infos">
        
              
         
        
        
        
        <><div className="icon">



            <FavoriteBorderIcon style={{ color: isFav ? "red" : "white", fontSize: "30px" }} onClick={addSave} />

          </div><div className="icon">

              {item.stock <1 ? <p>Out of stock</p> :

                <Box
                  value={size}
                  onChange={handleSize}
                  sx={{ height: 80,background:"none", transform: 'translateX(0px)', flexGrow: 2 }}>
                  <SpeedDial
                    ariaLabel="SpeedDial controlled open example"
                    sx={{ position: 'absolute', bottom: 0, right: 0, border: "none" }}
                    icon={item.stock <=0 ? "" :<AddShoppingCart sx={{ fontSize: "30px", border: "none", color: "white" }} />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                  >
                    {item.stock === 0?"": item.sizes?.map((sizeOption) => (
                      <SpeedDialAction
                        key={sizeOption}
                        value={sizeOption}
                        onChange={handleSize}
                        icon={sizeOption}
                        onClick={(e) => handleClick(e, sizeOption)}
                        sx={{ color: "black", fontSize: "20px", fontFamily: "fantasy" }} />
                    ))}
                  </SpeedDial>
                </Box>}


            </div></>

        
      </div>
      <div style={{display:"flex", justifyContent:"space-between"}}>
      <div className= "h3">
        {item.title}
      </div>
      <div className="cat" style={{color:"gray", fontFamily:"cursive", fontSize:"14px"}}>
        {item.brand_title}
      </div>
      </div>
      <div className="price">
       <div className='old'>  {item.oldPrice}</div>
        
        $ {item.price}
      
      </div>
      
    </div>
  )
}

export default ItemCard;