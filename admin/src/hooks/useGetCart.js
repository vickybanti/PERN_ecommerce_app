import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { makeRequest } from "../makeRequest";

function useGetCart() {
    const { user_id } = useParams();
  
    const [getCart, setCart] = useState([]);
    const [loadCart, setLoadCart] = useState(true);
    const [loadError, setError] = useState(true);
    
  
    
    const fetchData = async () => {
      try {
        setLoadCart(true);
        const res = await makeRequest.get(`/cart/${user_id}`);
        const json = await res.data;
        console.log(json);
        // find the category object with the matching ID
        // const catObj = catData.find((cat) => cat.id === parseInt(id));
        // console.log(json);
        // get the category ID
        // const catId = catObj ? catObj.cat_id : null;
  
        // // pass the category ID to the API call
        // const resProCat = await fetch(
        //  `http://localhost:5000/products/cat/${id}`
        // );
      //  const jsonProCat = await resProCat.json();
  
        setCart(json);
        setLoadCart(false);
      } catch (err) {
        setLoadCart(false);
        setError(false);
        console.log(err.message);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, [user_id]);
  
    return { getCart, loadCart, loadError };
  }
  
export default useGetCart
