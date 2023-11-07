import { useState, useEffect } from "react";


const useBrand = () => {
    const [brandData, setBrandData] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(true);
  
    const fetchData = async () => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer (rnd_aNZ9enklIKwNgICV8oQiMktGR6aj)'
    };
      try {
        setLoading(true);
  
        const res = await fetch(`https://mooreserver.onrender.com/brands`,{
          method:"GET",
          headers
        });
        const json = await res.json();
  
        // modify the catData to include IDs
        setBrandData(json);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
    
    // return catData instead of just data
    return { brandData, loading, error };
  };
  
export default useBrand;
