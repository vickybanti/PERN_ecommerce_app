import React, { useEffect, useState } from 'react';
import './List.scss';
import ItemCard from '../Card/ItemCard';
import { NavLink, useParams } from 'react-router-dom';
import { Pagination, PaginationItem, Stack } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { responsive } from '../Responsive';
import SkeletonImg from '../skeleton/SkeletonImg';
import { makeRequest } from '../../makeRequest';

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

    


  //size
    const getSizes = async () => {
      setLoading(true)
      
try {
const res = await makeRequest.get(`/size/${size}`);

const data = await res.data;
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
      const res = await makeRequest.get(
        title ? `/categories/${title}`
        :
        brand ? `/${brand}` 
        :
        note ?  `/search/?title=${note}`
        :
        `/products`
      
        );

      let data = await res.data;

      if (filters === 'maxPrice') {
        data.sort((a, b) => b.price - a.price);
      } else if (filters === 'minPrice') {
        data.sort((a, b) => a.price - b.price);
      } else if (filters === 'trending') {
        data.sort((a => a.type==='trending'));
      }
      
      setProducts(data);
      
        setLoading(false);

      

    } catch (err) {
      console.error(err.message);
      setLoading(false);

    }
  };

  if(size){
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
