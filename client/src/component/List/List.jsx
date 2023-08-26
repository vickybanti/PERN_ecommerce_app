import React, { useEffect, useState } from 'react';
import './List.scss';
import ItemCard from '../Card/ItemCard';
import { NavLink, useParams } from 'react-router-dom';
import { Pagination, PaginationItem, Stack } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { responsive } from '../Responsive';
import SkeletonImg from '../skeleton/SkeletonImg';

function List({ size, filters }) {
  const { id, note } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 12;

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const pageCount = Math.ceil(products.length / perPage);
  const productsToShow = products?products.slice(startIndex, endIndex) : [];

  


  useEffect(() => {

    const getFilters = async () => {
      setLoading(true)
    try {
      let apiUrl = '';

    if (filters === 'maxPrice') {
      apiUrl = 'http://localhost:5000/price/desc';
    } else if (filters === 'minPrice') {
      apiUrl = 'http://localhost:5000/price/';
    } else if (filters === 'trending') {
      apiUrl = 'http://localhost:5000/trending/';
    }
     const res = await fetch(apiUrl)
    const data = await res.json();
      setProducts(data);
      
        setLoading(false);
    } catch (err) {
      console.error(err.message)
      setLoading(false);
    
    }
  }


  //size
    const getSizes = async () => {
      setLoading(true)

try {
const res = await fetch(`http://localhost:5000/size/${size}`);

const data = await res.json();
setProducts(data);

  setLoading(false);



} catch (err) {
console.error(err.message);
setLoading(false);

} 
    }


//size
    const fetchData = async () => {
            setLoading(true)

    try {
      const res = await fetch(
        id ? `http://localhost:5000/categories/${id}`
        :
        note ?  `http://localhost:5000/search/?title=${note}`
        :
        `http://localhost:5000/products`
      );

      const data = await res.json();
      setProducts(data);
      
        setLoading(false);

      

    } catch (err) {
      console.error(err.message);
      setLoading(false);

    }
  };
  if (filters){
    getFilters()
  } else if(size){
    getSizes()
  } else{
    fetchData();

  }
  
}, [filters,id,note,size]);

  const renderProducts = () => {

    
    if (productsToShow.length === 0) {
      return <div className='noProducts'><h1>No products found</h1></div>;
    }
   
   return productsToShow.map(item => (
      <div className="products" key={item.id}>
        <ItemCard item={item} />
      </div>
      
    ))
    
   

  
  }

  return (
    <>
      <div className='list' responsive={responsive}>
        {loading? [...Array(12).keys()].map(i => {
          return <SkeletonImg 
          key={i} />}) : renderProducts()}
        <div className='button'>
          {id && (
            <NavLink className="--btn --btn-primary" to={"/products"}>
              Browse all other products
            </NavLink>
          )}
        </div>
      </div>
      <Stack mt={4} spacing={2} className='stack'>
        {products.length > 0 && (
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_event, value) => setPage(value)}
            sx={{ justifyContent: "center" }}
            renderItem={(item) => (
              <PaginationItem
                components={{
                  previous: ArrowBack,
                  next: ArrowForward,
                }}
                sx={{ fontSize: "20px" }}
                {...item}
              />
            )}
          />
        )}
      </Stack>
    </>
  );
}

export default List;
