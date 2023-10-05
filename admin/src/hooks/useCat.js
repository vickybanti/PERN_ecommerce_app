import { useState, useEffect } from "react";


const useCat = () => {
    const [catData, setCatData] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(true);
  
    const fetchData = async () => {
      try {
        setLoading(true);
  
        const res = await fetch(`http://localhost:5000/categories`);
        const json = await res.json();
  
        // modify the catData to include IDs
        setCatData(json);
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
    return { catData, loading, error };
  };
  
export default useCat;
