import { useState, useEffect } from "react";
import { makeRequest } from "../makeRequest";


const useBrand = () => {
    const [brandData, setBrandData] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(true);
  
    const fetchData = async () => {
      try {
        setLoading(true);
  
        const res = await makeRequest.get(`/brands`);
        const json = await res.data;
  
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
