import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { makeRequest } from '../makeRequest';

function useProCat() {
    const { id } = useParams();
  
    const [proCat, setProCat] = useState([]);
    const [loadProCat, setLoadCat] = useState(true);
    const [loadError, setError] = useState(true);
    
  
    const fetchData = async () => {

      try {
        setLoadCat(true);
        const res = await makeRequest.get(`/categories/${id}`);
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
      //  const jsonProCat = await resProCat.data;
  
        setProCat(json);
        setLoadCat(false);
      } catch (err) {
        setLoadCat(false);
        setError(false);
        console.log(err.message);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, [id]);
  
    return { proCat, loadProCat, loadError };
  }
  
export default useProCat
