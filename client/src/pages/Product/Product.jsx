import React, { useState, useEffect, useRef } from 'react'
import Slider from 'react-slick'; // Import react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CSSTransition } from 'react-transition-group';
import './Product.scss'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import useFetchAProduct from '../../hooks/useFetchAProduct';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { addToCart } from '../../redux/slice/cartSlice'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../component/loader/Loader';
import RelatedProduct from './RelatedProduct';
import { deleteItem, saveItem } from '../../redux/slice/savedItemSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/material';
import { addProduct } from '../../redux/apiCalls';
import SkeletonProduct from '../../component/skeleton/SkeletonProduct';
import SkeletonProductImg from '../../component/skeleton/SkeletonProductImg';
import { toast } from 'react-toastify';




function Product({item}) {
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
        const productReview = await fetch(`http://localhost:5000/review/${id}`,{
          method:"GET",
          headers:"application/json"
        })

        const reviewResponse = await productReview.json()
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
    addProduct(dispatch, proData[0], imageData,count,size)
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
    

    const captionStyle = {
      fontSize: '2em',
      fontWeight: 'bold',
    }
    const slideNumberStyle = {
      fontSize: '20px',
      fontWeight: 'bold',
    }
  

  
     
    
        
    

  
    return (
      <div className='product'>
        <div className='left'>
         
        <div className='mainImg'>
      
        {loading ? <SkeletonProductImg /> : 
          <img src={imageData && imageData[image]} alt='' />
    }
        </div>


        <div className='images'>
        {/* Replace the individual image tags with the Slider component */}
        
      

    
      {imageData && imageData.map((image, index) => (
        <div key={index}>
          <img src={image} alt='' onClick={() =>setImage(index)}/>
        </div>
         ))}
      
      
      
    
    
    </div>

      </div>


      
      <div className='right'>
        {loading? <SkeletonProduct/>
        :proData.map(pro => (
          <><><h1>{pro.title}</h1><p>{pro.desc}</p></><div className='quantity'>
            <button onClick={decreaseQuantity}>-</button>
            <h4>{count}</h4>
            <button onClick={increaseQuantity}> + </button>

            
             
            <Box sx={{ minWidth: 120, borderColor:message? "red": "black" }} >
            

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Size</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Size"
                value={size}
                onChange={handleChange}
                sx={{fontSize:"15px"}}
              >
               
              {pro.sizes?.map((sizes)=>
                <MenuItem value={sizes} sx={{fontSize:"15px"}} >{sizes}</MenuItem>

                )}
              
              </Select>
            </FormControl>
        
          </Box>
          
          {message && <h2>Select a shoe size</h2>}
        
          
      
          </div><button onClick={()=>handleClick()} className='add'>
              <AddShoppingCartIcon sx={{fontSize:"28px"}}/>
              ADD TO CART


            </button><div className='link'>
              <div className='items'>
                <FavoriteIcon onClick={addSave} sx={{color:isFav?"red":"black", fontSize:"28px"}}/> {isFav?"REMOVE FROM WISHLIST" :"ADD TO WISHLIST"}
              </div>
              
            </div><hr /><div className='info'>
              <h3>DESCRIPTION</h3>
              <span>{pro.desc}</span>
              <hr />
              <h3>REVIEW</h3>
              <div className='review'>
              {reviews?reviews.map((item)=>(
                <span>{item.review}</span>
              )) :
              <h2>No review for this product yet....</h2>
            }
            </div>
              <hr />
              


            </div></>
          ))}
          

          <div className = 'related'>
      <h4>RELATED PRODUCTS</h4>
      <RelatedProduct />

      
      </div>


      </div>

      
    </div>
    
  )
}

export default Product
