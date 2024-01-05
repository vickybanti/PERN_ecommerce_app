import React, { useState, useEffect } from 'react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Product.scss'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useFetchAProduct from '../../hooks/useFetchAProduct';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RelatedProduct from './RelatedProduct';
import { deleteItem, saveItem } from '../../redux/slice/savedItemSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Button } from '@mui/material';
import { addProduct } from '../../redux/apiCalls';
import SkeletonProduct from '../../component/skeleton/SkeletonProduct';
import SkeletonProductImg from '../../component/skeleton/SkeletonProductImg';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Grid from "@mui/material/Grid";
import ProductImageSlider from '../../component/ProductSlider';

import { makeRequest } from '../../makeRequest';
import { addToCart } from '../../redux/slice/cartSlice';
              




function Product() {
  const { proData, loading, imageData} = useFetchAProduct();
  console.log(proData)

  console.log("imageData",imageData)

  const[image, setImage]  = useState(0)


  

  
  const {id} = useParams()

  const dispatch = useDispatch()

  
  const [count, setCount] = useState(1)

    

  function increaseQuantity() {
    setCount(count + 1)
  }

  function decreaseQuantity() {
    setCount(count===1? 1: count - 1)
  }

  const [reviews, setReview] = useState([])

  useEffect(()=>{
    async function getReview(){
      try {
        const productReview = await makeRequest.get(`/review/${id}`)

        const reviewResponse = await productReview.data
        setReview(reviewResponse)
      } catch (err) {
        console.error(err.message)
      }
    }
    getReview()
  },[id])

  
  
const [message, setMessage] = useState(false)
  function handleClick() {
    if(!size){
      setMessage(true)
    } else{
      dispatch(addToCart({...proData[0],imageData,count,size }))
      setMessage(false)
    }
  }
  
  const favourites = useSelector((state) => state.savedProducts.savedItems);
  const [fav, setFav] = useState(false);
  useEffect(() => {
    // const itemId = proData[0].id
    // console.log(itemId)
    const checkIsFav = () => {
      const foundFav = favourites.find((fave) => fave.id === id);
      setFav(foundFav !== undefined);
    };
    checkIsFav();
  }, [favourites, proData, id]);
  
  const isFav = fav;
  
  function addSave() {
    if (isFav) {
      dispatch(deleteItem(proData[0]));
    } else {
      dispatch(saveItem({ ...proData[0], count,imageData,size }));
    }
    setFav(!isFav);
  }
  
const [size, setSize]  = useState("")
    
    const handleChange = (event) => {
      setSize(event.target.value);
    };

    console.log(size)
    
    // Additional settings for the carousel
    

    
  
    function CustomTabPanel(props) {
      const { children, value, index, ...other } = props;
    
      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box sx={{ p: 3 }}>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
      );
    }
    
    CustomTabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    };
    
    function a11yProps(index) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }
    
    
      const [value, setValue] = useState(0);
    
      const handleTabChange = (event, newValue) => {
        setValue(newValue);
      };
  

      

  
    return (
      <div className='product'>
        <div className='left'>


        <div className='mainImg'>


          {loading ? <SkeletonProductImg /> :
            //  <img src={imageData && imageData[image]} alt='' />
            <ProductImageSlider images={imageData && imageData} />}
        </div>


        <div className='images'>
          {/* Replace the individual image tags with the Slider component */}




          {imageData && imageData.map((image, index) => (
            <div key={index}>
              <img src={image} alt='' onClick={() => setImage(index)} />
            </div>
          ))}





        </div>

      </div><div className='right'>
          {loading ? <SkeletonProduct />
            : proData.map(pro => (
              <><><h1>{pro.title}</h1><p>{pro.desc}</p></><div className='quantity'>
                <button onClick={decreaseQuantity}>-</button>
                <h4 className="count">{count}</h4>
                <button onClick={increaseQuantity}> + </button>



                <Box sx={{ minWidth: 120, borderColor: message ? "red" : "black" }}>


                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Size</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Size"
                      value={size}
                      onChange={handleChange}
                      sx={{ fontSize: "15px", marginLeft: "15px" }}
                    >

                      {pro.sizes?.map((sizes) => <MenuItem value={sizes} sx={{ fontSize: "15px", paddingleft: "3px" }}>{sizes}</MenuItem>

                      )}

                    </Select>
                  </FormControl>

                </Box>

                {message && <h2>Select a size</h2>}



              </div>
              {
                pro.stock <1 ?
                <Button disabled style={{ background: "none", border: "1px solid gray" }}>Out of stock</Button>
                :
                <button onClick={() => handleClick()} className='add'>
                  <AddShoppingCartIcon sx={{ fontSize: "28px" }} />
                  "ADD TO CART"


                </button>
                
            }

                <div className='link'>
                  <div className='items'>
                    <FavoriteIcon onClick={addSave} sx={{ color: isFav ? "red" : "black", fontSize: "28px" }} /> {isFav ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
                  </div>










                  <Box sx={{ width: '100%', marginTop: '30px' }} className='info'>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                        <Tab label="DESCRIPTION" {...a11yProps(0)} sx={{ fontSize: '20px' }} />
                        <Tab label="REVIEW" {...a11yProps(1)} sx={{ fontSize: '20px' }} />
                      </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                      {pro.desc}
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>


                      {reviews ? reviews.map((item) => (
                        <span>{item.review}</span>
                      )) :
                        <h3>No review for this product yet....</h3>}
                    </CustomTabPanel>

                  </Box>











                </div><hr /></>
            ))}


          <div className='related'>
            <h4>RELATED PRODUCTS</h4>
            <RelatedProduct />


          </div>


        </div>
        </div>
        

      
    
  )
}

export default Product
