import React from 'react'
import ItemCard from '../Card/ItemCard'
import './FeaturedProducts.scss'
import useFetch from '../../hooks/useFetch';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { responsive } from '../Responsive';
import { Button, Skeleton } from '@mui/material';
import SkeletonImg from '../skeleton/SkeletonImg';
import { useNavigate } from 'react-router-dom';


  


function Featuredroducts() {
  

const {data, loading} = useFetch()
console.log("data =", data) 
const navigate = useNavigate()

return (
    <div className='featured'>
        <div className='top'>
           <h1>New Arrivals</h1>
            
          </div>

        
          <Carousel 
          responsive={responsive} 
          className='carousel' 
          autoPlay={false}
          autoPlaySpeed={2000}
          infinite={true}>
          
            
            {
              loading?
              [...Array(10).keys()].map(i => {
                return <SkeletonImg 
                key={i} />}):
              data?.map((item)=> (
              <>
              <div className="cardPro" key={item.id} onClick={()=>navigate(`/product/${item.id}`)}>
  
                <ItemCard item={item} key={item.id} />
         
                </div>
                </>

              ))}
            
           

              
              </Carousel>
              </div>

          

       
        

      
  )
}

export default Featuredroducts
