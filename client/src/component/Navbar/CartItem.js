import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Box,Button, Divider, IconButton, Typography
} from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
import styled from "@emotion/styled";
import {
 
  removeFromCart,
  setIsCartOpen
} from '../../redux/slice/cartSlice'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearProductsFromCart, deleteFromCart } from "../../redux/apiCalls";
import ImageData from "../ImageData";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all linear 0.5s;
  
`


function CartItem(){

  const navigate= useNavigate()
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const isCartOpen = useSelector((state) => state.cart.isCartOpen)
  const user = useSelector((state) => state.auth.userID)

  
  
  const [message, setMessage] = useState("")
  const deleteProduct = async (item,itemId) => {
    deleteFromCart(dispatch, item, itemId)
    dispatch(removeFromCart(item))

    dispatch(setIsCartOpen({}))
    setMessage(`${item.title} removed from cart`, setTimeout(()=>3000))

  };



  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const proImages = cart.cartItems.map((cart)=>cart.images)
      if (proImages) {
          const newImageDataArray = [];

          proImages.forEach((image) => {
              const byteArray = new Uint8Array(image.data);
              const blob = new Blob([byteArray], { type: 'image/jpeg' });

              const imageUrl = URL.createObjectURL(blob);
              newImageDataArray.push(imageUrl);
          });


          // Check if all images have been processed
          if (newImageDataArray.length === proImages.length) {
              setImageData(newImageDataArray);


          } else {
              setImageData([]);
          }
      }
  }, [cart]);




  

  function deleteAllCart(){
    clearProductsFromCart(dispatch)
    dispatch(setIsCartOpen({}))
 
  }

  function handleSubmit(){


    if(user){
      navigate("/checkout")
    } else{
      navigate("/login")
    }
  
  
  } 

  return (
    <Box
    display= {isCartOpen?"block":"none"}
    backgroundColor="rgba(0,0,0,0.4)"
    position="fixed"
    zIndex={9999}
    width="100%"
    height="100%"
    left="0"
    top="0"
    overflow="auto"
    style={{transform: "translateX()",
      transition: "all 2s ease-out"}}
    onClick={()=>dispatch(setIsCartOpen({}))}
    >

    <Box
    position="fixed"
    right="0"
    bottom="0"
    width="max(370px, 30%)"
    height="100%"
    backgroundColor="whitesmoke"
    zIndex={8888}
    style={{transform: "translateX()",
      transition: "all 2s ease-out"}}
    
    >
    
    {cart.totalQuantity === 0 ? 
      <><img src="/img/about/empty.svg" alt="" style={{
        width:"250px", 
        height:"250px",
        display:"flex",
        justifyContent:"center",
        margin:"100px auto"
      
      }}/>
      <h1 style={{ textAlign: "center" }}>Cart is Empty</h1></> :
    <Box padding ="30px"
    overflow="auto"
    height="100%"
    >
     {/*HEADER */}
     <FlexBox mb="40px"
     onClick={()=>isCartOpen}>
      <Typography variant="h3">SHOPPING BAG ({cart.totalQuantity})</Typography>
      <IconButton  onClick={()=>!isCartOpen}>
        <Close />
      </IconButton>
      </FlexBox>
      <Box
      color="red"
      fontSize="12px"
      padding="10px"
      >  
      {message}
      </Box>

      {/*CART ITEMS */}
      
        <Box>
          {cart.cartItems.map((item) => (
            <Box key={item.id} mb="20px" sx={{
              fontSize:"15px",
              fontWeight:"bold"
            }}>

              {item.title}
              <FlexBox>
              {/*flex 1 for flex growth, 1 for shrinking, width is 40%*/}
                <Box flex="1 1 40%" mt={"20px"}>
                <div style={{width:"100%", height:"100%"}}>
                  <ImageData item={item} />
                </div>
                </Box>
                <Box flex="1 1 60%">

                  <FlexBox mb="5px">
                    <Typography variant="p" sx={{
                      fontSize:"12px",
                      
                    }}>
                      {item.desc}
                    </Typography>
                    <IconButton onClick={()=>deleteProduct(item,item.id)}>
                    <Delete sx={{color:"red", fontSize:"20px"}}/>
                    </IconButton>
                  </FlexBox>
                  

                  {/*item count */}
                  <FlexBox mb="15px 0">
                    <Box
                    display="flex"
                    alignItems="center"
                    padding="10px"
                    >
                     
                      
                      <Typography fontSize="15px" >{item.count}</Typography>

                    </Box>
                    <Box
                    display="flex"
                    alignItems="center"
                    padding="10px"
                    >
                     
                    <Typography>Size: </Typography>  
                    <Typography fontSize="20px">{item.size}</Typography>

                    </Box>

                     {/*Price */}
                  <Typography fontSize="12px" color="black" sx={{fontWeight:"500"}}> $ {(item.price * item.count).toFixed(2)}</Typography>
                  </FlexBox>

                 
                </Box>
              </FlexBox>
              <Divider />
            </Box>
          ))}
        </Box>

        {/*ACTION */}
        <Box m="20px 0">
        <FlexBox m="20px 0">
            <Typography fontWeight="bold">SUBTOTAL</Typography>
            <Typography fontSize="15px" sx={{backgroundColor:"rgba(0,0,0,0.3)", padding:"10px"}}>${cart.totalPrice?.toFixed(2)}</Typography>
              
            <Typography fontWeight="bold">TOTAL</Typography>
            <Typography fontSize="15px" sx={{backgroundColor:"gray", padding:"10px"}}>${cart.totalPrice?.toFixed(2)}</Typography>


            </FlexBox>
            <button className="--btn --btn-danger" style={{margin:"10px", fontSize:"12px"}} onClick={deleteAllCart}>Clear cart</button>
            <Button
            fullWidth
            type="submit"
            color='primary'
            variant='contained'
            sx={{
                backgroundColor: "rgba(0,0,0,0.4)",
                color:"white",
                borderRadius:0,
                padding:"15px 40px",
                fontSize:"20px"

            }}
            
            onClick={handleSubmit} cartItems={cart.cartItems}>{user?"Checkout":"Login"}</Button>
            {user? "":<span style={{fontSize:"12px", fontFamily:"Arial", color:"GrayText"}}>You must be logged in to checkout...</span>}
                       

        </Box>
    </Box>
                      }
    </Box>
    <Box>
   
    </Box>
    
    </Box>
                      
  )
}
 

export default CartItem;
