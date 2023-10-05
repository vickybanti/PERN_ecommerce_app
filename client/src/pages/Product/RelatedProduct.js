import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Button } from '@mui/material';
import { responsive } from '../../component/Responsive';
import './Product.scss'
import ItemCard from '../../component/Card/ItemCard';
import SkeletonImg from '../../component/skeleton/SkeletonImg';

function RelatedProduct() {

    const {id} = useParams()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const productCat = async() => {

            try {
                const getCat = await fetch(`http://localhost:5000/products/${id}`,{
                    method:"GET"
                })
                const allProducts = await getCat.json()

                setProducts(allProducts)
            } catch (err) {
                console.error(err.message)
                setLoading(false)
            }
        }
        productCat()
    }, [id, products])
    console.log("products=", products)
  return (
    <div>
    <Carousel responsive={responsive} className='carousel' >
    
    {
        loading?
        [...Array(4).keys()].map(i => {
          return <SkeletonImg 
          key={i} />}):
        products?.map((item) => (
        
        <div className="cardPro">

        <ItemCard item={item} key={item.id} />

        </div>

        
  ))}
    </Carousel>
      
    </div>
  )
}

export default RelatedProduct
