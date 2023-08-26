import React from "react";
import {
  Box,Button, Divider, IconButton, Typography
} from "@mui/material";
import { Close, Delete, Add,Remove } from "@mui/icons-material";
import styled from "@emotion/styled";
import { setItemOpen, deleteItem, saveItem } from "../../redux/slice/savedItemSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";
import { savedItemSlice } from "../../redux/slice/savedItemSlice";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`


function SavedItem(){
  const deleteProduct = async (item) => {
    dispatch(deleteItem(item));
  };
  const navigate= useNavigate()
  const products = useSelector((state) => state.savedProducts)
  const dispatch = useDispatch()
  const itemOpen = useSelector((state) => state.savedProducts.isItemOpen)

  console.log("saved=", products)
  return (
    <Box
    display= {itemOpen?"block":"none"}
    backgroundColor="rgba(0, 0, 0, 0.4)"
    position="fixed"
    zIndex={9999}
    width="100%"
    height="100%"
    left="0"
    top="0"
    overflow="auto"
    onClick={()=>dispatch(setItemOpen({}))}
    >

    <Box
    position="fixed"
    right="0"
    bottom="0"
    width="max(400px, 30%)"
    height="100%"
    backgroundColor="whitesmoke"
    zIndex={9999}
    
    >
    

    <Box padding ="30px"
    overflow="auto"
    height="100%"
    >
     {/*HEADER */}
     <FlexBox mb="40px"
     onClick={()=>itemOpen}>
      <Typography variant="h3">SHOPPING BAG ({products.saveItem.length})</Typography>
      <IconButton  onClick={()=>!itemOpen}>
        <Close />
      </IconButton>
      </FlexBox>

      {/*CART ITEMS */}
        <Box>
          {products.savedItems.map((item) => (
            <Box key={item.id} mb="20px" sx={{
              fontSize:"15px",
              fontWeight:"bold"
            }}>

              {item.title}
              <FlexBox>
              {/*flex 1 for flex growth, 1 for shrinking, width is 40%*/}
                <Box flex="1 1 40%" mt={"20px"}>
                  <img 
                    alt={item?.title}
                    width="123px"
                    height="164px"
                    src="img/insta/3.jpg"
                  />
                </Box>
                <Box flex="1 1 60%">

                  <FlexBox mb="5px">
                    <Typography variant="p" sx={{
                      fontSize:"12px",
                      
                    }}>
                      {item.desc}
                    </Typography>
                    <IconButton onClick={() => deleteProduct(item)}>
                    <Delete />
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
                     {/*Price */}
                  <Typography fontSize="12px" color="red"> $ {item.price * item.count}</Typography>
                  <Box>
                  <Button onClick={()=>dispatch(addToCart({...item}))}>ADD TO CART</Button>
              
                  </Box>
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
            
            


            </FlexBox>
            
            

        </Box>
    </Box>
    </Box>
    
    </Box>
  )
}
 

export default SavedItem;
