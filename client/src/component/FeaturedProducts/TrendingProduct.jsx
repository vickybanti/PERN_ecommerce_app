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
            <h1>Trending Products</h1>
            
        </div>

        <div className='bottom'>

            {loading?
              [...Array(4).keys()].map(i => {
                return <SkeletonImg 
                key={i} />})
              : data.map(item => (
                item.stock===0?"":
              <ItemCard item={item}
              key={item.id}/>
            ))}

        </div>
      
    </div>
  )
}

export default TrendingProducts;
