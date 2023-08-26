import { useState, useEffect } from "react";
import { makeRequest } from "../makeRequest";


const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(true)
    
    
    
    useEffect(() => {
        const fetchData = async () => {

            try {
                setLoading(true)
    
                const res = await fetch(`http://localhost:5000/newproducts`)
                const json = await res.json()
    
                setData(json)
                setLoading(false)
    
            } catch (error) {
                setError(true)
            }
            setLoading(false)
    
        }
    
        fetchData();
    }, [url])
    return { data, loading, error};
}

export default useFetch;
