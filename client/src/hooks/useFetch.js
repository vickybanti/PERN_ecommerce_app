import { useState, useEffect } from "react";
import { makeRequest } from "../makeRequest";


const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(true)
    
    
    
    useEffect(() => {
        const fetchData = async () => {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer (rnd_aNZ9enklIKwNgICV8oQiMktGR6aj)'
            };

            try {
                setLoading(true)
    
                const res = await fetch(`https://mooreserver.onrender.com/newproducts`,{
                    method:"GET",
                    headers
                })
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
