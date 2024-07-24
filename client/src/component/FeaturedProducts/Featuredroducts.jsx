import React from 'react'
import ItemCard from '../Card/ItemCard'
import './FeaturedProducts.scss'
import useFetch from '../../hooks/useFetch';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { responsive } from '../Responsive';
import SkeletonImg from '../skeleton/SkeletonImg';
import { useNavigate } from 'react-router-dom'


  


function Featuredroducts() {
  const navigate = useNavigate()

const {data, loading} = useFetch('/newproducts')
console.log("data =", data) 

return (
    <div className='featured'>
        <div className='top'>
           <h1>New Arrivals</h1>
            
          </div>
  <div className="bottom">
        
          <Carousel 
          responsive={responsive} 
          className='carousel' 
          autoPlay={true}
          autoPlaySpeed={2000}
          infinite={true}>
          
            
            {
              loading?
              [...Array(10).keys()].map(i => {
                return <SkeletonImg 
                key={i} />}):
              data?.map((item)=> (
              <>
              <div className="cardPro" key={item.id}>
  
                          <ItemCard item={item} key={item.id} onClick={() => navigate(`/product/${item.id}`)}/>
         
                </div>
                </>

              ))}
            
           

              
              </Carousel>
              </div>
              </div>

          

       
        

      
  )
}

export default Featuredroducts
