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

//     const getFilters = async () => {
     
//       setLoading(true)
//     try {
//       let apiUrl = title?`/categories/${title}`:brand?`/${brand}`:note?`/search/?title=${note}`:
//     "/products";

//     if (filters === 'maxPrice') {
//       apiUrl = products.sort((a, b) => a.price - b.price);;
//     } else if (filters === 'minPrice') {
//       apiUrl = products.sort((a, b) => b.price - a.price);
//     } else if (filters === 'trending') {
//      apiUrl = products.sort(a=>a.type==='trending');
//     }
//      const res = await makeRequest.get(apiUrl);
//     const data = await res.data;
//       setProducts(data);
      
//         setLoading(false);
//     } catch (err) {
//       console.error(err.message)
//       setLoading(false);
    
//     }
//   }


//   //size
//     const getSizes = async () => {
//       setLoading(true)
      
// try {
// const res = await makeRequest.get(`/size/${size}`);

// const data = await res.data;
// setProducts(data);

//   setLoading(false);



// } catch (err) {
// console.error(err.message);
// setLoading(false);

// } 
//     }


//size
const fetchData = async () => {
  setLoading(true);

  try {

    const response = await makeRequest.get(
      title ?`/categories/${title}`:
    "/products"
    );
    let filteredproducts = await response.data

    if (filters === 'maxPrice') {
      filteredproducts.sort((a, b) => a.price - b.price);;
    } else if (filters === 'minPrice') {
      filteredproducts.sort((a, b) => b.price - a.price);
    } else if (filters === 'trending') {
      filteredproducts.sort(a=>a.type==='trending');
   
    }
    
    setProducts(filteredproducts);
    setLoading(false);
  } catch (err) {
    console.error(err.message);
    setLoading(false);
  }
};

  
    fetchData();
  
}, [filters, title, note, brand, size,products]);

  

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
