import React, {useState, useEffect} from 'react'
import ItemCard from '../Card/ItemCard'
import './FeaturedProducts.scss'
import useFetch from '../../hooks/useFetch';
import useTrending from '../../hooks/useTrending';
import { Link } from 'react-router-dom';
import Skeleton from '../skeleton/Skeleton';
import SkeletonImg from '../skeleton/SkeletonImg';


function TrendingProducts() {

const {data, loading} = useTrending('/trending')

    

return (
    <div className='featured'>
        <div className='top'>
            <h1
            className="animate__animated animate__lightSpeedInLeft"
            style={{ animationDelay: "1s" }}
          >Trending Products</h1>
            
        </div>

        <div className='bottom'>

            {loading?
              [...Array(10).keys()].map(i => {
                return <SkeletonImg 
                key={i} />})
              : data.map(item => (
              <ItemCard item={item}
              key={item.id}/>
            ))}

        </div>
      
    </div>
  )
}

export default TrendingProducts;
