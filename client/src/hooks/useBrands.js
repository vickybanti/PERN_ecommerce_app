import { useState, useEffect } from "react";


const useBrand = () => {
    const [brandData, setBrandData] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(true);
  
    const fetchData = async () => {
      try {
        setLoading(true);
  
        const res = await fetch(`https://mooreserver.onrender.com/brands`);
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
