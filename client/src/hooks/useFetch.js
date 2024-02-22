import { useState, useEffect } from "react";
import { makeRequest } from "../makeRequest";


const useFetch = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(true)
    
    
    
    useEffect(() => {
        const fetchData = async () => {
            
            try {
                setLoading(true)
    
            const res = await fetch("https://mooreserver.onrender.com/newproducts",{
          method:"GET",
          "Content-Type":"application/json",
          mode:"no-cors"
        });
        const json = await res.json();
    
                setData(json)
                setLoading(false)
    
            } catch (error) {
                setError(true)
            }
            setLoading(false)
    
        }
    
        fetchData();
    }, [])
    return { data, loading, error};
}

export default useFetch;
