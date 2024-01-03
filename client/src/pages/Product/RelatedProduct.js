import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { responsive } from '../../component/Responsive';
import './Product.scss'
import ItemCard from '../../component/Card/ItemCard';
import SkeletonImg from '../../component/skeleton/SkeletonImg';
import { makeRequest } from '../../makeRequest';

function RelatedProduct() {

  const navigate = useNavigate()

    const {id} = useParams()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const productCat = async() => {

            try {
                const getCat = await makeRequest.get(`/products/${id}`)
                const allProducts = await getCat.data
                console.log(allProducts)

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

        <ItemCard item={item} key={item.id} onClick={()=>navigate(`/product/${item.id}`)} />

        </div>

        
  ))}
    </Carousel>
      
    </div>
  )
}

export default RelatedProduct
