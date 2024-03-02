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
    
            const res = await makeRequest.get("/newproducts")
            console.log(res)
        const json = await res.data;
    
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
