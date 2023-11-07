import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function useProCat() {
    const { id } = useParams();
  
    const [proCat, setProCat] = useState([]);
    const [loadProCat, setLoadCat] = useState(true);
    const [loadError, setError] = useState(true);
    
  
    const fetchData = async () => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer (rnd_aNZ9enklIKwNgICV8oQiMktGR6aj)'
    };
      try {
        setLoadCat(true);
        const res = await fetch(`http://mooreserver.onrender.com/categories/${id}`,{
          method:"GET",
          headers
        });
        const json = await res.json();
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
