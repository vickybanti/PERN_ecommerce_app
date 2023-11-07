import React, { useEffect, useState } from 'react';
import './List.scss';
import ItemCard from '../Card/ItemCard';
import { NavLink, useParams } from 'react-router-dom';
import { Pagination, PaginationItem, Stack } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { responsive } from '../Responsive';
import SkeletonImg from '../skeleton/SkeletonImg';

function List({ size, filters }) {
  const { title, note, brand } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 12;

  console.log(title)

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const pageCount = Math.ceil(products.length / perPage);
  const productsToShow = products?products.slice(startIndex, endIndex) : [];

  


  useEffect(() => {

    const getFilters = async () => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer (rnd_aNZ9enklIKwNgICV8oQiMktGR6aj)'
    };
      setLoading(true)
    try {
      let apiUrl = '';

    if (filters === 'maxPrice') {
      apiUrl = 'https://mooreserver.onrender.com/price/desc';
    } else if (filters === 'minPrice') {
      apiUrl = 'https://mooreserver.onrender.com/price/';
    } else if (filters === 'trending') {
      apiUrl = 'https://mooreserver.onrender.com/trending/';
    }
     const res = await fetch(apiUrl,{
      method:"GET",
      headers
    });
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
      const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer (rnd_aNZ9enklIKwNgICV8oQiMktGR6aj)'
        };

try {
const res = await fetch(`https://mooreserver.onrender.com/size/${size}`,{
  method:"GET",
  headers
});

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
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer (rnd_aNZ9enklIKwNgICV8oQiMktGR6aj)'
    };
            setLoading(true)

    try {
      const res = await fetch(
        title ? `https://mooreserver.onrender.com/categories/${title}`
        :
        brand ? `https://mooreserver.onrender.com/brands/${brand}` 
        :
        note ?  `https://mooreserver.onrender.com/search/?title=${note}`
        :
        `https://mooreserver.onrender.com/products`
      ,{
        method:"GET",
        headers
      });

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
  
}, [filters,title,note,brand,size]);

  const renderProducts = () => {

    
    if (productsToShow.length === 0) {
      return <div><h1 className='noProducts'>No products found</h1></div>;
    }
   
   return productsToShow.map(item => (
      <div className="products" key={item.id}>
        <ItemCard item={item} key={item.id}/>
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
          {(title || brand )&& (
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
